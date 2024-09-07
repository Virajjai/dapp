import React, { useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { SendTokens } from './SendTokens.tsx';
import { SignMessage } from './SignMessage.tsx';
import { RequestAirdrop } from './Airdrop.tsx';
import { ShowSolBalance } from './ShowSolBalance.tsx';
// import { Tokens } from './Tokens.tsx';
import './App.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { initParallaxEffect } from './parallax.tsx'; 
import './background.css'; 

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  useEffect(() => {
    initParallaxEffect(); // Initialize the parallax effect on component mount
  }, []);

    

  return (
    <div className="App">
      <div id="parallax-background">
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="wallet-container">
            {/* Header Section */}
            <div className="wallet-header">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>

            {/* Cards Section */}
            <div className="cards-container">
              {/* Balance Card */}
              <div className="card">
                <h3>Wallet Balance</h3>
                <ShowSolBalance />
              </div>

              {/* Airdrop Card */}
              <div className="card">
                <h3>Request Airdrop</h3>
                <RequestAirdrop />
              </div>

              {/* Send Tokens Card */}
              <div className="card">
                <h3>Send Tokens</h3>
                <SendTokens />
              </div>

              {/* Sign Message Card */}
              <div className="card">
                <h3>Sign Message</h3>
                <SignMessage />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
    </div>
  );
}

export default App