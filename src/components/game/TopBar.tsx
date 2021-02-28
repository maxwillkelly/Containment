import React from 'react';

const TopBar: React.FC = () => {
  return (
    <nav className="mx-auto p-4 dark:bg-gray-700 dark:text-gray-200">
      <div className="flex flex-row justify-between">
        <h1>X</h1>
        <h1>Y</h1>
      </div>
    </nav>
  );
};

export default TopBar;
