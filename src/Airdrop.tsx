import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import React from "react";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        const amountInput = document.getElementById("amount") as HTMLInputElement | null;
        if (amountInput && wallet.publicKey) {
            const amount = parseFloat(amountInput.value);
            if (!isNaN(amount) && amount > 0) {
                const signature = await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
                alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
                console.log(`Transaction Signature: ${signature}`);
            } else {
                alert("Please enter a valid amount.");
            }
        } else {
            alert("Wallet is not connected or amount is invalid.");
        }
    }

    return (
        <div>
            <br /><br />
            <input id="amount" type="text" placeholder="Amount" />
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    );
}
