import React from 'react';
import ReactDOM from 'react-dom';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './mui-theme';

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
