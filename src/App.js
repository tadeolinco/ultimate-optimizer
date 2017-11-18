import React, { Component } from 'react';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from './constants';
import { green400, blue400 } from 'material-ui/styles/colors';
import Navbar from './features/Navbar';

class App extends Component {
  state = {
    solver: ULTIMATE_OPTIMIZER
  };

  handleToggleSolver = () =>
    this.setState({
      solver:
        this.state.solver === ULTIMATE_OPTIMIZER
          ? SMART_INVEST
          : ULTIMATE_OPTIMIZER
    });

  render() {
    const primaryColor =
      this.state.solver === ULTIMATE_OPTIMIZER ? blue400 : green400;

    return (
      <Navbar
        primaryColor={primaryColor}
        handleToggleSolver={this.handleToggleSolver}
        solver={this.state.solver}
      />
    );
    // return <h1>ultimate-optimizer</h1>;
  }
}

export default App;
