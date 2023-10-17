import React, { useState, useEffect } from 'react';
import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';

const algodToken = ""; // Your AlgoD API token
const algodServer = "https://testnet-api.algonode.cloud"; // AlgoD API server
const algodPort = "443";

const JoinEvent: React.FC = () => {
  
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [peraWalletConnect, setPeraWalletConnect] = useState<PeraWalletConnect | null>(null);

    //const handleSubmit = async (event: React.FormEvent) => {
    const deductEventCost = async () => {

      if (!walletAddress) {
        console.error('Wallet address is not available. Please connect to your wallet.');
        return;
      }  

    try {
      const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

      const txnParams: algosdk.SuggestedParams = await algodClient.getTransactionParams().do();

      // Create a transaction to interact with the smart contract
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        walletAddress,
        "DFDFIMRFIRF3JZW3NPAKHTZ3YDL6CVNIO6MRRBSOJK6QO4LEJ6L4TRNZPE", // Replace with the receiver's address
        100000, // Amount in microAlgos (100 Algos) = 100000000
        undefined,
        undefined,
        txnParams
      );

      try {
        // Sign the transaction using PeraWalletConnect
        const signedTxn = await peraWalletConnect?.signTransaction([[{ txn }]]);
        if (!signedTxn) {
          console.error('Error signing the transaction.');
          return;
        }

        // Send the signed transaction
        const response = await algodClient.sendRawTransaction(signedTxn[0]).do();

        if (response.txId) {
          const txId = response.txId;
          console.log(`Transaction ID: ${txId}`);
          console.log("Event cost deducted successfully.");
          localStorage.setItem("transactionID", txId);
          setTransactionId(txId);
          window.location.href = "my-ticket.html";
        }
      } catch (error) {
        console.error('Error signing the transaction:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
      // Submit the transaction to the Algorand network
      //const response = await algodClient
        //.sendRawTransaction(signedTxn.blob)
        //.do();

      /*if (response.txId) {
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
    }*/
  }

  // Effect to initialize PeraWalletConnect and connect to wallet
  useEffect(() => {
    // Instantiate PeraWalletConnect when the component is mounted
    const walletConnect = new PeraWalletConnect();
    setPeraWalletConnect(walletConnect);

    // Reconnect to session when the component is mounted
    walletConnect.reconnectSession().then((accounts) => {
      if (accounts.length) {
        const newAddress = accounts[0];
        setWalletAddress(newAddress);
      }
    });
  }, []);

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
