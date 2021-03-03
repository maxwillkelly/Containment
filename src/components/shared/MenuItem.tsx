import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  path?: string;
  handleClick?: () => void;
}

const MenuItem: React.FC<Props> = ({ name, path, handleClick }) => {
  const styles =
    'w-full p-5 text-2xl shadow-2xl dark:bg-gray-700 dark:text-gray-200 mb-4 text-center flex-shrink';

  if (path)
    return (
      <Link to={path}>
        <div className={styles}>{name}</div>
      </Link>
    );

  return (
    <button className={styles} type="button" onClick={handleClick}>
      {name}
    </button>
  );
};

export default MenuItem;
