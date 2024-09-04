import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        const toInput = document.getElementById("to") as HTMLInputElement | null;
        const amountInput = document.getElementById("amount") as HTMLInputElement | null;

        if (toInput && amountInput && wallet.publicKey) {
            const to = toInput.value;
            const amount = parseFloat(amountInput.value);
            
            if (!PublicKey.isOnCurve(new PublicKey(to).toBuffer())) {
                alert("Invalid recipient address.");
                return;
            }

            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            try {
                const signature = await wallet.sendTransaction(transaction, connection);
                await connection.confirmTransaction(signature, 'confirmed');
                alert(`Sent ${amount} SOL to ${to}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error : any) {
                alert(`Transaction failed: ${error.message}`);
            }
        } else {
            alert("Please enter valid inputs and connect your wallet.");
        }
    }

    return (
        <div>
            <input id="to" type="text" placeholder="Recipient Address" />
            <input id="amount" type="text" placeholder="Amount (SOL)" />
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}
