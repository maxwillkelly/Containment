import React from 'react';

type Props = {
  title: string;
  handleClick: () => void;
};

const WindowButton: React.FC<Props> = ({ title, handleClick }) => (
  <button
    className="w-32 h-10 rounded-full text-lg grid place-items-center dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200"
    type="button"
    onClick={handleClick}
  >
    {title}
  </button>
);

export default WindowButton;
