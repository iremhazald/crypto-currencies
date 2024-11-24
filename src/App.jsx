import { useState, useEffect } from "react";
import axios from "axios";
import "./style/App.css";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/"
        );
        console.log(response);
        setCrypto(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <h1> 💸 All Cryptocurrencies 💸</h1>
        <div className="searchBox">
          {" "}
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Symbol</td>
              <td>Market Cap</td>
              <td>Price</td>
              <td>Available Supply</td>
              <td>Volume(24hrs)</td>
            </tr>
          </thead>
          <tbody>
            {" "}
            {crypto
              .filter((val) =>
                val.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((val, id) => (
                <tr key={id}>
                  <td>{val.rank}</td>
                  <td>
                    <p>{val.name}</p>
                  </td>
                  <td>{val.symbol}</td>
                  <td>${val.market_cap_usd}</td>
                  <td>${parseFloat(val.price_usd).toFixed(2)}</td>
                  <td>{val.csupply}</td>
                  <td>${parseFloat(val.volume24).toFixed(0)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
