let transactionID: string | null = "STZEI6CIJGKR4YJMMNATSGHHXCZVMWV4XHYK3RKQZA62ATGZ7FCA";
let walletBalance : number | null=null;

export function setTransactionID(txID: string) {
  transactionID = txID;
}

export function getTransactionID() {
  return transactionID;
}

export function setWalletBalance(wB : number){
  walletBalance = wB;
}

export function getWalletBalance(){
  return walletBalance
}