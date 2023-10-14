import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletAddressContextType {
  walletAddress: string | null;
  updateWalletAddress: (address: string | null) => void;
}

const WalletAddressContext = createContext<WalletAddressContextType | undefined>(undefined);

interface WalletAddressProviderProps {
  children: ReactNode;
}

export const WalletAddressProvider: React.FC<WalletAddressProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const updateWalletAddress = (address: string | null) => {
    setWalletAddress(address);
  };

  return (
    <WalletAddressContext.Provider value={{ walletAddress, updateWalletAddress }}>
      {children}
    </WalletAddressContext.Provider>
  );
};

export const useWalletAddress = () => {
  const context = useContext(WalletAddressContext);
  if (!context) {
    throw new Error('useWalletAddress must be used within a WalletAddressProvider');
  }
  return context;
};
