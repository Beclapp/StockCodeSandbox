import React from "react";

import ListItem from "@material-ui/core/ListItem";

export default class StockItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ListItem>
        <div divider={true} style={{ color: this.props.color }}>
          {this.props.data + ": " + this.props.currentPrice}
        </div>
      </ListItem>
    );
  }
}
