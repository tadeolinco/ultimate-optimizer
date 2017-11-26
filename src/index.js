import React from 'react';
import ReactDOM from 'react-dom';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-vis/dist/style.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
