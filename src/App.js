import React, { Component } from 'react';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from './constants';
import { green400, blue400 } from 'material-ui/styles/colors';
import Navbar from './features/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import UltimateOptimizer from './features/UltimateOptimizer';
import SmartInvest from './features/SmartInvest';
import { navbarHeight } from './features/Navbar/Navbar';

class App extends Component {
  state = {
    solver: ULTIMATE_OPTIMIZER,
    theme: getMuiTheme({
      palette: { primary1Color: blue400, accent1Color: blue400 }
    })
  };

  handleChangeSolver = solver => {
    const theme = {
      palette: { primary1Color: blue400, accent1Color: blue400 }
    };
    if (solver === SMART_INVEST) {
      theme.palette.primary1Color = green400;
      theme.palette.accent1Color = green400;
    }
    this.setState({ solver, theme: getMuiTheme(theme) });
  };

  render() {
    const margin = 50;
    const bodyStyle = {
      margin: `${margin}px ${margin / 2}px`
    };

    const body =
      this.state.solver === ULTIMATE_OPTIMIZER ? (
        <UltimateOptimizer />
      ) : (
        <SmartInvest />
      );

    return (
      <MuiThemeProvider muiTheme={this.state.theme}>
        <div>
          <Navbar
            handleChangeSolver={this.handleChangeSolver}
            solver={this.state.solver}
          />
          <div style={bodyStyle}>{body}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
