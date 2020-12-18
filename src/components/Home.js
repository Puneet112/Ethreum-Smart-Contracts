import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="position animate-left">
        <img
          className="img-front"
          alt="network"
          src={require("../network.jpg")}
        />
        <div className="container">
          <h1>
            <span>Welcome to Cryptocurrency</span>
          </h1>
          <h4>An innovative payment network and a new kind of money</h4>
          <div>
            A cryptocurrency (or crypto currency) is a digital asset designed to
            work as a medium of exchange wherein individual coin ownership
            records are stored in a digital ledger or computerized database
            using strong cryptography to secure transaction record entries, to
            control the creation of additional digital coin records, and to
            verify the transfer of coin ownership. It typically does not exist
            in physical form (like paper money) and is typically not issued by a
            central authority. <br />
            <br />
            Some cryptocurrencies use decentralized control as opposed to
            centralized digital currency and central banking systems. When a
            cryptocurrency is minted or created prior to issuance or held on a
            centralized exchange, it is generally considered centralized. When
            implemented with decentralized control, each cryptocurrency works
            through distributed ledger technology, typically a blockchain, that
            serves as a public financial transaction database. <br />
            <br />
          </div>
          <div>
            <div className="side-content">
              It uses peer-to-peer technology to operate with no central
              authority or banks; managing transactions and the issuing of
              currency is carried out collectively by the network. It is
              open-source; its design is public, nobody owns or controls it and
              everyone can take part. Through many of its unique properties, it
              allows exciting uses that could not be covered by any previous
              payment system.
              <ul>
                <li>Fast peer-to-peer transactions</li>
                <li>Worldwide payments</li>
                <li>Low processing fees</li>
              </ul>
            </div>
            <img
              className="side-img img-fluid"
              alt="cryptocurrency"
              src={require("../cryptocurrency.jpg")}
            />
          </div>
          <div className="mt-5">
            <h3 className="topic-heading">Smart Contracts</h3>
            <img
              className="side-img1 img-fluid"
              alt="cryptocurrency"
              src={require("../smart-contracts.png")}
            />
            <div className="side-content1">
              <p>
                A smart contract is simply a program that runs on the Ethereum
                blockchain. It's a collection of code (its functions) and data
                (its state) that resides at a specific address on the Ethereum
                blockchain.
              </p>
              <p>
                Smart contracts are a type of Ethereum account. This means they
                have a balance and they can send transactions over the network.
                However they're not controlled by a user, instead they are
                deployed to the network and run as programmed. User accounts can
                then interact with a smart contract by submitting transactions
                that execute a function defined on the smart contract.
              </p>
            </div>
          </div>

          <div className="section">
            <h3 className="topic-heading">Ethereum Dapp</h3>
            <div className="side-content">
              <p>
                A decentralized application (dapp) is an application built on a
                decentralized network that combines a smart contract and a
                frontend user interface.
              </p>
              <p>
                A smart contract is like a set of rules that live on-chain for
                all to see and run exactly according to those rules. Imagine a
                vending machine: if you supply it with enough funds and the
                right selection, you'll get the item you want. And like vending
                machines, smart contracts can hold funds much like your Ethereum
                account. This allows code to mediate agreements and
                transactions.
              </p>
            </div>
            <img
              className="side-img img-fluid"
              alt="Ethereum Dapp"
              src={require("../ethereum-dapp.jpg")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
