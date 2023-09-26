import algosdk from "algosdk";
import React from 'react'
import ReactDOM from 'react-dom/client'

const algodToken = ""; // Your AlgoD API token
const algodServer = "https://testnet-api.algonode.cloud"; // AlgoD API server
const algodPort = "443";
const senderMnemonic =
  "hope arrest skill still oblige police lounge wet eager much face seven useless slim retreat fatal word hamster push pause deny rival outside abstract check"; // The sender's mnemonic (private key) to sign transactions

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

function JoinEvent() {
  async function deductEventCost() {
    try {
      const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

      // Create a transaction to interact with the smart contract
      const txnParams = await algodClient.getTransactionParams().do();
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        senderAccount.addr,
        "I2BLEMKXM3RXEBCIEZCYZFNH7R354CUWGQQ7VJ73UIZ5HEKLLRU73W36W4", // Replace with the receiver's address
        100000000, // Amount in microAlgos (100 Algos)
        undefined,
        undefined,
        txnParams
      );

      // Sign the transaction
      const signedTxn = algosdk.signTransaction(txn, senderAccount.sk);

      // Submit the transaction to the Algorand network
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

      if (response.txId) {
        const txId = response.txId;
        console.log(`Transaction ID: ${txId}`);
        console.log("Event cost deducted successfully.");
      } else {
        console.error("Transaction failed. Response:", response);
      }
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

export default JoinEvent;

ReactDOM.createRoot(document.getElementById('join-event')!).render(
  <React.StrictMode>
    <JoinEvent />
  </React.StrictMode>,
)
