const algosdk = require('algosdk');

const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const algodServer = 'http://localhost:4001'; // Algorand Sandbox node URL

const algodClient = new algosdk.Algodv2(algodToken, algodServer);
