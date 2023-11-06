import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import hidePassword from '../../assets/images/hide-password-icon.png';
import showPassword from '../../assets/images/show-password-icon.png';
import ContainedButton from '../../components/Buttons/ContainedButton';
import PageLayout from '../../components/PageLayout/PageLayout';
import {
  useConfirmPasswordShow,
  useOldPasswordShow,
  usePasswordShow,
} from '../../hooks/usePasswordShow';
import { loggingOutUserThunkAction } from '../../redux/auth/action';
import { useSelector } from '../../redux/rootStateType';
import { resetUserPasswordThunkAction } from '../../redux/users/action';
import { selectUsersList } from '../../redux/users/selectors';

interface MyFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string | undefined;
}

function ChangePassword() {
  const { passwordShown, togglePasswordVisiblity, type } = usePasswordShow();

  const { confirmPasswordShown, toggleConfirmPasswordVisiblity, confirmType } =
    useConfirmPasswordShow();

  const { oldPasswordShown, toggleOldPasswordVisiblity, oldType } = useOldPasswordShow();

  const dispatch = useDispatch<any>();
  const navigateTo = useNavigate();

  const { isSubmitting } = useSelector(selectUsersList);

  const initialValues: MyFormValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: undefined,
  };

  const navigateToLogin = () => {
    navigateTo('/auth/login', {
      replace: true,
    });
  };

  const onSuccess = () => {
    dispatch(loggingOutUserThunkAction(navigateToLogin));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required('Current Password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .max(50, 'Password must be less than 50 characters.'),
      newPassword: Yup.string()
        .required('New Password is required.')
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
      dispatch(
        resetUserPasswordThunkAction(values.oldPassword, values.newPassword, onSuccess),
      );
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
    <PageLayout pageTitle="Change Password">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg">
          <div className="w-full p-6 bg-white rounded-lg md:mt-0 sm:max-w-md sm:p-8">
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="mb-4 relative">
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current Password*
                </label>
                <div className="relative">
                  <input
                    type={oldType}
                    id="oldPassword"
                    placeholder="Current Password"
                    className={`focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                      formik.touched.oldPassword && formik.errors.oldPassword
                        ? 'border-red-500'
                        : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                    style={{ paddingRight: '20px' }}
                    onKeyDown={restrictSpace}
                  />
                  <img
                    src={oldPasswordShown ? hidePassword : showPassword}
                    alt={oldPasswordShown ? 'hide-password' : 'show-password'}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={toggleOldPasswordVisiblity}
                  />
                </div>

                <div>
                  {' '}
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <div className="text-red-500 text-md mt-2">
                      {formik.errors.oldPassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password*
                </label>
                <div className="relative">
                  <input
                    type={type}
                    id="newPassword"
                    placeholder="New Password"
                    className={`focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                      formik.touched.newPassword && formik.errors.newPassword
                        ? 'border-red-500'
                        : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    style={{ paddingRight: '20px' }}
                    onKeyDown={restrictSpace}
                  />

                  <img
                    src={passwordShown ? hidePassword : showPassword}
                    alt={passwordShown ? 'hide-password' : 'show-password'}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={togglePasswordVisiblity}
                  />
                </div>

                <div>
                  {' '}
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500 text-md mt-2">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password*
                </label>
                <div className="relative">
                  <input
                    type={confirmType}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className={`focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? 'border-red-500'
                        : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    onKeyDown={restrictSpace}
                  />

                  <img
                    src={confirmPasswordShown ? hidePassword : showPassword}
                    alt={confirmPasswordShown ? 'hide-password' : 'show-password'}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={toggleConfirmPasswordVisiblity}
                  />
                </div>

                <div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-md mt-2">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="text-center">
                <ContainedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </ContainedButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ChangePassword;
