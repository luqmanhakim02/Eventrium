let transactionID: string | null =
  "STZEI6CIJGKR4YJMMNATSGHHXCZVMWV4XHYK3RKQZA62ATGZ7FCA";

let walletAddress: string | null;

export function getTransactionID() {
  console.log(`Getting transactionID: ${transactionID}`);
  if (localStorage.getItem("transactionID"))
    transactionID = localStorage.getItem("transactionID");
  return transactionID;
}

