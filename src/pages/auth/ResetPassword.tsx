import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';

import hidePassword from '../../assets/images/hide-password-icon.png';
import showPassword from '../../assets/images/show-password-icon.png';
import ContainedButton from '../../components/Buttons/ContainedButton';
import { useConfirmPasswordShow, usePasswordShow } from '../../hooks/usePasswordShow';
import { resetPasswordThunkAction } from '../../redux/auth/action';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from '../../redux/rootStateType';

interface MyFormValues {
  newPassword: string;
  confirmPassword: string | undefined;
}

function ResetPassword() {
  const { passwordShown, togglePasswordVisiblity, type } = usePasswordShow();

  const { confirmPasswordShown, toggleConfirmPasswordVisiblity, confirmType } =
    useConfirmPasswordShow();

  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const navigateTo = useNavigate();

  const verifiedEmail: string | null = localStorage.getItem('verifyEmail');
  const verifyOtp = localStorage.getItem('verifyOTP');

  const initialValues: MyFormValues = {
    newPassword: '',
    confirmPassword: undefined,
  };

  const { isVerify } = useSelector(selectAuth);

  const navigateToLogin = () => {
    navigateTo('/auth/login', {
      replace: true,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .max(50, 'Password must be less than 50 characters.')
        .matches(
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/,
          'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match.')
        .required('Confirm Password is required.'),
    }),

    onSubmit: (values) => {
      if (verifiedEmail && verifyOtp) {
        dispatch(
          resetPasswordThunkAction(
            verifiedEmail,
            values.newPassword,
            verifyOtp,
            navigateToLogin,
          ),
        );
      }
    },
  });

  const restrictSpace = (event: any) => {
    const passwordValue = event.target.value;
    const key = event.keyCode || event.charCode;

    if (
      key === 32 &&
      (passwordValue.length === 0 ||
        passwordValue.trim().length === 0 ||
        passwordValue.endsWith(' '))
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="relative flex items-center w-[100vw] justify-center lg:justify-normal min-h-screen p-0 overflow-hidden bg-center bg-cover">
      <Helmet>
        <title>Reset Password | Cloint Reincarnation</title>
      </Helmet>
      <div className="container flex justify-center z-1 w-[100vw] lg:w-[50vw]">
        <div className="flex flex-wrap w-full -mx-3 md:px-[20%] lg:px-[15%] xl:px-[20%]">
          <div className="flex flex-col w-[100%] px-3 mx-auto lg:mx-0 shrink-0">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0">
                <h4 className="font-bold">Reset password</h4>
              </div>
              <div className="flex-auto p-8">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-2 relative">
                    <Typography variant="caption">
                      <label className="text-sm font-medium mb-2" htmlFor="email">
                        Password*
                      </label>
                    </Typography>
                    <input
                      type={type}
                      id="newPassword"
                      placeholder="New Password"
                      className={`focus:shadow-primary-outline mt-2 focus:border-slate-400 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                        formik.touched.newPassword && formik.errors.newPassword
                          ? 'border-red-500'
                          : ''
                      }`}
                      onKeyDown={restrictSpace}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      style={{ paddingRight: '20px' }}
                    />
                    <img
                      src={passwordShown ? hidePassword : showPassword}
                      alt={passwordShown ? 'hide-password' : 'show-password'}
                      className="password_icon"
                      onClick={togglePasswordVisiblity}
                    />
                  </div>
                  <div className="mb-5">
                    {' '}
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                      <div className="text-red-500 text-md mb-2">
                        {formik.errors.newPassword}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-2 relative">
                    <Typography variant="caption">
                      <label className="text-sm font-medium mb-2" htmlFor="email">
                        Confirm Password*
                      </label>
                    </Typography>
                    <input
                      type={confirmType}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className={`focus:shadow-primary-outline mt-2 focus:border-slate-400 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                          ? 'border-red-500'
                          : ''
                      }`}
                      onKeyDown={restrictSpace}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <img
                      src={confirmPasswordShown ? hidePassword : showPassword}
                      alt={confirmPasswordShown ? 'hide-password' : 'show-password'}
                      className="confirm_password_icon"
                      onClick={toggleConfirmPasswordVisiblity}
                    />
                  </div>

                  <div className="mb-5">
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="text-red-500 text-md mt-2">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <ContainedButton
                      type="submit"
                      disabled={isVerify}
                      className="w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                    >
                      {isVerify ? 'Submitting...' : 'Submit'}
                    </ContainedButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-1 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
          <div
            className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('../../assets/images/auth_banner.jpg')] rounded-xl"
            style={{
              backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              borderRadius: '0.5rem',
              border: 'none',
            }}
          >
            <span
              className="absolute top-0 left-0 w-full h-full opacity-90"
              style={{
                backgroundImage: 'linear-gradient(to top left, #0063A0, #073763)',
                zIndex: '-1',
                borderRadius: '0.5rem',
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
