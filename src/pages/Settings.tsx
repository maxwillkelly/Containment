import React from 'react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  return (
    <div>
      <h1>Settings</h1>
      <Link to="/">Back to Main Menu</Link>
    </div>
  );
};

export default Settings;
