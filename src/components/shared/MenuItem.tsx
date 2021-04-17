import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  name: string;
  handleClick: () => void;
  disabled?: boolean;
}

const MenuItem: React.FC<Props> = ({ name, handleClick, disabled }) => {
  return (
    <button
      className="w-full p-5 text-2xl shadow-2xl dark:disabled:bg-disabled dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 mb-4 text-center flex-shrink"
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default MenuItem;
