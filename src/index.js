import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Routes from './routes'

global.jQuery = require("jquery");
require('bootstrap');

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
