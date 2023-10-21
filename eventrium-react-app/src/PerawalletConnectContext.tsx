import React, { createContext, useContext, ReactNode } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

const PerawalletConnectContext = createContext<PeraWalletConnect | null>(null);

export const PerawalletConnectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const peraWallet = new PeraWalletConnect();

  // You can include other initialization or setup logic here

  return (
    <PerawalletConnectContext.Provider value={peraWallet}>
      {children}
    </PerawalletConnectContext.Provider>
  );
};

export const usePerawalletConnect = () => {
  return useContext(PerawalletConnectContext)!;
};
