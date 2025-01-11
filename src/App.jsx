import "./App.css";
import { TokenLaunchpad } from "./TokenLaunchpad";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";
import SendToken from "./SendToken";
import SignMessage from "./SignMessage";
import TokenLaunchpadMetaData from "./TokenLaunchpadMetaData";
import TokenLaunchpadMetadataWithMint from "./TokenLaunchpadMetadataWithMint";
import { useState } from "react";
import Info from "./Info";
import SendAssociatedToken from "./SendAssociatedToken";

function App() {
  const [activeComponent, setActiveComponent] = useState("Info");

  const loadComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div style={{ width: "100vw" }}>
      <ConnectionProvider endpoint={import.meta.env.VITE_RPC_ENDPOINT_URL}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <button
              className={`space ${activeComponent == "Info" ? "active" : ""}`}
              onClick={() => loadComponent("Info")}
            >
              Info
            </button>
            <button
              className={`space ${
                activeComponent == "Airdrop" ? "active" : ""
              }`}
              onClick={() => loadComponent("Airdrop")}
            >
              Airdrop
            </button>
            <button
              className={`space ${
                activeComponent == "SignMessage" ? "active" : ""
              }`}
              onClick={() => loadComponent("SignMessage")}
            >
              Sign Message
            </button>
            <button
              className={`space ${
                activeComponent == "SendToken" ? "active" : ""
              }`}
              onClick={() => loadComponent("SendToken")}
            >
              Send Tokens
            </button>
            <button
              className={`space ${
                activeComponent == "TokenLaunchpad" ? "active" : ""
              }`}
              onClick={() => loadComponent("TokenLaunchpad")}
            >
              Token Launchpad
            </button>
            <button
              className={`space ${
                activeComponent == "Metadata" ? "active" : ""
              }`}
              onClick={() => loadComponent("Metadata")}
            >
              Token Launchpad With MetaData
            </button>
            <button
              className={`space ${activeComponent == "Mint" ? "active" : ""}`}
              onClick={() => loadComponent("Mint")}
            >
              Token Launchpad With Metadata and ATA
            </button>
            <button
              className={`space ${
                activeComponent == "sendAta" ? "active" : ""
              }`}
              onClick={() => loadComponent("sendAta")}
            >
              Send Associated Tokens
            </button>

            <div className="components">
              {activeComponent === "Airdrop" && <Airdrop />}
              {activeComponent === "SignMessage" && <SignMessage />}
              {activeComponent === "SendToken" && <SendToken />}
              {activeComponent === "TokenLaunchpad" && <TokenLaunchpad />}
              {activeComponent === "Metadata" && <TokenLaunchpadMetaData />}
              {activeComponent === "Mint" && <TokenLaunchpadMetadataWithMint />}
              {activeComponent === "Info" && <Info />}
              {activeComponent === "sendAta" && <SendAssociatedToken />}
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
