// eslint-disable-next-line no-restricted-globals
self.onmessage = async function (e) {
  const input = e.data.data;
  // Expect hashCodeMap as a plain object, not a Map
  const hashCodeMap = e.data.hashCodeMap || {};
  let nonce = 0;
  const maxNonce = 1e7; // Prevent infinite loop

  try {
    while (nonce < maxNonce) {
      const data = input + nonce;
      const hash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(data)
      );
      const hashHex = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      if (hashHex.startsWith("00000") && !hashCodeMap[hashHex]) {
        postMessage({ nonce, hash: hashHex });
        return;
      }
      nonce++;
    }
    postMessage({ error: "Max nonce reached, no valid hash found." });
  } catch (err) {
    postMessage({ error: err.message });
  }
};
