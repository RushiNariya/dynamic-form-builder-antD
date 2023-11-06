import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import ContainedButton from '../../components/Buttons/ContainedButton';
import { forgetPasswordEmailThunkAction } from '../../redux/auth/action';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from '../../redux/rootStateType';

const people = ['staff', 'drafter', 'rpls', 'admin'];

function ForgotPassword() {
  const dispatch = useDispatch<any>();
  const { isVerify } = useSelector(selectAuth);
  const navigateTo = useNavigate();

  const navigateToHome = () => {
    navigateTo('/auth/verifyotp');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required.'),
    }),
    onSubmit: (values) => {
      const { email } = values;

      dispatch(forgetPasswordEmailThunkAction(email, people, navigateToHome));
    },
  });

  return (
    <div className="relative flex items-center w-[100vw] justify-center lg:justify-normal min-h-screen p-0 overflow-hidden bg-center bg-cover">
      <Helmet>
        <title>Forgot Password | Cloint Reincarnation</title>
      </Helmet>
      <div className="container flex justify-center z-1 w-[100vw] lg:w-[50vw]">
        <div className="flex flex-wrap w-full -mx-3 md:px-[20%] lg:px-[15%] xl:px-[20%]">
          <div className="flex flex-col w-[100%] px-3 mx-auto lg:mx-0 shrink-0">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py-4 rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0">
                <h4 className="font-bold mb-2 text-xl">Forgot password</h4>
              </div>
              <div className="flex-auto p-6">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <Typography variant="caption">
                      <label className="text-sm font-medium mb-2" htmlFor="email">
                        Enter your email*
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
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-md mt-2">
                        {formik.errors.email}
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

    // </div>
  );
}

export default ForgotPassword;
