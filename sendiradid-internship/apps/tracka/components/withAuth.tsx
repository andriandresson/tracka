import { Navbar, DashboardLayout } from '@sendiradid-internship/tracka-ui';
import { DefaultUser, Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useApplicationContext } from './appContext';

interface ExtendedUserSession extends DefaultUser {
  apiToken: string;
  refreshToken: string;
  oAuthToken: string;
  defaultTeam: string;
  color?: string;
  initials?: string;
  profilePicture?: string;
}

export interface ExtendedSession extends Session {
  user: ExtendedUserSession;
}

interface WithAuthProps {
  session: ExtendedSession;
}

export const WithAuth = (Component: React.ComponentType<WithAuthProps>) => {
  const WithAuthComponent = ({ ...props }) => {
    const { value } = useApplicationContext();
    const { data: session, status } = useSession();
    const extendedSession = session as ExtendedSession;
    const loading = status === 'loading';
    const hasUser = !!session?.user;
    const router = useRouter();
    useEffect(() => {
      if (!loading && !hasUser) {
        router.push('/login?callbackUrl=http%3A%2F%2Flocalhost%3A4200');
      }
    }, [loading, hasUser]);
    if (loading || !hasUser) {
      return null;
    }
    if (value.isOnboard) {
      return (
        <>
          <DashboardLayout>
            <Component {...props} session={extendedSession} />
          </DashboardLayout>
        </>
      );
    } else
      return (
        <>
          <Navbar></Navbar>
          <Component {...props} session={extendedSession} />
        </>
      );
  };

  WithAuthComponent.displayName = `WithAuth(${
    Component.displayName || Component.name
  })`;

  return WithAuthComponent;
};
