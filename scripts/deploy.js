const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balanceBeforeDeploy = await deployer.getBalance();

    console.log("Account balance:", (balanceBeforeDeploy).toString());

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    console.log("Token address:", token.address);
    const balanceAfterDeploy = await deployer.getBalance();
    console.log("Account balance:", (balanceAfterDeploy).toString());
    console.log("Deployment cost:", (balanceAfterDeploy - balanceBeforeDeploy).toString());
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });