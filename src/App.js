import React from "react";
import "./styles.css";
import StockList from "./StockList";
import Page2 from "./page2";

let page1 = true;
let second = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ""
    };
  }
  render() {
    return (
      <div className="App">
        <h1>Stock Displayer</h1>
        <button
          onClick={() => {
            page1 = true;
            second = false;
            this.setState({ display: "Page1" });
          }}
        >
          Page 1
        </button>
        <button
          onClick={() => {
            page1 = false;
            second = true;
            this.setState({ display: "Page2" });
          }}
        >
          Page 2
        </button>
        {page1 && <StockList />}
        {second && <Page2 />}
      </div>
    );
  }
}
