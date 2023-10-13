import algosdk from "algosdk";

const algodToken = ""; // Your AlgoD API token
const algodServer = "https://testnet-api.algonode.cloud"; // AlgoD API server
const algodPort = "443";
const senderMnemonic =
  "survey pride derive laundry increase result nerve addict trust zone baby element recipe comfort wheat such name master axis zoo broom engage inflict above rely"; // The sender's mnemonic (private key) to sign transactions
//change this

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

function JoinEvent() {
  async function deductEventCost() {
    try {
      const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

      // Create a transaction to interact with the smart contract
      const txnParams = await algodClient.getTransactionParams().do();
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        //change this
        senderAccount.addr,
        "LWEHP7VSZGN7IEBOWP25D2EMUDZSRWA7JNXA52XJZQ6RY62WO4D44HG3FM", // Replace with the receiver's address
        100000000, // Amount in microAlgos (100 Algos) = 100000000
        undefined,
        undefined,
        txnParams
      );

      // Sign the transaction
      const signedTxn = algosdk.signTransaction(txn, senderAccount.sk);

      // Submit the transaction to the Algorand network
      const response = await algodClient
        .sendRawTransaction(signedTxn.blob)
        .do();

      if (response.txId) {
        const txId = response.txId;
        console.log(`Transaction ID: ${txId}`);
        console.log("Event cost deducted successfully.");
        localStorage.setItem("transactionID", txId);
        window.location.href = "my-ticket.html";

      } else {
        console.error("Transaction failed. Response:", response);
      }
    } catch (error) {
      console.error("Error deducting event cost:", error);
    }
  }

  return (
    <>
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
    </>
  );
}

export default JoinEvent;
