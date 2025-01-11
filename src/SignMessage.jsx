import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    const encodedMessage = new TextEncoder().encode(
      `${
        window.location.host
      } wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`
    );
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    alert(`Success, Message signature: ${bs58.encode(signature)}`);
  }

  return (
    <div>
      <button className="color" onClick={onClick}>Sign Message ( Authenticate )</button>
    </div>
  );
};

export default SignMessage;
