import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './pages/Start';
import './App.global.css';
import Game from './pages/Game';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Start} />
        <Route path="/game" component={Game} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default App;
