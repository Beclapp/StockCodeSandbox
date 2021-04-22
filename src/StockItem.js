import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default class StockItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <List>
        <ListItem divider={true}>
          <ListItemText
            style={{ color: this.props.color }}
            primary={this.props.data}
            secondary={"$ " + this.props.currentPrice}
          />
        </ListItem>
      </List>
    );
  }
}
