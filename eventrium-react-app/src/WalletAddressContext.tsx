import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePerawalletConnect } from './PerawalletConnectContext';

const WalletAddressContext = createContext<string | null>(null);

type WalletAddressProviderProps = {
  children: ReactNode;
};

export const WalletAddressProvider: React.FC<WalletAddressProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const peraWalletConnect = usePerawalletConnect();

  useEffect(() => {
    async function fetchWalletAddress() {
      try {
        if (peraWalletConnect) {
          const newAccounts = await peraWalletConnect.connect();
          if (newAccounts.length > 0) {
            setAddress(newAccounts[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching wallet address:', error);
      }
    }

    fetchWalletAddress();
  }, [peraWalletConnect]);

  return (
    <WalletAddressContext.Provider value={address}>
      {children}
    </WalletAddressContext.Provider>
  );
};

export const useWalletAddress = () => {
  return useContext(WalletAddressContext);
};
