import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './pages/Start';
import './App.global.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Start} />
      </Switch>
    </Router>
  );
};

export default App;
