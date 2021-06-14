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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currDisplay: "",
      stock: "",
      display: false
    };
  }

  displayInfo = () => {
    event.preventDefault();
    finnhubClient.quote(this.state.currDisplay, (error, data, response) => {
      stockdisplayed = true;
      sum += data.c;
      staticlist.push({
        symbol: this.state.currDisplay,
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
        let newPrice = data.c;
        sum += data.c;
        this.determinePrice(data.c, data.o);
        item.curr = newPrice;
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Stock Displayer</h1>
        <h2>Enter Stocks Below (Use Symbol):</h2>
        <form>
          <label>
            <input
              type="text"
              name="name"
              value={this.state.currDisplay}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.displayInfo}>Submit</button>
          <button onClick={this.clearList}>Clear</button>
        </form>
        <p>{stockdisplayed && "Portfolio Value: $" + sum}</p>
        <ul>
          {staticlist.map((item) => (
            <StockItem
              data={item.symbol}
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
