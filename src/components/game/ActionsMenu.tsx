import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import actions, { Action } from '../../data/actions';
import categories, { Category } from '../../data/categories';

const SearchBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center py-3">
      <FaSearch className="text-xl mr-3" />
      <input
        className="px-5 rounded-full w-full dark:text-gray-900"
        placeholder="Search..."
      />
    </div>
  );
};
interface ActionCategoryProps {
  category: Category;
}

const ActionCategory: React.FC<ActionCategoryProps> = ({ category }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const bgColour = selected ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`p-1 rounded-lg ${bgColour}`}
      type="button"
      onClick={() => setSelected((state) => !state)}
    >
      <p>{category}</p>
    </button>
  );
};

const ActionCategories: React.FC = () => {
  return (
    <div className="flex flex-col col-span-2 py-3">
      {categories.map((c) => (
        <ActionCategory category={c} key={c} />
      ))}
    </div>
  );
};

interface ActionItemProps {
  action: Action;
}

const ActionItem: React.FC<ActionItemProps> = ({ action }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const bgColour = selected ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`flex flex-row items-center p-2 rounded-lg text-left ${bgColour}`}
      type="button"
      onClick={() => setSelected((state) => !state)}
    >
      <div className="h-8 w-8 bg-white mr-4" />
      <p>{action.name}</p>
      <div className="mr-auto" />
    </button>
  );
};

const ActionList: React.FC = () => {
  return (
    <div className="flex flex-col col-span-8 p-3">
      {actions.map((a) => (
        <ActionItem action={a} key={a.id} />
      ))}
    </div>
  );
};

const ActionMenu: React.FC = () => {
  return (
    <div className="dark:bg-gray-700 px-5">
      <SearchBar />
      <div className="grid grid-cols-10">
        <ActionCategories />
        <ActionList />
      </div>
    </div>
  );
};

export default ActionMenu;
