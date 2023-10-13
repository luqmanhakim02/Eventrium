

let transactionID;

let walletAddress;

export function getTransactionID() {
  console.log(`Getting transactionID: ${transactionID}`);
  if (localStorage.getItem("transactionID"))
    transactionID = localStorage.getItem("transactionID");
  return transactionID;
}