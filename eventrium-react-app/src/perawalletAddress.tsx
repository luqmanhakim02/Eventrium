import React, { useEffect, useState } from 'react';
import { usePerawalletConnect } from './PerawalletConnectContext';

const WalletAddress: React.FC = () => {
  const peraWallet = usePerawalletConnect();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  useEffect(() => {
    // Your component logic here
  }, [peraWallet]);

  return (
    <div>
      {/* Your JSX code */}
    </div>
  );
};

export default WalletAddress;
