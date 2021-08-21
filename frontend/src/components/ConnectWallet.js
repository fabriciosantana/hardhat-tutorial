import React from "react";
import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networtError, dismiss}){
    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-12 text-center">
                    {/* Metamask network should be set to Localhost:8545. */}
                    {networtError && (
                        <NetworkErrorMessage
                            message={networtError}
                            dismiss={dismiss}/>
                    )}
                </div>
                <div className="col-6 p-4 text-center">
                    <p>Please connect to your wallet.</p>
                    <button
                        className="btn btn-warning"
                        type="button"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        </div>
    );
};