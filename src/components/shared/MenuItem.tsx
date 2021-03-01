import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  path?: string;
  handleClick?: () => void;
}

const MenuItem: React.FC<Props> = ({ name, path, handleClick }) => {
  return (
    <div className="p-5 text-2xl shadow-2xl dark:bg-gray-700 dark:text-gray-200 my-4 text-center flex-shrink">
      {path ? (
        <Link to={path}>{name}</Link>
      ) : (
        <button type="button" onClick={handleClick}>
          {name}
        </button>
      )}
    </div>
  );
};

export default MenuItem;
