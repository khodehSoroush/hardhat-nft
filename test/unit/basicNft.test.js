const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT Unit Test", function () {
      let basicNft, deployer;
      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["basicNft"]);
        basicNft = await ethers.getContract("basicNft");
      });

      describe("Constructor", function () {
        it("Initilizes the NFT Correctly", async () => {
          const name = await basicNft.name();
          const symbol = await basicNft.symbol();
          const tokenCounter = await basicNft.getTokenCounter();
          assert.equal(name, "Dogie");
          assert.equal(symbol, "DOG");
          assert.equal(tokenCounter.toString(), "0");
        });
      });

      describe("Mint Nft", () => {
        it("Allows users to mint an NFT, and updates appropriately", async () => {
          const txResponse = await basicNft.mintNft();
          await txResponse.wait(1);
          const tokenURI = await basicNft.tokenURI(0);
          const tokenCounter = await basicNft.getTokenCounter();

          assert.equal(tokenCounter.toString(), "1")
          assert.equal(tokenURI , await basicNft.TOKEN_URI())
        });
      });
    });
