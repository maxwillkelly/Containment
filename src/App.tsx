import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Start from './pages/Start';
import Game from './pages/Game';
import NewGame from './pages/NewGame';
import LoadGame from './pages/LoadGame';
import Settings from './pages/Settings';
import Finish from './pages/Finish';

import './App.global.css';

const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/new-game" component={NewGame} />
      <Route exact path="/load-game" component={LoadGame} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/finish/:success" component={Finish} />
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
