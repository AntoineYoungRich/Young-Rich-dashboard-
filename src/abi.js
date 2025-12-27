export default [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_aaveBP",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_compoundBP",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_yearnBP",
				"type": "uint16"
			}
		],
		"name": "setAlloc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdcE",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_aavePool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_aToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_compoundComet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_yearnVault",
				"type": "address"
			},
			{
				"internalType": "uint16",
				"name": "_aaveBP",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_compoundBP",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_yearnBP",
				"type": "uint16"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "aaveBP",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "compoundBP",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "yearnBP",
				"type": "uint16"
			}
		],
		"name": "SetAlloc",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "aaveBP",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aavePool",
		"outputs": [
			{
				"internalType": "contract IAaveV3Pool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "compoundBP",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "compoundComet",
		"outputs": [
			{
				"internalType": "contract ICompoundV3Comet",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getDashboard",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "userNet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalNet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "idleUSDCe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "aaveUSDCe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "compoundUSDCe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yearnUSDCeEst",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalManagedEst",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "totalEarningsEst",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPositions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "idleUSDCe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "aaveUSDCe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "compoundUSDCe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yearnUSDCeEst",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalNetDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdcE",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userNetDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "yearnBP",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "yearnVault",
		"outputs": [
			{
				"internalType": "contract IERC4626",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
 ];
