declare module './WalletConnect' {
    export interface WalletConnectProps {
      walletAddress: string;
      onAddressChange: (address: string | null) => void;
    }
  }