import { Blockchain, Transaction } from "./blockchain.js";
import pkg from "elliptic";
const { ec: EC } = pkg;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "599945431a22145eff2491908a0970ecb03845c52ff9ab05e9498a01d61d8af3",
);
const myWalletAddress = myKey.getPublic("hex");

let blockchain = new Blockchain();

const tx = new Transaction(myWalletAddress, "another public key", 10);
tx.signTransaction(myKey);
blockchain.addTransaction(tx);

console.log("Mining.....");
blockchain.minePendingTransactions(myWalletAddress);

console.log(`Mybalance: `, blockchain.getAddressBalance(myWalletAddress));
