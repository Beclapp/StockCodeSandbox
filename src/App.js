import React from "react";
import "./styles.css";
import StockList from "./StockList";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Stock Displayer</h1>
        <StockList />
      </div>
    );
  }
}
