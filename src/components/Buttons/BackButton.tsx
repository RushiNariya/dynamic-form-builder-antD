import React from 'react';

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="py-2 px-3 cursor-pointer border-[1px] flex items-center border-[#0063A0] text-[#0063A0] rounded-md "
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 inline mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      back
    </div>
  );
}

export default BackButton;
