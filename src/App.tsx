import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './pages/Start';
import Game from './pages/Game';
import Settings from './pages/Settings';

import './App.global.css';
import './styles/background.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/game" component={Game} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default App;
