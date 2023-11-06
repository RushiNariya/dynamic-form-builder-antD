import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import ContainedButton from '../../components/Buttons/ContainedButton';
import { verifyOTPThunkAction } from '../../redux/auth/action';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from '../../redux/rootStateType';

function VerifyOTP() {
  const dispatch = useDispatch<any>();
  const navigateTo = useNavigate();

  const { isSigning } = useSelector(selectAuth);
  const verifiedEmail = localStorage.getItem('verifyEmail');

  const navigateToLogin = () => {
    navigateTo('/auth/resetpassword', {
      replace: true,
    });
  };

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string()
        .required('OTP is required.')
        .matches(/^[0-9]+$/, 'Otp must be only digits.')
        .min(4, 'OTP must be exactly 4 digits.')
        .max(4, 'OTP must be exactly 4 digits.'),
    }),
    onSubmit: (values) => {
      localStorage.setItem('verifyOTP', values.otp.toString());
      if (verifiedEmail) {
        dispatch(
          verifyOTPThunkAction(verifiedEmail, values.otp.toString(), navigateToLogin),
        );
      }
    },
  });

  useEffect(() => {
    if (!verifiedEmail) {
      navigateTo('/auth/login', {
        replace: true,
      });
    }
  }, [verifiedEmail]);

  return (
    <div className="relative flex items-center w-[100vw] justify-center lg:justify-normal min-h-screen p-0 overflow-hidden bg-center bg-cover">
      <Helmet>
        <title>Verify OTP | Cloint Reincarnation</title>
      </Helmet>
      <div className="container flex justify-center z-1 w-[100vw] lg:w-[50vw]">
        <div className="flex flex-wrap w-full -mx-3 md:px-[20%] lg:px-[15%] xl:px-[20%]">
          <div className="flex flex-col w-[100%] px-3 mx-auto lg:mx-0 shrink-0">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0">
                <h4 className="font-bold mb-2 text-xl">Verify OTP</h4>
              </div>
              <div className="flex-auto p-6">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <Typography variant="caption">
                      <label className="text-sm font-medium mb-2" htmlFor="email">
                        Enter your OTP*
                      </label>
                    </Typography>
                    <input
                      type="number"
                      placeholder="OTP Code"
                      id="otp"
                      className={`focus:shadow-primary-outline mt-2 focus:border-slate-400 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                        formik.touched.otp && formik.errors.otp ? 'border-red-500' : ''
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.otp}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.otp && formik.errors.otp ? (
                      <div className="text-red-500 text-md mt-2">{formik.errors.otp}</div>
                    ) : null}
                  </div>

                  <div className="text-center">
                    <ContainedButton
                      type="submit"
                      disabled={isSigning}
                      className="w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                    >
                      {isSigning ? 'Verifying...' : 'Submit'}
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

export default VerifyOTP;
