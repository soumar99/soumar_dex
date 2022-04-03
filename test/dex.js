const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("DEX contract", function() {
    it("DEX deploy", async function() {
        const erc  = await ethers.getContractFactory("ERC20");
        const sou = await erc.deploy("sou", "SOU", 10000);
        const sawa = await erc.deploy("sawa", "SAWA", 10000);
        const shou = await erc.deploy("shou", "SHOU", 10000);
        
        const Dex = await ethers.getContractFactory("Dex");
        const dex = await Dex.deploy([sou.address, sawa.address, shou.address]);
        console.log("dex address:", dex.address);
        expect(true);
    });

    it("If error happen when buying unsupported token ", async function(){
        const [owner, user2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ERC20");
        const sou = await Token.deploy("SOU", "sou", 10000);
        const natu = await Token.deploy("NATU", "natu", 5000);
        const un_token = await Token.deploy("a", "a", 1000);
        const DEX = await ethers.getContractFactory("Dex");
        const dex = await DEX.deploy([sou.address, natu.address]);
        try{
            await dex.buyToken(un_token.address, 1, 50);
            console.log("Unexpected successful termination");
            expect(false);
        } catch(error){
            console.log(error);
            expect(true);
        }
    });
});

