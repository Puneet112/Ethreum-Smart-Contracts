const { assert } = require("chai");

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("TokenFarm", ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    // Transfer all Dapp tokens to TokenFarm
    await dappToken.transfer(tokenFarm.address, tokens("1000000"));

    // Transfer 100 DAI Tokens to investor i.e. 2nd account
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });

  describe("Mock DAI Development", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  describe("Dapp Token Development", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("Token Farm Development", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });

    it("contract has tokens", async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Farming Tokens", async () => {
    it("rewards investors for staking mDAI Tokens", async () => {
      let result;
      // Check investor Balance before staking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investors Mock DAI wallet balance correct before staking"
      );

      // Stake Mock DAi Tokens
      await daiToken.approve(tokenFarm.address, tokens("100"), {
        from: investor,
      });
      await tokenFarm.stakeTokens(tokens("100"), { from: investor });

      // Check staking result
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Investors Mock DAI wallet balance correct after staking"
      );

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Token Farm Mock DAI wallet balance correct after staking"
      );

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor staking balance correct after staking"
      );

      result = await tokenFarm.isStaking(investor);
      assert.equal(
        result.toString(),
        "true",
        "Investors Staking status correct after staking"
      );

      // Issue Tokens
      await tokenFarm.issueTokens({ from: owner });

      // Check balance after issuance
      result = await dappToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor Dapp wallet balance correct after issuance"
      );

      // Ensure that only owner can call issue tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

      // Unstake Tokens
      await tokenFarm.unstakeTokens({ from: investor });

      // Check results after unstaking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor Mock DAI balance correct after unstaking"
      );

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Token Farm balance correct after unstaking"
      );

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Investor staking balance correct after unstaking"
      );

      result = await tokenFarm.isStaking(investor);
      assert.equal(
        result.toString(),
        "false",
        "Investor staking status correct after unstaking"
      );
    });
  });
});
