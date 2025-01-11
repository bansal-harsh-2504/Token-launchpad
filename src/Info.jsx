import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import {
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

const Info = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState(null);
  const [tokenAccounts, setTokenAccounts] = useState([]);

  const fetchBalance = async () => {
    if (wallet?.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  async function fetchATAs() {
    if (!wallet?.publicKey) return;

    try {
      const accounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey,
        { programId: TOKEN_2022_PROGRAM_ID }
      );

      const tokens = accounts.value.map((accountInfo) => {
        const accountData = accountInfo.account.data.parsed.info;
        const publicKey = new PublicKey(accountData.mint);
        const ata = getAssociatedTokenAddressSync(
          publicKey,
          wallet.publicKey,
          true,
          TOKEN_2022_PROGRAM_ID
        );
        return {
          mint: accountData.mint,
          balance: accountData.tokenAmount.uiAmount,
          decimals: accountData.tokenAmount.decimals,
          ata: ata.toBase58(),
        };
      });

      setTokenAccounts(tokens);
    } catch (error) {
      console.error("Error fetching token accounts:", error);
    }
  }

  useEffect(() => {
    fetchBalance();
    fetchATAs();
  }, [wallet.publicKey]);

  return (
    <div>
      <p>
        Public Key: {wallet?.publicKey?.toString()} <br />
        Balance: {balance !== null ? `${balance} SOL` : "Loading..."}
      </p>
      <h3>Associated Token Accounts:</h3>
      {tokenAccounts?.length > 0 ? (
        <ul>
          {tokenAccounts.map((token, index) => (
            <li key={index}>
              <strong>Mint:</strong> {token.mint} <br />
              <strong>Balance:</strong> {token.balance} <br />
              <strong>Decimals:</strong> {token.decimals}
              <br />
              <strong>ATA:</strong> {token.ata}
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No tokens found or wallet not connected.</p>
      )}
    </div>
  );
};

export default Info;
