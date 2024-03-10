const express = require("express");
const app = express();
const { Web3 } = require("web3");
const providerUrl =
  "https://mainnet.infura.io/v3/6f02afca226849bc8bd1428866e41b6f";
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

app.get("/getBalance", async (req, res) => {
  const address = req.headers.address;

  try {
    const usdtContract = new web3.eth.Contract(ERC20_ABI, usdtAddress);
    const balance = await usdtContract.methods.balanceOf(address).call();
    const balanceInEther = web3.utils.fromWei(balance, "ether");
    // res.send(`USDT Balance of ${address}: ${balance}, Balance in Ether: ${balanceInEther}`);
    res.send(
      JSON.stringify({
        balance: balance.toString(),
        balanceInEther: balanceInEther.toString(),
      })
    );
  } catch (error) {
    console.error("Error fetching USDT balance:", error);
    res.status(500).send("Error fetching USDT balance");
  }
});

app.get("/getBlock", async (req, res) => {
  try {
    const lastBlockNumber = await web3.eth.getBlockNumber();
    res.send(`The last block number is: ${lastBlockNumber}`);
  } catch (error) {
    console.error("Error fetching the last block number:", error);
    res.status(500).send("Error fetching the last block number");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
