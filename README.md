# Eventrium 🎉

Eventrium is your gateway to event management and participation, empowered by blockchain technology for seamless fee handling. 💼🚀

## Overview 🌟

Eventrium simplifies event coordination, be it a grand conference, a cozy meetup, or an intimate gathering. Dive into a user-friendly platform for event creation, RSVPs, and ticketing. The magic happens with blockchain technology ensuring fees are handled smoothly and securely. 🎈

## Table of Contents 📜
- [Overview](#overview-)
- [Features](#features-)
- [Installation](#installation-)
- [Blockchain/Smart Contract Integration](#blockchainsmart-contract-integration-%EF%B8%8F)  (Click Here)
- [Take a Note](#-note-for-future-development-)

## Features 🚀

- **Create Event**: Effortlessly craft and customize events, complete with date, time, location, and details. 📅
- **Register into Event**: Seamless RSVP and registration process for event attendees. 📋
- **Generate Ticket (NFT)**: Create and issue event tickets as Non-Fungible Tokens (NFTs) for secure and unique entry. 🎫
- **Generate Certification (NFT)**: Issue event certifications as Non-Fungible Tokens (NFTs) for participants. 🏆
- **Give Reward (Crypto)**: Reward event participants with cryptocurrency prizes, fostering engagement and competition. 💰

Now, Eventrium offers a comprehensive set of features to make your events unforgettable, from registration to rewarding excellence! 🔥

## Installation 💻

1. Clone the Eventrium repository to your local machine:

   ```bash
   git clone https://github.com/luqmanhakim02/Eventrium.git

2. Install the required dependencies:

   ```bash
   cd eventrium-react-app
   npm install
   npm install algosdk

3. Configure the application settings, including blockchain integration.
4. Start the Eventrium server:
   
   ```bash
   npm run dev

5. Access Eventrium in your web browser at 'http://localhost:3000' or any port that shown in the terminal. 🌐

## Blockchain/Smart Contract Integration ⛓️

Eventrium leverages blockchain and smart contract technology for a frictionless fee-handling experience. Dive into the code in [`eventrium-react-app/src/join-event.tsx`](eventrium-react-app/src/join-event.tsx) to see how it's done.

In the code:

- 'algosdk' joins the party to interact with the Algorand blockchain.
- AlgoD API token, server, and port are set for seamless Algorand network connection.
- senderMnemonic secures transactions with the sender's mnemonic.
- JoinEvent is the maestro behind smart contract interactions, orchestrating event cost deductions.

Don't forget to swap out the placeholders (algodToken, senderMnemonic, receiver's address, etc.) with your actual values. This code orchestrates a flawless dance of fee deduction, logging transaction details, and gracefully ushering users to [my-ticket.html](eventrium-react-app/my-ticket.html) upon successful payment. 🎩👏

## **📝 Note for Future Development** 🚀

Welcome to the early version of our web app! 🌟

- The sender and receiver addresses you see in the code are here for testing purposes, giving you a sneak peek into our blockchain prowess.
  
- 🌐 Hold onto your seats, as we have exciting plans for future updates. We're gearing up to introduce a secure and user-friendly **pera wallet** for those smooth-as-silk transactions.

Stay with us on this incredible journey as we keep enhancing the Eventrium experience! Your feedback and ingenious ideas are like gold to us. 🙌

Now, let's make some unforgettable events together. 🚀✨
