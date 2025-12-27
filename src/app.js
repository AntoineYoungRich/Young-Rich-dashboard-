// src/app.js
import "./style.css";
import { ethers } from "ethers";
import ABI from "./abi.js";

const $ = (id) => document.getElementById(id);
const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };

const ENV = {
  CHAIN_ID: Number(import.meta.env.VITE_CHAIN_ID || 137),
  CONTRACT: (import.meta.env.VITE_CONTRACT_ADDRESS || "").trim(),
};

let provider;      // ethers.BrowserProvider
let signer;        // ethers.Signer
let user;          // address
let contract;      // Contract (signer)
let contractRead;  // Contract (provider)
let usdc;          // ERC20 (signer)
let usdcRead;      // ERC20 (provider)
let usdcAddr;
let usdcDec = 6;

const ERC20_MIN_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
];

function shortAddr(a){
  if (!a) return "—";
  return a.slice(0, 6) + "…" + a.slice(-4);
}

function setStatus(text){
  setText("statusBadge", text);
}

function enableActions(enabled){
  $("btnRefresh").disabled = !enabled;
  $("btnDeposit").disabled = !enabled;
  $("btnWithdraw").disabled = !enabled;
}

async function ensurePolygon(){
  const net = await provider.getNetwork();
  const current = Number(net.chainId);
  if (current !== ENV.CHAIN_ID){
    throw new Error(`Wrong network (${current}). Mets Polygon (${ENV.CHAIN_ID}).`);
  }
}

async function bootstrapContracts(){
  if (!ENV.CONTRACT) throw new Error("VITE_CONTRACT_ADDRESS manquant dans .env");

  contractRead = new ethers.Contract(ENV.CONTRACT, ABI, provider);
  contract = new ethers.Contract(ENV.CONTRACT, ABI, signer);

  // USDC.e address comes from contract (safer than env)
  usdcAddr = await contractRead.usdcE();
  usdcRead = new ethers.Contract(usdcAddr, ERC20_MIN_ABI, provider);
  usdc = new ethers.Contract(usdcAddr, ERC20_MIN_ABI, signer);

  usdcDec = Number(await usdcRead.decimals().catch(() => 6));

  setText("contractText", shortAddr(ENV.CONTRACT));
  setText("usdcText", shortAddr(usdcAddr));
}

function formatUSDC(amountWei){
  // amountWei is bigint
  return ethers.formatUnits(amountWei, usdcDec);
}

function formatIntUSDC(intVal){
  // intVal can be bigint signed (ethers v6 returns bigint)
  const neg = intVal < 0n;
  const abs = neg ? -intVal : intVal;
  const s = ethers.formatUnits(abs, usdcDec);
  return neg ? `-${s}` : `+${s}`;
}

async function refreshDashboard(){
  try{
    if (!provider || !user){
      setStatus("Connecte MetaMask d'abord");
      return;
    }

    await ensurePolygon();
    if (!contractRead) await bootstrapContracts();

    // getDashboard(user)
    const data = await contractRead.getDashboard(user);

    // Named outputs exist in ABI; ethers returns array + props
    const userNet = data.userNet ?? data[0];
    const totalNet = data.totalNet ?? data[1];
    const idleUSDCe = data.idleUSDCe ?? data[2];
    const aaveUSDCe = data.aaveUSDCe ?? data[3];
    const compoundUSDCe = data.compoundUSDCe ?? data[4];
    const yearnUSDCeEst = data.yearnUSDCeEst ?? data[5];
    const totalManagedEst = data.totalManagedEst ?? data[6];
    const totalEarningsEst = data.totalEarningsEst ?? data[7];

    setText("addrText", shortAddr(user));
    setText("chainText", String(ENV.CHAIN_ID));

    setText("userNetText", formatUSDC(userNet));
    setText("totalManagedText", formatUSDC(totalManagedEst));
    setText("earningsText", formatIntUSDC(totalEarningsEst));
    setText("idleText", formatUSDC(idleUSDCe));

    setText("aaveText", formatUSDC(aaveUSDCe));
    setText("compoundText", formatUSDC(compoundUSDCe));
    setText("yearnText", formatUSDC(yearnUSDCeEst));

    setText("maxWithdrawText", formatUSDC(userNet));

    setStatus("OK");
    enableActions(true);

    console.log("refresh ok", {
      user: shortAddr(user),
      userNet: String(userNet),
      totalManagedEst: String(totalManagedEst),
    });
  } catch(e){
    console.error("refresh error", e);
    setStatus(`Erreur refresh (console)`);
    enableActions(false);
  }
}

async function connectWallet(){
  try{
    if (!window.ethereum) throw new Error("MetaMask non détecté");

    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    user = await signer.getAddress();

    setText("addrText", shortAddr(user));
    setText("contractText", shortAddr(ENV.CONTRACT || "—"));

    await ensurePolygon();
    await bootstrapContracts();

    setStatus("Connecté");
    enableActions(true);

    // Auto refresh
    await refreshDashboard();
  } catch(e){
    console.error("connect error", e);
    setStatus("Erreur connexion (console)");
    enableActions(false);
  }
}

function parseAmountInput(){
  const raw = ($("amountInput").value || "").trim().replace(",", ".");
  if (!raw) throw new Error("Entre un montant");
  // parseUnits with token decimals
  return ethers.parseUnits(raw, usdcDec);
}

async function ensureApprove(amountWei){
  const allowance = await usdcRead.allowance(user, ENV.CONTRACT);
  if (allowance >= amountWei) return;

  setStatus("Approval USDC.e…");
  const tx = await usdc.approve(ENV.CONTRACT, amountWei);
  setText("lastTxText", tx.hash);
  await tx.wait();
}

async function doDeposit(){
  try{
    if (!contract || !usdc) throw new Error("Pas connecté");
    await ensurePolygon();

    const amountWei = parseAmountInput();
    if (amountWei <= 0n) throw new Error("Montant invalide");

    // approve then deposit
    await ensureApprove(amountWei);

    setStatus("Dépôt en cours…");
    const tx = await contract.deposit(amountWei);
    setText("lastTxText", tx.hash);
    await tx.wait();

    setStatus("Dépôt OK");
    await refreshDashboard();
  } catch(e){
    console.error("deposit error", e);
    setStatus("Erreur dépôt (console)");
  }
}

async function doWithdraw(){
  try{
    if (!contract) throw new Error("Pas connecté");
    await ensurePolygon();

    const amountWei = parseAmountInput();
    if (amountWei <= 0n) throw new Error("Montant invalide");

    setStatus("Retrait en cours…");
    const tx = await contract.withdraw(amountWei);
    setText("lastTxText", tx.hash);
    await tx.wait();

    setStatus("Retrait OK");
    await refreshDashboard();
  } catch(e){
    console.error("withdraw error", e);
    setStatus("Erreur retrait (console)");
  }
}

// Wire UI
window.addEventListener("load", () => {
  setText("contractText", shortAddr(ENV.CONTRACT || "—"));
  setText("chainText", String(ENV.CHAIN_ID));

  $("btnConnect").addEventListener("click", connectWallet);
  $("btnRefresh").addEventListener("click", refreshDashboard);
  $("btnDeposit").addEventListener("click", doDeposit);
  $("btnWithdraw").addEventListener("click", doWithdraw);

  enableActions(false);
  setStatus("Prêt.");
});
