import React from 'react';

function Badge({
  name,
  onClickHandler,
  isDeletable = true,
}: {
  name: string;
  onClickHandler?: () => void;
  isDeletable?: boolean;
}) {
  return (
    <span className="flex transition ease-in duration-800 items-center rounded-full border border-gray-100 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
      <span>{name}</span>
      {isDeletable ? (
        <button
          onClick={onClickHandler}
          type="button"
          className="group ml-1 -mr-0.5 shrink-0 rounded-full"
        >
          <svg
            className="h-3 w-3 stroke-gray-600 group-hover:stroke-black"
            viewBox="0 0 256 256"
          >
            <line
              x1="200"
              y1="56"
              x2="56"
              y2="200"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="26"
            ></line>
            <line
              x1="200"
              y1="200"
              x2="56"
              y2="56"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="26"
            ></line>
          </svg>
        </button>
      ) : null}
    </span>
  );
}

export default Badge;
