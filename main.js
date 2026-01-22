const SHA256 = require("crypto-js/sha256");
const { forEach } = require("lodash");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.tiestamp = timestamp;
    this.data = data;
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
    console.log("Bloco minerado: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficuty = 5;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2026", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficuty);
    this.chain.push(newBlock);
  }

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

console.log("Minerando Bloco 1 ");
blockchain.addBlock(new Block(1, "02/01/2026", { amount: 10 }));
console.log("Minerando Bloco 2 ");
blockchain.addBlock(new Block(2, "03/01/2026", { amount: 9 }));
