import React from 'react';

type Props = {
  title: string;
  handleClick: () => void;
  disabled?: boolean;
};

const WindowButton: React.FC<Props> = ({ title, handleClick, disabled }) => (
  <button
    className="w-32 h-10 rounded-full text-lg grid place-items-center dark:disabled:bg-disabled dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200"
    type="button"
    onClick={handleClick}
    disabled={disabled}
  >
    {title}
  </button>
);

export default WindowButton;
