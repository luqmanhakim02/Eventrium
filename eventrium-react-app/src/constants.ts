let transactionID: string | null =
  "STZEI6CIJGKR4YJMMNATSGHHXCZVMWV4XHYK3RKQZA62ATGZ7FCA";
let walletAddress: string | null =
  "Z2TCFCX5RMB4J7FTEAJWDUBXE5BAY3RGOFRPMZ2JQNP55X5BM7PB6KFEMY";

localStorage.setItem(
  "walletAddress",
  "Z2TCFCX5RMB4J7FTEAJWDUBXE5BAY3RGOFRPMZ2JQNP55X5BM7PB6KFEMY"
);

export function getTransactionID() {
  console.log(`Getting transactionID: ${transactionID}`);
  if (localStorage.getItem("transactionID"))
    transactionID = localStorage.getItem("transactionID");
  return transactionID;
}

export function getwalletAddress() {
  let walletAddress = localStorage.getItem("walletAddress");

  if (walletAddress && walletAddress.length > 7) {
    // Shorten the wallet address to the first 5 characters and add '...'
    walletAddress = walletAddress.substring(0, 7) + "...";
  }

  return walletAddress;
}
