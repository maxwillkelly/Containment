import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div>
      <h1>SearchBar</h1>
    </div>
  );
};

const ActionCategories: React.FC = () => {
  return (
    <div>
      <h1>ActionCategories</h1>
    </div>
  );
};

const ActionList: React.FC = () => {
  return (
    <div>
      <h1>ActionList</h1>
    </div>
  );
};

const ActionMenu: React.FC = () => {
  return (
    <div className="">
      <SearchBar />
      <ActionCategories />
      <ActionList />
    </div>
  );
};

export default ActionMenu;
