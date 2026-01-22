const SHA256 = require("crypto-js/sha256");
const { forEach } = require("lodash");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.tiestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data + this.nonce),
    ).toString();
  }

  mineBlock(difficuty) {
    while (
      this.hash.substring(0, difficuty) !== Array(difficuty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Minded Block: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficuty = 5;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("01/01/2026", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTrasactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    this.mineBlock(this.difficuty);

    console.log("sucess mined");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getAddressBalance(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= this.amount;
        }

        if (this.toAddress === address) {
          balance += this.amount;
        }
      }
    }

    return balance;
  }

  //   addBlock(newBlock) {
  //     newBlock.previousHash = this.getLatestBlock().hash;
  //     newBlock.mineBlock(this.difficuty);
  //     this.chain.push(newBlock);
  //   }

  isChainValid() {
    for (i = 1; i < this.chain.length; i++) {
      const currentBLock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBLock.hash !== currentBLock.calculateHash()) {
        return false;
      }

      if (currentBLock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let blockchain = new Blockchain();
