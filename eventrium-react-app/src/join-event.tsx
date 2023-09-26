import algosdk from "algosdk";
import React from 'react'
import ReactDOM from 'react-dom/client'

const algodToken = ""; // Your AlgoD API token
const algodServer = "https://testnet-api.algonode.cloud"; // AlgoD API server
const algodPort = "443";
const senderMnemonic =
  "leader judge flock cargo maid pretty junior sound squirrel frequent palace ignore machine nominee vibrant peace canyon expand tomorrow tomorrow custom agree fatal able scale"; // The sender's mnemonic (private key) to sign transactions

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

function JoinEvent() {
  async function deductEventCost() {
    try {
      const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

      // Create a transaction to interact with the smart contract
      const txnParams = await algodClient.getTransactionParams().do();
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        senderAccount.addr,
        "TU7D7HZGH572F4TWBLCTLJWCLCW54TQ2LBQBLG7Y4OMARKXK3EYYLLC73U", // Replace with the receiver's address
        100000, // Amount in microAlgos (100 Algos)
        undefined,
        undefined,
        txnParams
      );

      // Sign the transaction
      const signedTxn = algosdk.signTransaction(txn, senderAccount.sk);

      // Submit the transaction to the Algorand network
      const txId = await algodClient.sendRawTransaction(signedTxn.blob).do();

      console.log(`Transaction ID: ${txId}`);
      console.log("Event cost deducted successfully.");
    } catch (error) {
      console.error("Error deducting event cost:", error);
    }
  }

  return (
    <center>
      <div
        style={{
          marginTop: "15px",
          height: "50px",
          width: "80%",
          background: "#3983ad",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          id="registerLink"
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Cairo",
            fontWeight: 700,
            fontSize: "25px",
            lineHeight: "34px",
            wordWrap: "break-word",
            cursor: "pointer",
          }}
          onClick={deductEventCost} // Bind the function to the component's context
        href="#"
        >
          REGISTER NOW
        </a>
      </div>
    </center>
  );
}

async function deductEventCost() {
  try {
    const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

    // Create a transaction to interact with the smart contract
    const txnParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
      senderAccount.addr,
      "TU7D7HZGH572F4TWBLCTLJWCLCW54TQ2LBQBLG7Y4OMARKXK3EYYLLC73U", // Replace with the receiver's address
      100000, // Amount in microAlgos (100 Algos)
      undefined,
      undefined,
      txnParams
    );

    // Sign the transaction
    const signedTxn = algosdk.signTransaction(txn, senderAccount.sk);

    // Submit the transaction to the Algorand network
    const txId = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log(`Transaction ID: ${txId}`);
    console.log("Event cost deducted successfully.");
  } catch (error) {
    console.error("Error deducting event cost:", error);
  }
}

export default JoinEvent;

ReactDOM.createRoot(document.getElementById('join-event')!).render(
  <React.StrictMode>
    <JoinEvent />
  </React.StrictMode>,
)
