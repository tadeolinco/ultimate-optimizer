import React, { Component } from 'react';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from '../constants';
import AppBar from 'material-ui/AppBar';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import OptimizerIcon from 'material-ui/svg-icons/action/trending-up';

class Navbar extends Component {
  render() {
    // const title = (
    //   <div>
    //     <span style={{ cursor: 'pointer', fontSize: 48 }}>
    //       {this.props.solver}
    //     </span>
    //     <span
    //       style={{
    //         fontSize: 28,
    //         marginLeft: 20,
    //         cursor: 'pointer',
    //         fontWeight: 300
    //       }}
    //       onClick={this.props.handleToggleSolver}>
    //       {this.props.solver === ULTIMATE_OPTIMIZER
    //         ? SMART_INVEST
    //         : ULTIMATE_OPTIMIZER}
    //     </span>
    //   </div>
    // );
    const iconStyle = { width: '100%', height: 128, color: 'white' };
    const icon =
      this.props.solver === ULTIMATE_OPTIMIZER ? (
        <OptimizerIcon style={iconStyle} />
      ) : (
        <MoneyIcon style={iconStyle} />
      );

    const titleStyle = {
      fontSize: 32,
      cursor: 'pointer'
    };
    const currentTitleStyle = {
      ...titleStyle,
      textDecoration: 'underline'
    };
    const title = (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '45%', textAlign: 'right' }}>
          <span
            style={
              this.props.solver === ULTIMATE_OPTIMIZER
                ? currentTitleStyle
                : titleStyle
            }
            onClick={() => this.props.handleChangeSolver(ULTIMATE_OPTIMIZER)}>
            {ULTIMATE_OPTIMIZER}
          </span>
        </div>
        <div
          style={{
            width: '10%',
            display: 'inline-block',
            textAlign: 'center'
          }}>
          {icon}
        </div>
        <div
          style={{ width: '45%', display: 'inline-block', textAlign: 'left' }}>
          <span
            style={
              this.props.solver === SMART_INVEST
                ? currentTitleStyle
                : titleStyle
            }
            onClick={() => this.props.handleChangeSolver(SMART_INVEST)}>
            {SMART_INVEST}
          </span>
        </div>
      </div>
    );

    return (
      <AppBar
        style={{ backgroundColor: this.props.primaryColor }}
        titleStyle={{ height: 128, lineHeight: '128px' }}
        title={title}
        showMenuIconButton={false}
      />
    );
  }
}

export default Navbar;
