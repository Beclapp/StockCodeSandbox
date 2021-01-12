import React from "react";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <li>
        <div style={{ color: this.props.color }}>
          {this.props.data + ": " + this.props.currentPrice}
        </div>
      </li>
    );
  }
}
