import React from 'react';

export const usePasswordShow = () => {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown((preValue) => !preValue);
  };

  const type = passwordShown ? 'text' : 'password';

  return { passwordShown, togglePasswordVisiblity, type };
};

export const useConfirmPasswordShow = () => {
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown((preValue) => !preValue);
  };

  const confirmType = confirmPasswordShown ? 'text' : 'password';

  return { confirmPasswordShown, toggleConfirmPasswordVisiblity, confirmType };
};

export const useOldPasswordShow = () => {
  const [oldPasswordShown, setOldPasswordShown] = React.useState(false);

  const toggleOldPasswordVisiblity = () => {
    setOldPasswordShown((preValue) => !preValue);
  };

  const oldType = oldPasswordShown ? 'text' : 'password';

  return { oldPasswordShown, toggleOldPasswordVisiblity, oldType };
};
