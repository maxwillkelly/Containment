import React from 'react';
import shallow from 'zustand/shallow';
import { FaSearch } from 'react-icons/fa';

import categories, { Category } from '../../data/categories';

import useActionsStore from '../../stores/ActionsStore';
import useActionsMenuStore from '../../stores/ActionsMenuStore';
import useGameStore from '../../stores/GameStore';
import ActionItem from '../shared/ActionItem';

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

const ActionList: React.FC = () => {
  const inActiveActions = useActionsStore((state) => state.inActive);
  const [categorySelected, searchText] = useActionsMenuStore(
    (state) => [state.categorySelected, state.searchText],
    shallow
  );
  const turn = useGameStore((state) => state.turn);

  const unlockedFilteredActions = inActiveActions.filter(
    (a) => a.turnAvailable <= turn
  );

  const categoryFilteredActions =
    categorySelected === ''
      ? unlockedFilteredActions
      : unlockedFilteredActions.filter((a) => a.category === categorySelected);

  const filterText = searchText.toLowerCase();

  const displayedActions = categoryFilteredActions.filter(
    (a) =>
      a.name.toLowerCase().includes(filterText) ||
      a.category.toLowerCase().includes(filterText)
  );

  return (
    <div className="flex flex-col col-span-8 p-3 max-h-80 overflow-y-auto">
      {displayedActions.map((a) => (
        <ActionItem action={a} key={a.id} />
      ))}
    </div>
  );
};

const ActionsMenu: React.FC = () => {
  return (
    <div className="fixed block bg-opacity-100 dark:bg-gray-700 z-10">
      <SearchBar />
      <div className="grid grid-cols-10">
        <ActionCategories />
        <ActionList />
      </div>
    </div>
  );
};

export default ActionsMenu;
