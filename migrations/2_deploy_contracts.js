const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  // Deploy DappToken Smart Contract
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // Deploy DaiToken Smart Contract
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // Deploy DappToken Smart Contract
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await DappToken.deployed();

  // Transfer all Dapp tokens to TokenFarm
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // Transfer 100 DAI Tokens to investor i.e. 2nd account
  await daiToken.transfer(accounts[1], "100000000000000000000");
};
