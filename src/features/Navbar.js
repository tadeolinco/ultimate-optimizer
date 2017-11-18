import React, { Component } from 'react';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from '../constants';
import AppBar from 'material-ui/AppBar';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import OptimizerIcon from 'material-ui/svg-icons/action/trending-up';

class Navbar extends Component {
  render() {
    const title = (
      <div>
        <span style={{ cursor: 'pointer', fontSize: 48 }}>
          {this.props.solver}
        </span>
        <span
          style={{
            fontSize: 28,
            marginLeft: 20,
            cursor: 'pointer',
            fontWeight: 300
          }}
          onClick={this.props.handleToggleSolver}>
          {this.props.solver === ULTIMATE_OPTIMIZER
            ? SMART_INVEST
            : ULTIMATE_OPTIMIZER}
        </span>
      </div>
    );

    const iconStyle = { width: 64, height: 64, color: 'white' };
    const icon =
      this.props.solver === ULTIMATE_OPTIMIZER ? (
        <OptimizerIcon style={iconStyle} />
      ) : (
        <MoneyIcon style={iconStyle} />
      );

    return (
      <AppBar
        style={{ backgroundColor: this.props.primaryColor }}
        titleStyle={{ height: 128, lineHeight: '128px' }}
        title={title}
        iconElementLeft={icon}
        iconStyleLeft={{ marginTop: 32, marginRight: 16, marginLeft: 0 }}
      />
    );
  }
}

export default Navbar;
