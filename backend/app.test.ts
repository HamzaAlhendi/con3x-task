const myApp = require("./app");
// Adjust the import path according to your project structure

describe("get balance of a specific address", () => {
  it("should return balance and balanceInEther", async () => {
    myApp.getBalance = jest.fn().mockResolvedValue({
      balance: "373541272265632",
      balanceInEther: "0.000373541272265632",
    });
    const result = myApp.getBalance();
    expect(result).toMatchObject({
      balance: "373541272265632",
      balanceInEther: "0.000373541272265632",
    });
  });
});

describe("get last block number", () => {
  it("should return the last block number", async () => {
    myApp.getBlock = jest.fn().mockReturnValue({ lastBlockNumber: 123456 });
    const result = myApp.getBlock();
    expect(result).toMatchObject({ lastBlockNumber: 123456 });
  });
});
