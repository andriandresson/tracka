import { getCsrfToken } from 'next-auth/react';

import { LoginForm } from '@sendiradid-internship/tracka-ui';

const SignIn = ({ csrfToken }) => {
  return (
    <LoginForm
      csrfToken={csrfToken}
      APIurl="/api/auth/callback/credentials"
    ></LoginForm>
  );
};

export const getServerSideProps = async (context) => {
  console.info('%cconsole.info', 'color: green;');
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;
