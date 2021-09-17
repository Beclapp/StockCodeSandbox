import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

//Rounds Numbers up to two digits.
function roundTwo(num) {
  return Math.round(num * 100) / 100;
}

export default class StockItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 1
    };
  }

  increaseShare = () => {
    this.setState({
      shares: this.state.shares + 1
    });
    this.props.addShare(this.props.data);
  };

  removeShare = () => {
    if (this.state.shares > 1) {
      this.setState({
        shares: this.state.shares - 1
      });
      this.props.decreaseShare(this.props.data);
    }
  };

  getData = () => {
    return roundTwo(this.props.currentPrice * this.state.shares);
  };

  render() {
    return (
      <List>
        <ListItem divider={true}>
          <ListItemText
            style={{ color: this.props.color }}
            primary={this.props.data}
            secondary={
              "$ " +
              roundTwo(this.props.currentPrice * this.state.shares) +
              " - " +
              this.state.shares +
              " share(s)"
            }
          />
          <ListItemSecondaryAction>
            <button onClick={this.increaseShare}>+</button>
            <button onClick={this.removeShare}>-</button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}
