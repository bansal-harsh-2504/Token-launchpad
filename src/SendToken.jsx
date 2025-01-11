import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

function SendToken() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;
    const transaction = new Transaction();
    const { blockhash } = await connection.getLatestBlockhash(); //still work without this line but this ensures safety from double spends or replay attacks
    transaction.recentBlockhash = blockhash;
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert("Sent " + amount + " SOL to " + to);
  }

  return (
    <div>
      <input id="to" type="text" placeholder="To" className="input" />
      <input id="amount" type="text" placeholder="Amount" className="input"/>
      <button onClick={sendTokens} className="color">Send</button>
    </div>
  );
}

export default SendToken;
