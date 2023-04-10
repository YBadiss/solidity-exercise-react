import React, { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

// Replace the following with the ABI and address of your target contract
// DAI token
// const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"uint8","name":"_decimals","type":"uint8"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
// const contractAddress = "0x06dbf77e62bdc9f5697ca6d696c1dc8b8923fdff";
// Local Game
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "_baseEndurance",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_baseIntelligence",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "BossIsDead",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BossIsNotDead",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharacterAlreadyCreated",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharacterCannotSelfHeal",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharacterIsDead",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharacterNotCreated",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharacterNotExperienced",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotOwner",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "bossName",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "bossHp",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "damageDealt",
        "type": "uint32"
      }
    ],
    "name": "BossIsHit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "bossName",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      }
    ],
    "name": "BossKilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "bossName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "maxHp",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "damage",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "xpReward",
        "type": "uint32"
      }
    ],
    "name": "BossSpawned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "healerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "characterHp",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "healAmount",
        "type": "uint32"
      }
    ],
    "name": "CharacterHealed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "bossName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "characterHp",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "damageDealt",
        "type": "uint32"
      }
    ],
    "name": "CharacterIsHit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "bossName",
        "type": "string"
      }
    ],
    "name": "CharacterKilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "bossName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "xpReward",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "totalDamageDealt",
        "type": "uint32"
      }
    ],
    "name": "CharacterRewarded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "characterAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "maxHp",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "physicalDamage",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "heal",
        "type": "uint32"
      }
    ],
    "name": "CharacterSpawned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "activeAddresses",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "addressesInvolvedInFight",
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
    "name": "baseEndurance",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "baseIntelligence",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "boss",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "maxHp",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "hp",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "damage",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "xpReward",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bossDamage",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bossHp",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bossMaxHp",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bossName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bossXpReward",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_seed",
        "type": "uint256"
      }
    ],
    "name": "buildCharacter",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "created",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "maxHp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "physicalDamage",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "heal",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "hp",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "xp",
            "type": "uint64"
          }
        ],
        "internalType": "struct ICharacter.Character",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_damage",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_hp",
        "type": "uint32"
      }
    ],
    "name": "calculateDamageDealt",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_heal",
        "type": "uint32"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "created",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "maxHp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "physicalDamage",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "heal",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "hp",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "xp",
            "type": "uint64"
          }
        ],
        "internalType": "struct ICharacter.Character",
        "name": "_targetCharacter",
        "type": "tuple"
      }
    ],
    "name": "calculateHpHealed",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "canCharacterHeal",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "characterHeal",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "characterHp",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "characterMaxHp",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "characterPhysicalDamage",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "characterXp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
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
    "name": "characters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "created",
        "type": "bool"
      },
      {
        "internalType": "uint32",
        "name": "maxHp",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "physicalDamage",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "heal",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "hp",
        "type": "uint32"
      },
      {
        "internalType": "uint64",
        "name": "xp",
        "type": "uint64"
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
    "name": "damageDealtToBoss",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "distributeRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fightBoss",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveAddresses",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAddressesInvolvedInFight",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_targetCharacter",
        "type": "address"
      }
    ],
    "name": "healCharacter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isBossDead",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "isCharacterAlive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_characterAddress",
        "type": "address"
      }
    ],
    "name": "isCharacterCreated",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "newCharacter",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "_maxHp",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_damage",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_xpReward",
        "type": "uint32"
      }
    ],
    "name": "setBoss",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contractAddress = "0xdDc7203b76f2D1bc710954a62fC7D862186DA952";

function App() {
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);
  const [owner, setOwner] = useState("");
  const [character, setCharacter] = useState(null);
  const [boss, setBoss] = useState(null);
  const [isBossDead, setIsBossDead] = useState(false);
  const [bossForm, setBossForm] = useState({
    name: "",
    maxHp: "",
    damage: "",
    xpReward: "",
  });
  const [addressesInvolved, setAddressesInvolved] = useState([]);

  useEffect(() => {
    const init = async () => {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        setProvider(detectedProvider);
        setWeb3(new Web3(detectedProvider));
      } else {
        alert("Please install a web3 wallet like Metamask.");
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (web3) {
      setContract(new web3.eth.Contract(contractABI, contractAddress));
    }
  }, [web3]);

  useEffect(() => {
    if (contract) {
      const eventSubscription = contract.events.allEvents()
        .on("data", handleNewEvent)
        .on("error", (error) => console.error("Event subscription error:", error));
  
      return () => {
        // Clean up the subscription when the component is unmounted or the contract changes
        eventSubscription.unsubscribe();
      };
    }
  }, [contract]);

  useEffect(() => {
    const fetchOwner = async () => {
      if (!contract) return;
      try {
        const ownerAddress = await contract.methods.owner().call();
        setOwner(ownerAddress);
      } catch (error) {
        console.error("Failed to fetch owner's address:", error);
      }
    };
  
    fetchOwner();
  }, [contract]);  

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", handleAccountsChanged);
  
      return () => {
        // Clean up the subscription when the provider changes or the component is unmounted
        provider.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, [provider, contract]);

  useEffect(() => {
    fetchBossDetails();
    fetchBossStatus();
    fetchAddressesInvolved();
  }, [contract]);
  
  useEffect(() => {
    if (!contract || !account) return;
    
    const onCharacterSpawned = contract.events
      .CharacterSpawned({
        filter: { characterAddress: account },
      })
      .on("data", () => {
        fetchCharacterDetails(account);
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to CharacterSpawned event:", error);
      });
    const onCharacterIsHit = contract.events
      .CharacterIsHit({
        filter: { characterAddress: account },
      })
      .on("data", () => {
        fetchCharacterDetails(account);
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to CharacterIsHit event:", error);
      });
    const onCharacterHealed = contract.events
      .CharacterHealed({
        filter: { characterAddress: account },
      })
      .on("data", () => {
        fetchCharacterDetails(account);
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to CharacterHealed event:", error);
      });
    const onCharacterRewarded = contract.events
      .CharacterRewarded({
        filter: { characterAddress: account },
      })
      .on("data", () => {
        fetchCharacterDetails(account);
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to CharacterRewarded event:", error);
      });

    const onBossIsHit = contract.events
      .BossIsHit()
      .on("data", () => {
        fetchBossDetails();
        fetchAddressesInvolved();
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to BossIsHit event:", error);
      });
    const onBossSpawned = contract.events
      .BossSpawned()
      .on("data", () => {
        fetchBossDetails();
        fetchBossStatus();
        fetchAddressesInvolved();
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to BossSpawned event:", error);
      });
    const onBossKilled = contract.events
      .BossKilled()
      .on("data", () => {
        fetchBossDetails();
        fetchBossStatus();
      })
      .on("error", (error) => {
        console.error("Failed to subscribe to BossKilled event:", error);
      });
    return () => {
      onCharacterSpawned.unsubscribe();
      onCharacterIsHit.unsubscribe();
      onCharacterHealed.unsubscribe();
      onCharacterRewarded.unsubscribe();
      onBossIsHit.unsubscribe();
      onBossSpawned.unsubscribe();
      onBossKilled.unsubscribe();
    };
  }, [contract, account]);  

  const fetchEvents = async () => {
    if (!contract || !web3) return;
  
    try {
      const currentBlockNumber = await web3.eth.getBlockNumber();
      const fromBlock = Math.max(currentBlockNumber - 100, 0);
  
      const allEvents = await contract.getPastEvents("allEvents", {
        fromBlock,
        toBlock: "latest",
      });
  
      setEvents(allEvents);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch events.");
    }
  };

  const handleNewEvent = (event) => {
    setNewEvents((prevEvents) => [...prevEvents, event]);
  };

  const filterNamedParameters = (returnValues) => {
    return Object.entries(returnValues)
      .filter(([key]) => isNaN(Number(key)))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  };

  const renderEvent = (event, index) => {
    const { event: eventName, returnValues } = event;
    const namedParameters = filterNamedParameters(returnValues);
    const parameters = JSON.stringify(namedParameters);
  
    return (
      <li key={index}>
        {eventName}: {parameters}
      </li>
    );
  };  

  const renderEvents = (events) => {
    return (
      <ul>
        {events
          .slice()
          .reverse()
          .map(renderEvent)}
      </ul>
    );
  }

  const renderAccount = (account, owner) => {
    const name = (account.toLowerCase() === owner.toLowerCase()) ? "Owner" : "";
    return (
      <h3>{name} [{account}]</h3>
    );
  }

  const renderOwnerView = () => {
    return (
      <div>
        <h2>Set New Boss:</h2>
        <form onSubmit={submitBossForm}>
          <input
            type="text"
            name="name"
            value={bossForm.name}
            onChange={handleBossFormChange}
            placeholder="Boss Name"
            required
          />
          <input
            type="number"
            name="maxHp"
            value={bossForm.maxHp}
            onChange={handleBossFormChange}
            placeholder="Max HP"
            required
          />
          <input
            type="number"
            name="damage"
            value={bossForm.damage}
            onChange={handleBossFormChange}
            placeholder="Damage"
            required
          />
          <input
            type="number"
            name="xpReward"
            value={bossForm.xpReward}
            onChange={handleBossFormChange}
            placeholder="XP Reward"
            required
          />
          <button type="submit" disabled={!isBossDead}>Submit</button>
        </form>
        <button onClick={distributeRewards} disabled={!isBossDead}>
          Distribute Rewards
        </button>
      </div>
    );
  }

  const fetchCharacterDetails = async (account) => {
    console.info("fetchCharacterDetails");
    if (!contract || !account) {
      console.error(`No contract (${contract}) or account (${account})`);
      return;
    }
  
    try {
      const isCreated = await contract.methods
        .isCharacterCreated(account)
        .call();
      console.info(`isCharacterCreated(${account}) = ${isCreated}`);
      if (isCreated) {
        const characterData = await contract.methods.characters(account).call();
        setCharacter(characterData);
      } else {
        setCharacter(null);
      }
    } catch (error) {
      console.error("Failed to fetch character details:", error);
    }
  };

  const fetchBossDetails = async () => {
    if (!contract) return;

    try {
      const bossData = await contract.methods.boss().call();
      setBoss(bossData);
    } catch (error) {
      console.error("Failed to fetch boss details:", error);
    }
  };

  const fetchBossStatus = async () => {
    if (!contract) return;

    try {
      const bossDead = await contract.methods.isBossDead().call();
      setIsBossDead(bossDead);
    } catch (error) {
      console.error("Failed to fetch boss status:", error);
    }
  };

  const renderCharacter = (character) => {
    if (character) {
      return (
        <div>
          <h2>Character Details:</h2>
          <p>Current HP: {character.hp}/{character.maxHp}</p>
          <p>Physical Damage: {character.physicalDamage}</p>
          <p>Heal: {character.heal}</p>
          <p>XP: {character.xp}</p>
          <button onClick={fightBoss} disabled={isBossDead}>Fight Boss</button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Character Details:</h2>
          <button onClick={createNewCharacter}>
            Create New Character
          </button>
        </div>
      );
    }
  }

  const renderBoss = (boss) => {
    if (boss) {
      return (<div>
        <h2>Boss Details - Fighting {addressesInvolved.length} Characters:</h2>
        <div className={!isBossDead ? "greyed-out" : ""}>
          <p>Name: {boss.name}</p>
          <p>HP: {isBossDead ? "💀" : `${boss.hp}/${boss.maxHp}`}</p>
          <p>Damage: {boss.damage}</p>
          <p>XP Reward: {boss.xpReward}</p>
        </div>
      </div>);
    } else {
      return (<p>Loading boss details...</p>);
    }
  }

  const handleBossFormChange = (event) => {
    const { name, value } = event.target;
    setBossForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitBossForm = async (event) => {
    event.preventDefault();
  
    if (!contract || !account) return;
  
    try {
      const { name, maxHp, damage, xpReward } = bossForm;
      const gasEstimate = await contract.methods
        .setBoss(name, maxHp, damage, xpReward)
        .estimateGas({ from: account });
  
      await contract.methods
        .setBoss(name, maxHp, damage, xpReward)
        .send({ from: account, gas: gasEstimate });
  
      // Update boss details and status after setting a new boss
      fetchBossDetails();
      fetchBossStatus();
    } catch (error) {
      console.error("Failed to set new boss:", error);
    }
  };

  const connectWallet = async () => {
    if (!provider) return;

    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      // Fetch events after connecting the wallet
      fetchEvents();
      // Fetch character details after connecting the wallet
      fetchCharacterDetails(accounts[0]);
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet.");
    }
  };

  const handleAccountsChanged = ([newAccount]) => {
    setAccount(newAccount);
    fetchCharacterDetails(newAccount); // Fetch character details for the new account
  };

  const fightBoss = async () => {
    if (!contract || !account) return;
  
    try {
      const gasEstimate = await contract.methods
        .fightBoss()
        .estimateGas({ from: account });
  
      await contract.methods.fightBoss().send({
        from: account,
        gas: gasEstimate,
      });
    } catch (error) {
      console.error("Failed to fight boss:", error);
    }
  };

  const distributeRewards = async () => {
    if (!contract || !account) return;
  
    try {
      const gasEstimate = await contract.methods
        .distributeRewards()
        .estimateGas({ from: account });
  
      await contract.methods
        .distributeRewards()
        .send({ from: account, gas: gasEstimate });
  
      // Update boss status after distributing rewards
      fetchBossStatus();
    } catch (error) {
      console.error("Failed to distribute rewards:", error);
    }
  };

  const fetchAddressesInvolved = async () => {
    console.info("fetchAddressesInvolved");
    if (!contract) {
      console.error(`No contract (${contract})`);
      return;
    }
  
    try {
      const addresses = await contract.methods.getAddressesInvolvedInFight().call();
      setAddressesInvolved(addresses);
    } catch (error) {
      console.error("Failed to fetch addresses involved in the fight:", error);
    }
  };

  const createNewCharacter = async () => {
    if (!contract || !account) return;
  
    try {
      const gasEstimate = await contract.methods
        .newCharacter()
        .estimateGas({ from: account });
  
      await contract.methods
        .newCharacter()
        .send({ from: account, gas: gasEstimate });
  
      // Update character details after creating a new character
      fetchCharacterDetails();
    } catch (error) {
      console.error("Failed to create a new character:", error);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Solidity Exercise React</h1>
        {account ? (
          <div>
            {renderAccount(account, owner)}
            {account.toLowerCase() === owner.toLowerCase() ? renderOwnerView() : <div/>}
            {renderCharacter(character)}
            {renderBoss(boss)}
            <h2>New Events:</h2>
            {renderEvents(newEvents)}
            <h2>Smart Contract Events (Last 100 Blocks):</h2>
            {renderEvents(events)}
          </div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
  
}

export default App;
