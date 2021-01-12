import React from "react";
import "./styles.css";
import ListItem from "./ListItem";

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
      list: []
    };
  }

  displayInfo = () => {
    event.preventDefault();
    finnhubClient.quote(this.state.currDisplay, (error, data, response) => {
      console.log(data);
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
      this.setState({ stockUp: true });
    });
  };

  determinePrice = () => {
    if (currentPrice > openPrice) {
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
          {stockdisplayed && "Current Price: $" + this.state.stock}
        </p>
        <ul>
          {this.state.list.map((item) => (
            <ListItem
              data={item.symbol}
              color={item.color}
              currentPrice={item.curr}
            />
          ))}
        </ul>
        {stockdisplayed && <button>Refresh</button>}
      </div>
    );
  }
}
