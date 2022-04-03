const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ERC20 token contract", function() {
    it("Deploy ERC20 token contract", async function(){
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ERC20");
        const sou = await Token.deploy("sou", "SOU", 10000);
        const sawa = await Token.deploy("sawa", "SAWA", 10000);
        const shou = await Token.deploy("shou", "SHOU", 10000);
        console.log("sou:", sou.address);
        console.log("sawa:", sawa.address);
        console.log("shou:", shou.address);
        const name = await sou.name();
        const symbol = await sou.symbol();
        const totalSupply = await sou.totalSupply();
        const decimals = await sou.decimals();
        
        expect(name).to.equal("sou");
        expect(symbol).to.equal("SOU");
        expect(totalSupply).to.equal("10000");
        expect(decimals).to.equal(18);

    });
});

describe("ERC20 token methods", function() {
    it("balanceOf method", async function() {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ERC20");
        const sou = await Token.deploy("SOU", "sou", 10000);
        expect(await sou.balanceOf(owner.address)).to.equal(10000);
    });

    it("approve and allowance methods", async function() {
        const [owner, user2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ERC20");
        const sou = await Token.deploy("SOU", "sou", 10000);
        await sou.approve(user2.address, 500, {from: owner.address});
        allowance_value = await sou.allowance(owner.address, user2.address);
        expect(allowance_value).to.equal(500);
    });

    it("transfer method", async function() {
        const [owner, user2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ERC20");
        const sou = await Token.deploy("SOU", "sou", 10000);
        await sou.transfer(user2.address, 500, {from: owner.address});
        expect(await sou.balanceOf(user2.address)).to.equal(500);
    });

    
    // it("transferFrom method", async function() {
    //     const [owner, user2, user3] = await ethers.getSigners();
    //     const Token = await ethers.getContractFactory("ERC20");
    //     const sou = await Token.deploy("SOU", "sou", 10000);
    //     await sou.approve(user3.address, await sou.balanceOf(owner.address), {from: owner.address});
    //     await sou.connect(user3.address).transferFrom(owner.address, user2.address, 500);                
    //     expect(await sou.balanceOf(user2.address)).to.equal(500);
    // });
})