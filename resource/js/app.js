import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Template from './components/Template.js';
import Terbaru from './views/Terbaru.js';
import Detail from './views/Detail.js';
import Headline from './components/Headline.js';

const app = document.getElementById('appspace');

ReactDOM.render(
  <Router history = {hashHistory}>
    <Route path="/" component={Template}>
      <IndexRoute component={Terbaru}></IndexRoute>
      <Route path="headline" component={Headline}></Route>
      <Route path="read/:id" component={Detail}></Route>
    </Route>
  </Router>
  , app);
