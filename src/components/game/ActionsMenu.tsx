import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { FaSearch } from 'react-icons/fa';
import actions, { Action } from '../../data/actions';
import categories, { Category } from '../../data/categories';
import useActionsMenuStore from '../../stores/ActionsMenuStore';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useActionsMenuStore(
    (state) => [state.searchText, state.setSearchText],
    shallow
  );

  return (
    <div className="w-full flex flex-row items-center justify-center p-3 border-b border-bg-seperator">
      <FaSearch className="text-xl mr-3" />
      <input
        className="px-5 rounded-full w-full dark:text-gray-900"
        placeholder="Search..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
    </div>
  );
};
interface ActionCategoryProps {
  category: Category;
}

const ActionCategory: React.FC<ActionCategoryProps> = ({ category }) => {
  const [categorySelected, setCategorySelected] = useActionsMenuStore(
    (state) => [state.categorySelected, state.setCategorySelected],
    shallow
  );
  const bgColour =
    categorySelected === category ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`p-1 rounded-lg text-sm ${bgColour}`}
      type="button"
      onClick={() => setCategorySelected(category)}
    >
      <p>{category}</p>
    </button>
  );
};

const ActionCategories: React.FC = () => {
  return (
    <div className="flex flex-col col-span-2 p-3 border-r border-bg-seperator">
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
  const [selected, setSelected] = useState(false);
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
  const [categorySelected, searchText] = useActionsMenuStore(
    (state) => [state.categorySelected, state.searchText],
    shallow
  );

  const categoryFilteredActions =
    categorySelected === ''
      ? actions
      : actions.filter((a) => a.category === categorySelected);

  const filterText = searchText.toLowerCase();

  const displayedActions = categoryFilteredActions.filter(
    (a) =>
      a.name.toLowerCase().includes(filterText) ||
      a.category.toLowerCase().includes(filterText)
  );

  return (
    <div className="flex flex-col col-span-8 p-3 max-h-72 overflow-y-auto">
      {displayedActions.map((a) => (
        <ActionItem action={a} key={a.id} />
      ))}
    </div>
  );
};

const ActionMenu: React.FC = () => {
  return (
    <div className="dark:bg-gray-700">
      <SearchBar />
      <div className="grid grid-cols-10">
        <ActionCategories />
        <ActionList />
      </div>
    </div>
  );
};

export default ActionMenu;
