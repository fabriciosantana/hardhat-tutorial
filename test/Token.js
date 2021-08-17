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

describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      const Token = await ethers.getContractFactory("Token");
  
      const hardhatToken = await Token.deploy();
  
      // Transfer 50 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
  
      // Transfer 50 tokens from addr1 to addr2
      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });
  });