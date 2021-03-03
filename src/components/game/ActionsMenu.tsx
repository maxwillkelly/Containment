import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center py-3">
      <FaSearch className="text-xl mr-3" />
      <input className="px-5 rounded-full w-full" placeholder="Search..." />
    </div>
  );
};
interface ActionCategoryProps {
  category: { name: string };
}

const ActionCategory: React.FC<ActionCategoryProps> = ({ category }) => {
  return (
    <button className="rounded-full" type="button">
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
];

const ActionCategories: React.FC = () => {
  return (
    <div className="flex flex-col col-span-2 p-3">
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
    <div className="border dark:border-gray-400 px-5">
      <SearchBar />
      <div className="grid grid-cols-10">
        <ActionCategories />
        <ActionList />
      </div>
    </div>
  );
};

export default ActionMenu;
