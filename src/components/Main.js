import React, { Component } from "react";
import dai from "../dai.png";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3 animate-left">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                mDAI
              </td>
              <td>
                {window.web3.utils.fromWei(
                  this.props.dappTokenBalance,
                  "Ether"
                )}{" "}
                DAPP
              </td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4">
          <div className="card-body">
            <form className="mb-3">
              <div>
                <label className="float-left text-muted">
                  <b>Stake Tokens</b>
                </label>
                <span className="float-right text-muted">
                  Balance:{" "}
                  {window.web3.utils.fromWei(
                    this.props.daiTokenBalance,
                    "Ether"
                  )}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.input = input;
                  }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height="32" alt="" />
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg stake"
                name="action"
                value="stake"
                onClick={(event) => {
                  event.preventDefault();
                  let amount;
                  amount = this.input.value.toString();
                  if (amount !== "") {
                    amount = window.web3.utils.toWei(amount, "Ether");
                    this.props.stakeTokens(amount);
                  } else {
                    alert("Amount must be greater than 0");
                  }
                }}
              >
                STAKE!
              </button>
              <button
                type="submit"
                className="btn btn-outline-secondary btn-block btn-lg mt-3"
                name="action"
                value="unstake"
                onClick={(event) => {
                  event.preventDefault();
                  let amount;
                  amount = this.input.value.toString();
                  if (amount !== "") {
                    amount = window.web3.utils.toWei(amount, "Ether");
                    this.props.unstakeTokens(amount);
                  } else {
                    alert("Amount must be greater than 0");
                  }
                }}
              >
                UN-STAKE...
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
