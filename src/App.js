import React from "react";
import "./styles.css";
import StockItem from "./StockItem";

const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "bvue7g748v6pkq83cj3g";
const finnhubClient = new finnhub.DefaultApi();

let stockdisplayed = false;
let staticlist = [];
let sum = 0;

function roundTwo(num) {
  return Math.round(num * 100) / 100;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currDisplay: "",
      stock: "",
      display: false
    };
  }

  lookupSymbol = () => {
    event.preventDefault();
    fetch(
      "https://finnhub.io/api/v1/search?q=" +
        this.state.currDisplay +
        "&token=" +
        api_key.apiKey
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.count === 0) {
        } else {
          this.displayInfo(
            res.result[0].displaySymbol,
            res.result[0].description
          );
        }
      });
  };

  displayInfo = (symbol, name) => {
    finnhubClient.quote(symbol, (error, data, response) => {
      stockdisplayed = true;
      sum += data.c;
      staticlist.push({
        name: name,
        symbol: symbol,
        color: this.determinePrice(data.o, data.c),
        curr: data.c
      });
      this.setState({ currDisplay: "" });
    });
  };

  determinePrice = (current, open) => {
    if (current >= open) {
      return "green";
    } else {
      return "red";
    }
  };

  handleChange = (event) => {
    this.setState({ currDisplay: event.target.value });
  };

  clearList = () => {
    event.preventDefault();
    staticlist = [];
    this.setState({ display: false });
    sum = 0;
  };

  refreshList = () => {
    sum = 0;
    staticlist.forEach((item) => {
      finnhubClient.quote(item.symbol, (error, data, response) => {
        let newPrice = roundTwo(data.c);
        sum += newPrice;
        this.determinePrice(newPrice, data.o);
        item.curr = newPrice;
        this.setState({ currDisplay: "" });
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Stock Displayer</h1>
        <h2>Enter Stocks Below (Use Name):</h2>
        <form>
          <label>
            <input
              type="text"
              name="name"
              value={this.state.currDisplay}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.lookupSymbol}>Submit</button>
          <button onClick={this.clearList}>Clear</button>
        </form>
        <p>{stockdisplayed && "Portfolio Value: $" + roundTwo(sum)}</p>
        <ul>
          {staticlist.map((item) => (
            <StockItem
              data={item.name}
              color={item.color}
              currentPrice={item.curr}
            />
          ))}
        </ul>
        {stockdisplayed && <button onClick={this.refreshList}>Refresh</button>}
      </div>
    );
  }
}
