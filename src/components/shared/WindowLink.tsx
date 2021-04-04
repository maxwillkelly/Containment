import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  path: string;
};

const WindowLink: React.FC<Props> = ({ title, path }) => (
  <Link to={path}>
    <div className="w-32 h-10 rounded-full text-lg grid place-items-center dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200">
      {title}
    </div>
  </Link>
);

export default WindowLink;
