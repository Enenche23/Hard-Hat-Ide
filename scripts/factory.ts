import { ethers } from "hardhat";

async function main() {
  const [owner, admin2] = await ethers.getSigners();
  const admin = [owner.address, admin2.address, "0xfa1674F6D697c97041e95396aA436D73cf01f186"];
  

  const CloneMultiSig = await ethers.getContractFactory("cloneMultiSig");
  const cloneMultiSig = await CloneMultiSig.deploy();
  await cloneMultiSig.deployed();

  console.log(`Multisig Address is ${cloneMultiSig.address}`);
  console.log(owner.address, admin2.address,"0xfa1674F6D697c97041e95396aA436D73cf01f186");

  const newMultisig = await cloneMultiSig.createMultiSig(admin);
  let event = await newMultisig.wait();
  let newChild = event.events[0].args[0];
  console.log(newChild);

  //////////////////////////////////////////////////

  const childMultisig = await ethers.getContractAt("IMultisig", newChild);
  const addresses = await childMultisig.returnAdmins();
  console.log(addresses);

  await childMultisig.addAdmin("0x22a9e1E690Ac1441ED9fCC9Bc45F81AF3a8d1E8B");
  await childMultisig.connect(admin2).addAdmin("0x22a9e1E690Ac1441ED9fCC9Bc45F81AF3a8d1E8B");

  const addressesNew = await childMultisig.returnAdmins();
  console.log(addressesNew);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});