import React, { useMemo } from 'react';
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

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                {<RequestAirdrop />}
                {<ShowSolBalance /> }
                {/* { <Tokens /> } */}
                <SignMessage />
                <SendTokens />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default App