import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleNFT", function () {
  it("should mint an NFT successfully", async () => {
    const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
    const simpleNFT = await SimpleNFT.deploy();
    await simpleNFT.deployed();

    expect(await simpleNFT.COMMON_TOKEN_URI()).to.equal(
      "https://gateway.pinata.cloud/ipfs/QmPrVVinxdtiLq1BymDRTt9HkfcvCUqeM1WboYydDrqGJq"
    );

    const [account1] = await ethers.getSigners();

    const tx = await simpleNFT.mint(account1.address, {
      value: ethers.utils.parseEther("0.001"),
    });
    const receipt = await tx.wait();

    // @ts-ignore
    const mintedTokenId = await receipt.events[0].args[2].toString();
    expect(mintedTokenId).to.equal("0");

    const mintedTokenURI = await simpleNFT.tokenURI(mintedTokenId);
    expect(mintedTokenURI).to.equal(
      "https://gateway.pinata.cloud/ipfs/QmPrVVinxdtiLq1BymDRTt9HkfcvCUqeM1WboYydDrqGJq"
    );
  });
});
