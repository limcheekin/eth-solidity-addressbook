import { ethers } from "hardhat";

async function main() {
  const AddressBook = await ethers.getContractFactory("AddressBook");
  const addressBook = await AddressBook.deploy();
  await addressBook.deployed()

  console.log(`AddressBook contract deployed to ${addressBook.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
