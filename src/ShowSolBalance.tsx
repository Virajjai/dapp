import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from 'react';

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    async function getBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        }
    }

    useEffect(() => {
        getBalance();
    }, [wallet.publicKey, connection]);

    return (
        <div>
            <p>SOL Balance:</p>
            <div id="balance">
                {balance !== null ? balance.toFixed(2) : 'Loading...'}
            </div>
        </div>
    );
}
