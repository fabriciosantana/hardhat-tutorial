const { expect } = require("chai");
const { Signer } = require("ethers");
const { ethers } = require("hardhat");

describe("Token contract", function () {

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function(){

    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, addrs] = await ethers.getSigners(); //accounts
    hardhatToken = await Token.deploy();

  });

  describe("Deployment", function(){
    it("Should set the right owner", async function(){
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Check token name and symbol", async function(){
      expect(await hardhatToken.name()).to.equal("My Hardhat Token");
      expect(await hardhatToken.symbol()).to.equal("MHT");
    });
    it("Should assign the total supply of tokens to the owner", async function () {
      expect(parseInt(await hardhatToken.totalSupply())).to.equal(1000000);
      expect(await hardhatToken.totalSupply()).to.equal(await hardhatToken.balanceOf(owner.address));
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {

      // Transfer 50 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
  
      // Transfer 50 tokens from addr1 to addr2
      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(0);
    });

    it("Should fail if sender doesn't have enough tokens", async function(){
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function(){
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await hardhatToken.transfer(addr1.address, 100);

      await hardhatToken.transfer(addr2.address, 50);

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance - 150);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(100);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });

  });

});


  describe("Exploring Signers", function (){
    it("Just to explorer Signers", async function (){
  
      const [owner] = await ethers.getSigners();
  
      // signer
      expect(await owner.getAddress()).to.equal(owner.address); // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      expect(Signer.isSigner(owner)).to.equal(true);
      //expect(await owner.getBalance()).to.equal("0x021e19e0c9bab2400000");
      //expect(parseInt(await owner.getBalance())).to.equal(10000000000000000000000);
      expect(await owner.getChainId()).to.equal(31337); //hardhat default chainID
      //expect(await owner.getGasPrice()).to.equal(0x6fc23ac0);
      //expect(parseInt(await owner.getGasPrice())).to.equal(1875000000);
      //expect(await owner.getTransactionCount()).to.equal(3);
          
      //console.log(await owner.call());
      expect(await owner.estimateGas()).to.equal(0xcf09);
      expect(parseInt(await owner.estimateGas())).to.equal(53001);
      //console.log(await owner.resolveName("vitalik.eth"));
  
      //signing
      expect(await owner.signMessage(0x1234)).to.equal("0x87b638f4675a39ef49eb0379a7f5d248affd109cc6cb5b69457d7e8394d7d85274c8b407ca2b2b37ba4cc9c3bcfde488f7f59748175764b928324bd31c0f93851c"); 
      expect(await owner.signMessage("0x1234")).to.equal("0x2d22d2ef4a14507f1b1c42d786fdd924cfaa3e3274b869d2ea58ff0afdedbd9b40bb0647224b373bc9dfac19f5261ac45dc9999a7f93e0118dc1f1aecea219d11b"); 
      expect(await owner.signMessage([0x12], [0x34])).to.equal("0x4006c939bfd3e58fdc1be6bde30058a89d107592f0a5b40ce911488408e4069f3e373191e4f2789f7db7d87319de879cef3f8b51757e81d699ce826d4c0e25001b"); 
         
      //console.log(await owner.signTransaction()); 
      //console.log(await owner.sendTransaction()); 
  
      const transactionRequest = await owner.checkTransaction();
      console.log(await transactionRequest.to);
      console.log(await transactionRequest.from);
      console.log(await transactionRequest.nonce);
      console.log(await transactionRequest.data);
      console.log(await transactionRequest.value);
      console.log(await transactionRequest.gasLimit);
      console.log(await transactionRequest.gasPrice);
      console.log(await transactionRequest.maxFeePerGas);
      console.log(await transactionRequest.maxPriorityFeePerGas);
      console.log(await transactionRequest.chainId);
      console.log(await transactionRequest.type);
      console.log(await transactionRequest.accessList);
  
      //console.log(await owner.populateTransaction()); 
  
      //console.log(Token.interface); //contractFactory
      //console.log(Token.bytecode);
      //console.log(Token.signer);
  
      //console.log(hardhatToken.address); //contract
      //console.log(await hardhatToken.resolvedAddress);
      //console.log(hardhatToken.interface);
      //console.log(hardhatToken.provider);
      //console.log(hardhatToken.signer);
    })
  })