import React from "react";

export function Welcome({ tokenName, tokenSymbol, address, balance}){
    return(
        <div className="row">
            <div className="col-12">
                <h1>
                    {tokenName} ({tokenSymbol})
                </h1>
                <p>
                    Welcome <b>{address}</b>, you have{" "}
                    <b>
                    {balance} {tokenSymbol}
                    </b>
                    .
                </p>
            </div>
      </div>
    );
}