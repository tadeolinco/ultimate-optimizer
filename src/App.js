import React, { Component } from 'react';
import { ULTIMATE_OPTIMIZER, SMART_INVEST } from './constants';
import { green400, blue400 } from 'material-ui/styles/colors';
import Navbar from './features/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import UltimateOptimizer from './features/UltimateOptimizer';
import SmartInvest from './features/SmartInvest';
import Snackbar from 'material-ui/Snackbar';

class App extends Component {
  state = {
    solver: ULTIMATE_OPTIMIZER,
    theme: getMuiTheme({
      palette: { primary1Color: blue400, accent1Color: green400 }
    }),
    snackbar: ''
  };

  handleChangeSolver = solver => {
    const theme = {
      palette: { primary1Color: blue400, accent1Color: green400 }
    };
    if (solver === SMART_INVEST) {
      theme.palette.primary1Color = green400;
      theme.palette.accent1Color = blue400;
    }
    this.setState({ solver, theme: getMuiTheme(theme) });
  };

  handleAddMessage = message => {
    this.setState({ snackbar: message });
  };

  render() {
    const margin = 50;
    const bodyStyle = {
      margin: `${margin}px ${margin / 2}px`
    };

    const body =
      this.state.solver === ULTIMATE_OPTIMIZER ? (
        <UltimateOptimizer handleAddMessage={this.handleAddMessage} />
      ) : (
        <SmartInvest handleAddMessage={this.handleAddMessage} />
      );

    return (
      <MuiThemeProvider muiTheme={this.state.theme}>
        <div>
          <Navbar
            handleChangeSolver={this.handleChangeSolver}
            solver={this.state.solver}
          />
          <div style={bodyStyle}>{body}</div>
          <Snackbar
            open={Boolean(this.state.snackbar)}
            message={this.state.snackbar}
            onRequestClose={() => this.setState({ snackbar: '' })}
            autoHideDuration={3000}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
