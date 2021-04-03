import React from 'react';

type Props = {
  title: string;
  handleClick: () => void;
};

const WindowButton: React.FC<Props> = ({ title, handleClick }) => (
  <button
    className="w-32 h-10 rounded-full text-lg grid place-items-center dark:text-gray-200 hover:bg-gray-600 border"
    type="button"
    onClick={handleClick}
  >
    {title}
  </button>
);

export default WindowButton;
