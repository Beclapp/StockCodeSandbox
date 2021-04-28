import React from "react";
import "./styles.css";
import StockItem from "./StockItem";
import update from "react-addons-update";

const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "bvue7g748v6pkq83cj3g";
const finnhubClient = new finnhub.DefaultApi();

let stockdisplayed = false;
let openPrice = "";
let currentPrice = "";
let color = "";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currDisplay: "",
      stock: "",
      list: [],
      display: false
    };
  }

  displayInfo = () => {
    event.preventDefault();
    finnhubClient.quote(this.state.currDisplay, (error, data, response) => {
      stockdisplayed = true;
      openPrice = data.o;
      currentPrice = data.c;
      this.determinePrice();
      this.setState({ stock: currentPrice });
      this.state.list.push({
        symbol: this.state.currDisplay,
        color: color,
        curr: currentPrice
      });
    });
  };

  determinePrice = () => {
    if (currentPrice >= openPrice) {
      color = "green";
    } else {
      color = "red";
    }
  };

  handleChange = (event) => {
    this.setState({ currDisplay: event.target.value });
  };

  clearList = () => {
    this.setState({ list: [] });
  };

  refreshList = () => {
    let count = 0;
    this.state.list.forEach((item) => {
      finnhubClient.quote(item.symbol, (error, data, response) => {
        openPrice = data.o;
        let newPrice = data.c;
        console.log(data);
        this.determinePrice();
        this.setState(
          update(this.state, {
            list: {
              [count]: {
                $set: {
                  symbol: item.symbol,
                  color: item.color,
                  curr: newPrice
                }
              }
            }
          })
        );
        count++;
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
        <p style={{ color: color }}>
          {stockdisplayed &&
            this.state.currDisplay + " Current Price: $" + this.state.stock}
        </p>
        <ul>
          {this.state.list.map((item) => (
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
