import React from 'react';

interface ContainedButtonPropsType {
  children?: React.ReactNode;
  onClickHandler?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  className?: string;
}

function ContainedButton(props: ContainedButtonPropsType) {
  const { disabled = false } = props;
  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClickHandler}
      disabled={disabled}
      className={
        props?.className +
        'inline-block border-none px-4 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-b from-[#0063A0] to-[#073763] disabled:opacity-70 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25'
      }
    >
      {props.children}
    </button>
  );
}

export default ContainedButton;
