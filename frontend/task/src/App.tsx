import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [balance, setBalance] = useState<{
    balance: string;
    balanceInEther: string;
  }>();
  const [address, setAddress] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const getLastBlockNumber = async () => {
    await fetch("http://localhost:4000/getBlock")
      .then((res) => res.json())
      .then((data) => {
        setBlockNumber(data.lastBlockNumber);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getBalance = async (address: string) => {
    await fetch("http://localhost:4000/getBalance", { headers: { address } })
      .then((res) => res.json())
      .then((data) => {
        setBalance(data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "99vh",
          position: "relative",
          backgroundColor: "black",
        }}
      >
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <input
            id="address-input"
            style={{
              width: "200px",
              height: "30px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "20px",
              fontFamily: "serif",
            }}
            value={address}
            type="text"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              color: "white",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => getBalance(address)}
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                color: "white",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
                borderRadius: "20px",
                height: "50px",
              }}
              disabled={address ? false : true}
            >
              Get balance
            </button>

            {balance ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <p>Balance: {balance.balance}</p>
                <p>Balance In Ether: {balance.balanceInEther}</p>
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              color: "white",
            }}
          >
            <button
              onClick={getLastBlockNumber}
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                color: "white",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
                borderRadius: "20px",
                height: "50px",
              }}
            >
              Get block number
            </button>
            <p>Block number: {blockNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
