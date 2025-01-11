import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";

const Airdrop = () => {
  const wallet = useWallet();
  const inputRef = useRef();
  const { connection } = useConnection();

  const [balance, setBalance] = useState(null);

  async function sendAirdrop() {
    if (inputRef.current.value > 0)
      await connection.requestAirdrop(
        wallet.publicKey,
        Number(inputRef.current.value) * LAMPORTS_PER_SOL
      );

    alert("Airdrop successfull");
  }
  const fetchBalance = async () => {
    if (wallet?.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [wallet.publicKey]);

  return (
    <div>
      <p>
        Public Key: {wallet?.publicKey?.toString()} <br /> Balance:{" "}
        {balance !== null ? `${balance} SOL` : "Loading..."}
      </p>
      <input
        type="number"
        min={0}
        max={1}
        placeholder="Amount"
        ref={inputRef}
        className="input"
      />
      <button className="space color" onClick={sendAirdrop}>Send Airdrop</button>
    </div>
  );
};

export default Airdrop;
