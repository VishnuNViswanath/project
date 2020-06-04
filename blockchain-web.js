function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    this.createNewBlock(100, '0', '0');
};

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        prevHash: previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
};


Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
};


Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce, wallet) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = wallet.Hash(dataAsString);
    return hash;
};


Blockchain.prototype.chainIsValid = function(blockchain) {
    let validChain = true;

    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];
        if (!(isblockvalid(currentBlock))) validChain = false;
        const blockHash = this.hashBlock(prevBlock['hash'],{ transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
        if (blockHash.substring(0, 4) !== '0000') validChain = false;
        if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
    };

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;
};


Blockchain.prototype.getBlock = function(blockHash) {
    let correctBlock = null;
    this.chain.forEach(block => {
        if (block.hash === blockHash) correctBlock = block;
    });
    return correctBlock;
};

