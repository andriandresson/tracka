import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ILoginResponse } from '../../../src/lib/types';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

const BASE_URL_APP = 'https://app.clickup.com/v1';
const BASE_URL_API = 'https://api.clickup.com/api/v2';

interface IDevTokenResponse {
  devToken: string;
}

interface ClickupUserResponse {
  user: clickupUser;
}
interface clickupUser {
  id: number;
  username: string;
  email: string;
  color: string;
  profilePicture: string;
  initials: string;
  week_start_day: string;
  global_font_support: boolean;
  timezone: string;
}

export const getDevToken = (token: string): Promise<IDevTokenResponse> => {
  // validate credentials
  if (!token) {
    throw new Error('Token is required');
  }

  // create basic auth header
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return new Promise((res, rej) => {
    axios
      .get<any>(`${BASE_URL_APP}/devKey`, {
        headers,
      })
      .then((response) => {
        const { key } = response.data;
        if (!key) {
          rej('Invalid token');
        }
        res({ devToken: key });
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
};

const getUser = async (apiToken: string): Promise<any> => {
  const headers = {
    Authorization: `${apiToken}`,
  };
  return new Promise((res, rej) => {
    axios
      .get<any>(`${BASE_URL_API}/user`, {
        headers,
      })
      .then((response) => {
        const { data } = response;
        if (!data) {
          rej('Invalid token');
        }
        res(data);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
};

interface Credentials {
  username: string;
  password: string;
}

export const login = (credentials: Credentials): Promise<ILoginResponse> => {
  // validate credentials
  const { username, password } = credentials;
  if (!username || !password) {
    throw new Error('Invalid credentials');
  }

  // create basic auth header
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
  };

  return new Promise((res, rej) => {
    axios
      .post<ILoginResponse>(`${BASE_URL_APP}/login?include_teams=true`, null, {
        headers,
      })
      .then((response) => {
        const { data } = response;
        res(data);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Tracka',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // console.log(credentials);

        try {
          const { user, token, refresh_token } = await login(credentials);
          const { devToken } = await getDevToken(token);
          const userData = (await getUser(devToken)) as ClickupUserResponse;
          return {
            ...user,
            userData,
            token: devToken,
            refresh_token,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      const { user: userData } = (await getUser(
        token.apiToken
      )) as ClickupUserResponse;
      const newSession = {
        apiToken: token.apiToken,
        refreshToken: token.refreshToken,
        id: userData.id,
        username: userData.username,
        color: userData.color,
        initials: userData.initials,
        profilePicture: userData.profilePicture,
      };
      session.user = newSession as Session['user'];
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          apiToken: user.token,
          refreshToken: user.refresh_token,
          oAuthToken: user.oAuthToken,
          name: user.username,
          id: user.id,
        } as JWT;
      }
      console.log('token', token);
      console.log('user', user);

      return token;
    },
  },
  pages: {
    signIn: '/login/',
    signOut: '/login/',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
