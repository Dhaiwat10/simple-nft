import { expect } from "chai";
import { ethers } from "hardhat";

const TOKEN_URI =
  "https://gateway.pinata.cloud/ipfs/QmPf2x91DoemnhXSZhGDP8TX9Co8AScpvFzTuFt9BGAoBY";
const MINT_COST = ethers.utils.parseEther("0.001");

describe("SimpleNFT", function () {
  it("should mint an NFT successfully", async () => {
    const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
    const simpleNFT = await SimpleNFT.deploy(TOKEN_URI, MINT_COST);
    await simpleNFT.deployed();

    expect(await simpleNFT.commonTokenURI()).to.equal(TOKEN_URI);
    expect((await simpleNFT.mintCost()).toString()).to.equal(
      MINT_COST.toString()
    );

    const [account1] = await ethers.getSigners();

    const tx = await simpleNFT.mint(account1.address, {
      value: MINT_COST,
    });
    const receipt = await tx.wait();

    // @ts-ignore
    const mintedTokenId = await receipt.events[0].args[2].toString();
    expect(mintedTokenId).to.equal("0");

    const mintedTokenURI = await simpleNFT.tokenURI(mintedTokenId);
    expect(mintedTokenURI).to.equal(TOKEN_URI);
  });
});
