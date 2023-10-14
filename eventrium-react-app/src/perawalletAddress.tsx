import React, { useEffect, useState } from 'react';
import { usePerawalletConnect } from './PerawalletConnectContext';

const WalletAddress: React.FC = () => {
  const peraWallet = usePerawalletConnect();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWalletAddress() {
      try {
        const newAccounts = await peraWallet.connect();
        if (newAccounts.length > 0) {
          setAccountAddress(newAccounts[0]);
        }
      } catch (error) {
        console.error('Error fetching wallet address:', error);
      }
    }

    if (!accountAddress) {
      fetchWalletAddress();
    }
  }, [peraWallet, accountAddress]);

  async function handleConnectWalletClick() {
    try {
      const newAccounts = await peraWallet.connect();
      if (newAccounts.length > 0) {
        setAccountAddress(newAccounts[0]);
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  }

  return (
    <div>
      {accountAddress ? (
        <div>
          <p>Wallet Address: {accountAddress}</p>
          {/* Other content you want to display when the wallet is connected */}
        </div>
      ) : (
        <div>
          <p>Connecting to wallet...</p>
          <button onClick={handleConnectWalletClick}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default WalletAddress;
