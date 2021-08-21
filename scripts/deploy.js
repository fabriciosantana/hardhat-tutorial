const { ethers, network } = require("hardhat");

async function main(){


    if (network.name === "hardhat") {
        console.warn(
          "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
      } else {
        console.warn(
          "You are trying to deploy a contract to the %s network using the Hardhat" +
            " option '--network %s'", network.name, network.name
        );
      }

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balanceBeforeDeploy = await deployer.getBalance();

    console.log("Account balance:", (balanceBeforeDeploy).toString());

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    console.log("Waiting for deploy");
    await token.deployed();
    console.log("Contract deployed to %s network", network.name);

    console.log("Token address:", token.address);
    
    const balanceAfterDeploy = await deployer.getBalance();
    console.log("Account balance:", (balanceAfterDeploy).toString());
    console.log("Deployment cost:", (balanceAfterDeploy - balanceBeforeDeploy).toString());

    saveFrontendFiles(token);

};

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });