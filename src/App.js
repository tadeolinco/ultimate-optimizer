import React, { Component } from 'react';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from './constants';
import { green400, blue400 } from 'material-ui/styles/colors';
import Navbar from './features/Navbar';
import UltimateOptimizer from './features/UltimateOptimizer';
import SmartInvest from './features/SmartInvest';

class App extends Component {
  state = {
    solver: ULTIMATE_OPTIMIZER
  };

  handleChangeSolver = solver => this.setState({ solver });

  render() {
    const primaryColor =
      this.state.solver === ULTIMATE_OPTIMIZER ? blue400 : green400;

    return (
      <div>
        <Navbar
          primaryColor={primaryColor}
          handleChangeSolver={this.handleChangeSolver}
          solver={this.state.solver}
        />
        <div style={{ marginLeft: 200, marginRight: 200, marginTop: 50 }}>
          {this.state.solver === ULTIMATE_OPTIMIZER ? (
            <UltimateOptimizer primaryColor={primaryColor} />
          ) : (
            <SmartInvest primaryColor={primaryColor} />
          )}
        </div>
      </div>
    );
    // return <h1>ultimate-optimizer</h1>;
  }
}

export default App;
