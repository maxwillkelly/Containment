import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Start from './pages/Start';
import Game from './pages/Game';
import Settings from './pages/Settings';

import './App.global.css';

const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/settings" component={Settings} />
    </Switch>
  </HashRouter>
);

const App: React.FC = () => {
  return (
    <div className="dark">
      <Router />
    </div>
  );
};

export default App;
