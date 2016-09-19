import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Template from './components/Template.js';
import Terbaru from './components/Terbaru.js';
//var Headline = require("./components/Headline.js");
import Headline from './components/Headline.js';

const app = document.getElementById('appspace');
window.$ = jquery;


ReactDOM.render(
  <Router history = {hashHistory}>
    <Route path="/" component={Template}>
      <IndexRoute component={Headline}></IndexRoute>
      <Route path="terbaru" component={Terbaru}></Route>
    </Route>
  </Router>
  , app);
