import NextAuth, { Session } from "next-auth";
import { getSession } from "next-auth/react"

import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginResponse } from '../../../src/lib/types'
import axios from "axios";



const BASE_URL_APP = "https://app.clickup.com/v1";

interface IDevTokenResponse {
  devToken: string
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


const getAccessToken = async (req, res): Promise<string> => {
  const data = await getSession({ req })
  const { user } = data
  return new Promise((res, rej) => {
    if (!user) {
      rej('No user')
    }
    if (!user['accessToken']) {
      rej('No access token')
    }
    const token = user['accessToken']
    if (typeof token !== 'string') {
      rej('Invalid access token')
    }
    return res(token)
  })
}



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
      name: "Tracka",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);

        try {
          const { user, token, refresh_token } = await login(credentials);
          const { devToken } = await getDevToken(token);
          return { ...user, token: devToken, refresh_token };
        } catch (error) {
          console.log(error)
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("im here")
      return baseUrl;
    },
    async session({ session, token }) {
      console.log("im here 2")

      const newSession = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        oAuthToken: token.oAuthToken,
        id: token.id,
        defaultTeam: token.defaultTeam

      }
      session.user = newSession as any
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {

        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refresh_token,
          oAuthToken: user.oAuthToken,
          name: user.username,
          id: user.id,
          defaultTeam: user.default_team,
        } as any
      }

      return token;
    },
  },
  pages: {
    signIn: '/login/signin',
   // signOut: '/auth/signout',
   // error: '/auth/error', // Error code passed in query string as ?error=
   // verifyRequest: '/auth/verify-request', // (used for check email message)
   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
