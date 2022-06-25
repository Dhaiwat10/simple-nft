// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const TOKEN_URI =
  "https://gateway.pinata.cloud/ipfs/QmPf2x91DoemnhXSZhGDP8TX9Co8AScpvFzTuFt9BGAoBY";
const MINT_COST = ethers.utils.parseEther("0.001");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
  const simpleNFT = await SimpleNFT.deploy(TOKEN_URI, MINT_COST);

  await simpleNFT.deployed();

  console.log("SimpleNFT deployed to:", simpleNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
