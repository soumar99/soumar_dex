const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();
    const erc  = await ethers.getContractFactory("ERC20");
    const sou = await erc.deploy("sou", "SOU", 10000);
    const sawa = await erc.deploy("sawa", "SAWA", 10000);
    const shou = await erc.deploy("shou", "SHOU", 10000);
    
    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.deploy([sou.address, sawa.address, shou.address]);

    await sou.transfer(dex.address, 10000);
    await sawa.transfer(dex.address, 10000);
    await shou.transfer(dex.address, 10000);
}

// sou: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
// sawa: 0x0165878A594ca255338adfa4d48449f69242Eb8F
// shou: 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
// dex: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
})