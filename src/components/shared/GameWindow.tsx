import React from 'react';

interface Props {
  title: string;
  footer: React.ReactNode;
}

const GameWindow: React.FC<Props> = ({ title, footer, children }) => {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-9/12 h-4/6 border rounded grid grid-cols-1 grid-rows-12">
          <div className="row-span-3 flex items-center justify-center">
            <h1 className="text-5xl font-bold dark:text-gray-200 text-center">
              {title}
            </h1>
          </div>
          <div className="row-span-7">{children}</div>
          <div className="row-span-2 flex flex-row items-center justify-end space-x-2 pr-4">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWindow;
