import sha256 from "sha256";

export default class Block {
  hashCode: any;
  previousHash: any;
  data: any;
  nonce: number;
  constructor(data, previousHash = "") {
    this.data = data;
    this.previousHash = previousHash;
    this.hashCode = this.generateHashCode();
    this.nonce = 0;
  }

  mineBlock(difficulty) {
    const worker = new Worker(`${process.env.PUBLIC_URL}/worker.js`);
    worker.postMessage({ difficulty: difficulty, data: this.data });

    worker.onmessage = (info: any) => {
      this.hashCode = info.data.hash;
      return Promise.resolve(this.hashCode);
    };
  }

  generateHashCode() {
    const res: string = sha256(
      this.nonce + JSON.stringify(this.data)
    ).toString();
    return res;
  }
}
