// contractFunctions.ts

import Web3 from 'web3';

const infuraUrl = 'https://sepolia.infura.io/v3/fab7e80127424a7c95aadd5be9c525e1';
const web3 = new Web3(infuraUrl);


const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_data",
                "type": "string"
            }
        ],
        "name": "setData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getData",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xB41cfBE072d0AA695e737e17F6Cd9E44F095408c';

const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function setDataInContract(data: string) {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const from = accounts[0]; // Use the first account
        await contract.methods.setData(data).send({ from });
        console.log('Data set successfully:', data);
    } catch (error) {
        console.error('Error setting data:', error);
    }
}

export async function retrieveDataFromContract() {
    try {
        const result = await contract.methods.getData().call();
        console.log('Retrieved data from the contract:', result);
        return result;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
}

export async function sendRequestToInfura() {
    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log('Latest block number:', latestBlockNumber);
    } catch (error) {
        console.error('Error sending request to Infura:', error);
    }
}

export async function checkContractValidity(contractAddress: string) {
    try {
        const code = await web3.eth.getCode(contractAddress);
        if (code === '0x') {
            console.error('Contract address is not valid:', contractAddress);
        } else {
            console.log('Contract address is valid:', contractAddress);
        }
    } catch (error) {
        console.error('Error checking contract validity:', error);
    }
}
