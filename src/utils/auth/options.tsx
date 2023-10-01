import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import TwitterProvider from 'next-auth/providers/twitter';
import { JWT } from 'next-auth/jwt';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '@/interface';
import { createUserByProviders, getUserByEmail } from '../outerbase-req/users';
import bcrypt from 'bcrypt';
import { IdGen } from '../helpers';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          console.log('credentials: ', credentials);
          const user = await getUserByEmail(credentials.email);
          const { password, ...newUserData } = user; //removed password
          const isCorrectPassword = await bcrypt.compare(
            credentials?.password,
            password
          );
          if (!isCorrectPassword) {
            return null;
          }
          if (user && isCorrectPassword) {
            return newUserData;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error verifying user credentials:', error);
          return null;
        }
      },
    }),
  ],

  jwt: {
    encode: ({ secret, token }) => {
      return jsonwebtoken.sign(
        {
          ...token,
          iss: 'https://phorfolio.site',
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5,
          // subdomain: token?.subdomain,
        },
        secret
      );
    },
    decode: async ({ secret, token }) => {
      if (!token) {
        throw new Error('Token is missing');
      }
      return jsonwebtoken.verify(token!, secret) as JWT;
    },
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      
      // const subdomain = req.headers.host.split('.')[0];
      console.log('baseUrl: ', baseUrl);
      console.log('url: ', url);

      return baseUrl;
    },
    async jwt({ profile, token }) {
      if (profile && token) {
        const email = token.email;
        const user = await getUserByEmail(email!);
        //There's a case where a user won't go through
        //the normal register route with provider but use the login
        // so we gonna create a user here by checking if the user exist or not
        //if user returns null then, we create the user.
        // and this works for both the sign-in or register and
        //skip if creating the user if there's an account with the user's email.

        if (!user) {
          const userId = IdGen('USER_PROVIDER');
          const userByProvider: User = {
            name: token.name!,
            email: token.email!,
            password: '',
            image: token.picture!,
            id: userId,
            username: '',
          };
          // Github has a login props, so if it is Github
          // then we add the username to the userObj
          if (profile && 'login' in profile) {
            userByProvider.username = profile.login! as string;
            token.username = profile.login! as string;
          }
          // Google don't provide username, so we
          //generate the username using the email,
          //and also, users can change it later.
          if ('iss' in profile) {
            console.log('Reach here');
            const iss = profile.iss as string;
            const isGoogle = iss.includes('google');

            console.log('isGoogle: ', isGoogle);

            // we get the username from the email by separating by
            //'@' then returning the first value using 'shift()'
            if (isGoogle) {
              const username = email?.split('@').shift();
              console.log('username: ', username);
              userByProvider.username = username!;
              token.username = username!;
            }
          }
          token.sub = userId;
          console.log('Id added to Token: ', token);
          await createUserByProviders(userByProvider);
        } else {
          token.username = user.username;
          token.sub = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          username: token.username,
        } as User;
      }

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        domain: '.test.com',
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
    },
  },
};
