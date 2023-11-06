import React from 'react';

interface OutlineButtonPropsType {
  children?: React.ReactNode | string;
  onClickHandler?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

function OutlineButton(props: OutlineButtonPropsType) {
  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClickHandler}
      className="inline-block py-2 px-5 text-xs font-bold leading-normal text-center text-[#0063A0] align-middle transition-all ease-in bg-transparent border border-[#0063A0] border-solid rounded-lg shadow-none cursor-pointer bg-150 active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 hover:opacity-75"
    >
      {props.children}
    </button>
  );
}

export default OutlineButton;
