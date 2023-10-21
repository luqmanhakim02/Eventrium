import { useEffect, useState } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect();

function WalletAddress({ onAddressChange }: { onAddressChange: (address: string | null) => void }) {
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // reconnect to session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

      if (accounts.length) {
        const newAddress = accounts[0];
        setAccountAddress(newAddress);
        onAddressChange(newAddress); // Notify the parent component of the wallet address
      }
    });
  }, []);

  function handleConnectWalletClick() {
    peraWallet.connect().then((newAccounts) => {
      // setup the disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

      if (newAccounts.length > 0) {
        const newAddress = newAccounts[0];
        setAccountAddress(newAddress);
        onAddressChange(newAddress); // Notify the parent component of the wallet address
      }
    });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
    onAddressChange(null); // Notify the parent component of the disconnection
  }

  return (
    <div>
      <div>
        <button
          className="wallet-btn"
          onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}
        >
          {isConnectedToPeraWallet ? 'Disconnect' : 'Connect to Pera Wallet'}
        </button>
      </div>
    </div>
  );
}

export default WalletAddress;