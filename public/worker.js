
// eslint-disable-next-line no-restricted-globals
self.onmessage = async function (e) {
    console.log(e.data);
    const input = e.data.data;
    const hashCodeMap = e.data.hashCodeMap;
    let nonce = 0;

    while (true) {
      const data = input + nonce;
      const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
      const hashHex = Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
      if (hashHex.startsWith("00000") && !hashCodeMap.get(hashHex)) {
        console.log('New Hash', hashHex);
        postMessage({ nonce, hash: hashHex });
        break;
      }
      nonce++;
    }
};
