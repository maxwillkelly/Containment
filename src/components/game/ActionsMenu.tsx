import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
  category: { name: string };
}

const ActionCategory: React.FC<ActionCategoryProps> = ({ category }) => {
  const [selected, setSelected] = useState(false);
  const bgColour = selected ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`p-1 rounded-lg ${bgColour}`}
      type="button"
      onClick={() => setSelected((state) => !state)}
    >
      <p>{category.name}</p>
    </button>
  );
};

const categories: { name: string }[] = [
  {
    name: 'Category 1',
  },
  {
    name: 'Category 2',
  },
  {
    name: 'Category 3',
  },
  {
    name: 'Category 4',
  },
  {
    name: 'Category 5',
  },
];

const ActionCategories: React.FC = () => {
  return (
    <div className="flex flex-col col-span-2 py-3">
      {categories.map((c) => (
        <ActionCategory category={c} key={c.name} />
      ))}
    </div>
  );
};

const ActionList: React.FC = () => {
  return (
    <div className="col-span-8 p-3">
      <h1>ActionList</h1>
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
