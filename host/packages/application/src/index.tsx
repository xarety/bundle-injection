import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.google.com/';

import './design-system.css';

import { App } from './app';

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

ReactDOM.render(<App />, appContainer);
