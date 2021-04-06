import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [ellipsis, setEllipsis] = useState('');

  useEffect(() => {
    const changeEllipsis = () => {
      if (ellipsis === '...') setEllipsis('');
      else setEllipsis((state) => `${state}.`);
    };

    const interval = setInterval(changeEllipsis, 500);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ellipsis]);

  return (
    <div className="h-screen w-screen grid place-items-center">
      <h1 className="text-4xl font-bold dark:text-gray-200 text-center">
        {`Loading${ellipsis}`}
      </h1>
    </div>
  );
};

export default LoadingScreen;
