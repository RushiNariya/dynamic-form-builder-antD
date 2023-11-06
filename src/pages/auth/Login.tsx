import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import hidePassword from '../../assets/images/hide-password-icon.png';
import showPassword from '../../assets/images/show-password-icon.png';
import ContainedButton from '../../components/Buttons/ContainedButton';
import { usePasswordShow } from '../../hooks/usePasswordShow';
import { fetchLoginUserThunkAction } from '../../redux/auth/action';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from '../../redux/rootStateType';

const people = ['staff', 'drafter', 'rpls', 'admin', 'fieldRep'];

function Login() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch<any>();

  const { isSigning } = useSelector(selectAuth);

  const { passwordShown, togglePasswordVisiblity, type } = usePasswordShow();

  const navigateToDashboard = () => {
    //redirected to respective home/dashboard page after login
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required.'),
      password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .max(50, 'Password must be less than 50 characters.'),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(fetchLoginUserThunkAction(email, password, people, navigateToDashboard));
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
        <title>Sign In | Cloint Reincarnation</title>
      </Helmet>
      <div className="container flex justify-center z-1 w-[100vw] lg:w-[50vw]">
        <div className="flex flex-wrap w-full mx-2 md:px-[20%] lg:px-[15%] xl:px-[20%]">
          <h1 className="text-[2rem] mb-4 font-medium text-center w-full">
            {' '}
            Cloint Reincarnation
          </h1>
          <div className="flex flex-col w-[100%] px-3 mx-auto lg:mx-0 shrink-0 bg-gray-100">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0">
                <h4 className="font-bold mb-2 text-xl">Sign In</h4>
                <p className="mb-0">Enter your email and password to sign in</p>
              </div>
              <div className="flex-auto p-6">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <Typography variant="caption">
                      <label className="text-sm font-medium mb-2" htmlFor="email">
                        Email*
                      </label>
                    </Typography>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className={`focus:shadow-primary-outline mt-2 focus:border-slate-400 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                        formik.touched.email && formik.errors.email
                          ? 'border-red-500'
                          : ''
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="mb-4">
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-md mt-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3 relative">
                    <Typography variant="caption">
                      <label className="text-sm font-medium mb-2" htmlFor="password">
                        Password*
                      </label>
                    </Typography>
                    <input
                      type={type}
                      id="password"
                      placeholder="Password"
                      className={`focus:shadow-primary-outline mt-2 focus:border-slate-400 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-500'
                          : ''
                      }`}
                      onKeyDown={restrictSpace}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />

                    <img
                      src={passwordShown ? hidePassword : showPassword}
                      alt={passwordShown ? 'hide-password' : 'show-password'}
                      className="password_icon"
                      onClick={togglePasswordVisiblity}
                    />
                  </div>
                  <div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-md mt-2">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-center">
                    <ContainedButton
                      type="submit"
                      disabled={isSigning}
                      className="w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                    >
                      {isSigning ? 'Signing...' : 'Sign in'}
                    </ContainedButton>
                  </div>
                </form>
              </div>
              <div className="rounded-b-2xl p-6 text-center pt-0 px-6">
                <p className="mx-auto mb-6 leading-normal text-sm text-right">
                  <Link
                    className="font-semibold text-[#0063A0]"
                    to="/auth/forgotpassword"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-1 flex-col justify-center hidden lg:w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
          <div
            className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('../../assets/images/auth_banner.jpg')] rounded-xl"
            style={{
              // backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              borderRadius: '0.5rem',
              border: 'none',
            }}
          >
            <span
              className="absolute top-0 left-0 w-full h-full opacity-90"
              style={{
                // backgroundImage: 'linear-gradient(to top left, #0063A0, #073763)',
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

export default Login;
