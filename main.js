const SHA256 = require("crypto-js/sha256");
const { forEach } = require("lodash");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.tiestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data),
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2026", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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

let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, "02/01/2026", { amount: 10 }));
savjeeCoin.addBlock(new Block(2, "03/01/2026", { amount: 9 }));

savjeeCoin.isChainValid();

console.log(JSON.stringify(savjeeCoin, null, 2));
