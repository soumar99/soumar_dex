let web3, user;
let token_name = undefined;
let priceData;
let outputData;
let dex_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
let sou_address = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
let sawa_address = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
let shou_address = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
let dex_contract;
let sou_contract;
let sawa_contract;
let shou_contract;

    const dex_abi = [
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "_tokenAddr",
              "type": "address[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "_tokenAddr",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_cost",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "buy",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "_tokenAddr",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_cost",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "sell",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_tokenAddr",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_cost",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "buyToken",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_tokenAddr",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_cost",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "sellToken",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "supportedTokenAddr",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
    
    const erc_abi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_symbol",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_totalSupply",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "remaining",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      $(".login").click(async() => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            user = accounts[0];
            $(".login").html("Connected");
            $("#user_address").html(user);
            console.log(user);
            dex_contract = new ethers.Contract(dex_address, dex_abi, {from: user});
            console.log(dex_contract);
        } catch(error){
            console.log(error);
        }
    });



$(document).ready(async () => {
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    priceData = await getPrice();
    // console.log(priceData);
    // console.dir(priceData["souEth"]);
    
});

//connect wallet 
$(".login").click(async() => {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        user = accounts[0];
        $(".login").html("Connected");
        $("#user_address").html(user);
        console.log(user);
        dex_contract = new ethers.Contract(dex_abi, dex_address, {from: user});
        console.log(dex_contract);
    } catch(error){
        console.log(error);
    }
});

//function when input eth
$("#input").on("input", () => {
    var input_value = parseFloat($("#input").val());
    if (token_name === undefined) {
    }
    outputData = updataInput(input_value);
});

//function when selecting token
$("#select_token").on("change", () => {
    token_name = $("#select_token").val();
});

$("#swap").click(() => {

})

async function getPrice(token){
    const souData = await (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=the-sandbox&vs_currencies=eth"))
    .json();

    const sawaData = await (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=eth"))
    .json();

    const shouData = await (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth"))
    .json();

    return {
        souEth : souData["the-sandbox"].eth,
        sawaEth : sawaData["axie-infinity"].eth,
        shouEth : shouData["dai"].eth
    }
}

function updataInput(input){
    let output;
    switch(token_name){
        case "sou":
            output = input / priceData["souEth"];
            break;
        case "sawa":
            output = input / priceData["sawaEth"];
            break;
        case "shou":
            output = input / priceData["shouEth"];
            break;
    }
    if(output === 0 || isNaN(output)){
        $("#output").val("");
    } else {
        $("#output").val(output);
    }
    return output;
}