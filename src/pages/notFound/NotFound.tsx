import { useNavigate } from 'react-router-dom';

import ContainedButton from '../../components/Buttons/ContainedButton';
import { defaultHomePage, UserRoles } from '../../utils/role';

interface NotFoundType {
  statusCode?: string;
  message?: string;
}

function NotFound(props: NotFoundType) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role') as UserRoles;

  const { message = "Sorry, we couldn't find this page.", statusCode = '404' } = props;
  return (
    <section className="flex items-center h-full p-1">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-lg text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>
            {statusCode}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{message}</p>
          <p className="mt-4 mb-8">
            But don&apos;t worry, you can find plenty of other things on our homepage.
          </p>

          <ContainedButton
            onClickHandler={() => navigate(defaultHomePage(role), { replace: true })}
          >
            Back to homepage
          </ContainedButton>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
