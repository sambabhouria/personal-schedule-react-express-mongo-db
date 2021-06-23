
import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Routes from './Routes';
import './main.scss';

function App() {
  return (
    <Router>
    <Route path='/' component={Routes}></Route>
  </Router>
  );
}

export default App;
