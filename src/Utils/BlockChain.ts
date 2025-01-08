import Block from "./Main.ts";

export default class Blockchain {
    blocks: Block[];
    difficulty: number;

    hashCode: any;
    previousHash: any;
    data: any;
    nonce: number;
    constructor () {
        this.blocks = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    mineBlock(data, previousHash, setBlockGenerated, blocksGenerated, hashCodeMap, setIsMining) {
        const worker = new Worker('worker.js');
        worker.postMessage({data: data, hashCodeMap: hashCodeMap});

        worker.onmessage = (info: any) => {
            console.log('Worker info', info.data);
            const newBlock = {
                hashCode: info.data.hash,
                previousHash: previousHash,
                data: data,
                nonce: info.data.nonce,
            };
            setBlockGenerated([...blocksGenerated, {hashCode: info.data.hash, previousHash: previousHash, data: data, nonce: info.data.nonce}]);
            setIsMining(false);
            this.blocks = [...this.blocks, newBlock as Block];
        }
    }

    remine = (data, previousHash, setBlockGenerated, hashCodeMap, index, setReminingIndex) => {
        const worker = new Worker('worker.js');
        worker.postMessage({data: data, hashCodeMap: hashCodeMap});

        worker.onmessage = (info: any) => {
            console.log('Worker info', info.data);
            const newBlock = {
                hashCode: info.data.hash,
                previousHash: previousHash,
                data: data,
                nonce: info.data.nonce,
            };
            const updatedList = [...this.blocks];
            updatedList[index] = newBlock as Block;
            setBlockGenerated(updatedList);
            setReminingIndex(null);
            this.blocks = updatedList;
            // setBlockGenerated([...blocksGenerated, {hashCode: info.data.hash, previousHash: previousHash, data: data, nonce: info.data.nonce}])
            // this.blocks = [...this.blocks, newBlock as Block];
        }
    }

    createGenesisBlock = () => {
        const genesisBlock = new Block('Genesis Block', '0000');
        return genesisBlock;
    }

    addNewBlock = async (data, setBlockGenerated, blockGenerated, hashCodeMap, setIsMining) => {
        const lastBlock = this.getLastBlock();
        this.mineBlock(data, lastBlock.hashCode, setBlockGenerated, blockGenerated, hashCodeMap, setIsMining);
    }

    isBlockChainValid = () => {
        const blocks = this.blocks;
        let flag = true;
        for(let i=1;i<blocks.length;i++) {
            if(blocks[i-1].hashCode !== blocks[i].previousHash) {
                console.log('Not valid');
                flag = false;
            }
        }
        console.log(flag);
    }

    getLastBlock = () => {
        return this.blocks[this.blocks.length - 1];
    }

    getCompleteBlockChain = () => {
        this.blocks.forEach((block) => {
            console.log(block);
        });
    }
}