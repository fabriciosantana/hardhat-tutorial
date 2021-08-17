const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {

    //console.log(await ethers.getSigners());

    const [owner] = await ethers.getSigners();

    console.log(owner.address);
    console.log(await owner.getBalance());
    
    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    console.log(hardhatToken.address);
    console.log(await hardhatToken.name());
    console.log(await hardhatToken.owner());
    console.log(await hardhatToken.symbol());
    console.log(await hardhatToken.totalSupply());
    
    console.log(await hardhatToken.balanceOf(owner.address));
    
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    console.log(await hardhatToken.balanceOf(owner.address));

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});