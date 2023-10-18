import React, { useEffect, useState } from 'react';
import algosdk from 'algosdk';

const MyComponent: React.FC = () => {
    const [applicationArguments, setApplicationArguments] = useState<string[]>([]);

    useEffect(() => {
        // Initialize the Algod client
        const algodToken = '';
        const algodAddress = 'https://testnet-api.algonode.cloud';
        const client = new algosdk.Algodv2(algodToken, algodAddress, 443);

        const index = 438536777;
        const app = client.getApplicationByID(index).do();

        console.log(app);

        // Fetch application information
        
    }, []);

    return (
        <div>
            <h1>Application Arguments</h1>
            <ul>
                {applicationArguments.map((arg, index) => (
                    <li key={index}>{arg}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
