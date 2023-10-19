import React, { useState, useEffect } from "react";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const algodToken = ""; // Your AlgoD API token
const algodServer = "https://testnet-api.algonode.cloud"; // AlgoD API server
const algodPort = "443";
interface Event {
  eventID: string;
  transactionId: string;
  eventDetails: {
    eventID: string;
    event_name: string;
    event_date: string;
    event_price: string;
    description: string;
  };
  walletAddress: string;
  // Add more properties as needed
}

const JoinEvent: React.FC = () => {
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [peraWalletConnect, setPeraWalletConnect] =
    useState<PeraWalletConnect | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const eventID = urlParams.get("eventID");

  const existingEvents: Event[] = JSON.parse(
    localStorage.getItem("events") || "[]"
  );

  const selectedEvent = existingEvents.find(
    (event) => event.eventID === eventID
  );

  let eventPrice: number | bigint;
  let receiverAddress: string;

  if (eventID == '0') {
    eventPrice = 1000000;
    receiverAddress =
      "P3SN54U6DEFBWDEKTRCECZA57S3VETH7A5PH2AQ2TLUKBS5FSJIW2LPGPA";
  } else {
    eventPrice = parseFloat(selectedEvent!.eventDetails.event_price) * 1000000;
    receiverAddress = selectedEvent!.walletAddress;
  }

  console.log("existingEvents:", existingEvents);
  console.log(eventID);
  console.log(selectedEvent);
  console.log(eventPrice);
  console.log(receiverAddress);
  //const handleSubmit = async (event: React.FormEvent) => {
  const deductEventCost = async () => {
    if (!walletAddress) {
      console.error(
        "Wallet address is not available. Please connect to your wallet."
      );
      alert(
        "Wallet address is not available. Please connect to your wallet."
      );
      return;
    }

    try {
      const algodClient = new algosdk.Algodv2(
        algodToken,
        algodServer,
        algodPort
      );

      const txnParams: algosdk.SuggestedParams = await algodClient
        .getTransactionParams()
        .do();

      // Create a transaction to interact with the smart contract
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        walletAddress,
        receiverAddress, // Replace with the receiver's address
        eventPrice, // Amount in microAlgos (1 Algos) = 1000000
        undefined,
        undefined,
        txnParams
      );

      try {
        // Sign the transaction using PeraWalletConnect
        const signedTxn = await peraWalletConnect?.signTransaction([[{ txn }]]);
        if (!signedTxn) {
          console.error("Error signing the transaction.");
          alert("Error signing the transaction.");
          return;
        }

        // Send the signed transaction
        const response = await algodClient
          .sendRawTransaction(signedTxn[0])
          .do();

        if (response.txId) {
          const txId = response.txId;
          console.log(`Transaction ID: ${txId}`);
          console.log("Event cost deducted successfully.");
          localStorage.setItem("transactionID", txId);
          setTransactionId(txId);
          window.location.href = "my-ticket.html";
        }
      } catch (error) {
        console.error("Error signing the transaction:", error);
        alert("Error signing the transaction:"+ error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:"+ error);
    }
  };

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

  if (selectedEvent == null)
    return (
      <section>
        <div className="container">
          <div style={{ height: "200px" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="img/featured/feature-1.jpg"
              alt="Featured Event"
            />
          </div>
          <div style={{ margin: "30px" }}>
            <div className="row">
              <div style={{ width: "75%", paddingRight: "30px" }}>
                <h2>
                  <b>ALGORAND Hackathon</b>
                  <br />
                  <br />
                </h2>
                <h4>
                  Date: October 18 · 9:00am - October 23 · 11:59pm +08UTC
                  <br />
                  UTM, Johor Bahru
                  <br />
                  Algorand Student Council
                  <br />
                  <br />
                </h4>
                <p>
                  Welcome to the Algorand Hackathon! This event is a great
                  opportunity for students to showcase their skills and gain
                  valuable experience in the field of blockchain technology and
                  Python. The hackathon will take place on October 23, 2023, and
                  will feature a series of workshops and hands-on activities
                  that will allow participants to learn about the Algorand
                  blockchain platform and Python programming language.
                </p>
                <p>
                  <b>About This Event</b>
                  <br />
                  - One Week Hackathon Competition
                  <br />
                  - Mobile eTicket
                  <br />- Winning Prizes
                </p>
                <p>
                  The hackathon will be held online, and participants will have
                  the opportunity to work together in teams to develop their
                  projects. Each team will have access to the Algorand Developer
                  Portal, which will provide them with the tools they need to
                  create their projects.
                </p>
                <p>
                  <b>Tags</b>
                  <br />
                  <span style={{ color: "blue" }}>
                    #hackathon #belajar #algorand #blockchain
                  </span>
                </p>
                <p>
                  <b>About the organizer</b>
                </p>
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    background: "#ffff",
                    borderRadius: "20px",
                  }}
                >
                  <div className="row">
                    <div>
                      <img
                        src="img/algo-logo.png"
                        style={{
                          width: "70px",
                          margin: "10px 30px",
                          maxWidth: "100px",
                        }}
                        alt="Algo Logo"
                      />
                    </div>
                    <div>
                      <div style={{ paddingTop: "20px" }}>
                        <h4>Algorand Student Council</h4>
                        <h6>1,077 followers</h6>
                      </div>
                    </div>
                    <div style={{ margin: "auto", color: "blue" }}>Follow</div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: "130px",
                    width: "250px",
                    borderRadius: "24px",
                    border: "3.5px #f3f6fa solid",
                  }}
                >
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
                  <div
                    style={{
                      textAlign: "center",
                      color: "#424242",
                      fontSize: "30px",
                      fontFamily: "Cairo",
                      fontWeight: 600,
                      lineHeight: "50px",
                      wordWrap: "break-word",
                      width: "100%",
                    }}
                  >
                    1 ALGO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  else
    return (
      <section>
        <div className="container">
          <div style={{ height: "200px" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="img/featured/feature-2.jpg"
              alt="Featured Event"
            />
          </div>
          <div style={{ margin: "30px" }}>
            <div className="row">
              <div style={{ width: "75%", paddingRight: "30px" }}>
                <h2>
                  <b>{selectedEvent.eventDetails.event_name}</b>
                  <br />
                  <br />
                </h2>
                <h4>
                  {selectedEvent.eventDetails.event_date} +08UTC
                  <br />
                  Rekascape, Cyberjaya
                  <br />
                  Eventrium Team
                  <br />
                  <br />
                </h4>
                <p>{selectedEvent.eventDetails.description}</p>
                <p>
                  <b>About This Event</b>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent auctor fringilla nulla, sed posuere purus malesuada
                  id. Vivamus sollicitudin sapien id sagittis. Sed euismod erat
                  sit amet arcu euismod lacinia. Nulla facilisi. Donec sed risus
                  tortor. Nulla ut mauris id elit tristique volutpat. Quisque in
                  est justo. Sed sit amet elit ex. Sed non turpis ac risus
                  hendrerit cursus.
                </p>
                <p>
                  Vestibulum tristique ipsum et sapien tristique, ac vehicula
                  justo interdum. Maecenas tristique dolor a urna bibendum, nec
                  lacinia felis tincidunt. Sed sed ante vel libero efficitur
                  elementum. Nunc interdum tincidunt metus id bibendum. Praesent
                  lacinia nulla ac dui tincidunt, et vehicula orci tincidunt.
                  Suspendisse potenti.
                </p>
                <p>
                  <b>Tags</b>
                  <br />
                  <span style={{ color: "blue" }}>#eventrium #event</span>
                </p>
                <p>
                  <b>About the organizer</b>
                </p>
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    background: "#ffff",
                    borderRadius: "20px",
                  }}
                >
                  <div className="row">
                    <div>
                      <img
                        src="img/logo.png"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection:
                            "column" /* Optional, if you want to center both horizontally and vertically */,
                          width: "70px",
                          margin: "10px 30px",
                          maxWidth: "100px",
                        }}
                        alt="Algo Logo"
                      />
                    </div>
                    <div>
                      <div style={{ paddingTop: "20px" }}>
                        <h4>Eventrium</h4>
                        <h6>238 followers</h6>
                      </div>
                    </div>
                    <div style={{ margin: "auto", color: "blue" }}>Follow</div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: "130px",
                    width: "250px",
                    borderRadius: "24px",
                    border: "3.5px #f3f6fa solid",
                  }}
                >
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
                  <div
                    style={{
                      textAlign: "center",
                      color: "#424242",
                      fontSize: "30px",
                      fontFamily: "Cairo",
                      fontWeight: 600,
                      lineHeight: "50px",
                      wordWrap: "break-word",
                      width: "100%",
                    }}
                  >
                    {selectedEvent!.eventDetails.event_price} ALGO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default JoinEvent;
