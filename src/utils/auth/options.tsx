import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import TwitterProvider from 'next-auth/providers/twitter';
import { JWT } from 'next-auth/jwt';
import jsonwebtoken from 'jsonwebtoken';

// Configuration options for authentication
export const authOptions: AuthOptions = {
  providers: [
    // GitHub authentication provider configuration
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Google authentication provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Twitter authentication provider configuration
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    // Credentials authentication provider configuration
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      //   // Custom authorization logic for credentials-based authentication
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials');
          }
          // const user = await findUser(credentials);
          return { user: 'dsdsd'} as any
          // return user;
        } catch (error) {
          console.error('Error verifying user credentials:', error);
          throw error;
        }
      },
    }),
  ],

  // Configure JSON Web Token (JWT) encoding and decoding
  jwt: {
    // Encoding function: Create and sign a JWT token
    encode: ({ secret, token }) => {
      return jsonwebtoken.sign(
        {
          ...token,
          iss: 'https://devespace.vercel.app', // Issuer of the token
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60, // Expiration time (1 hour from now)
        },
        secret
      );
    },

    // Decoding function: Verify a JWT token and decode its data
    decode: async ({ secret, token }) => {
      return jsonwebtoken.verify(token!, secret) as JWT;
    },
  },

  // Configure authentication callbacks
  callbacks: {
    // JWT callback: Executed whenever a JWT is created or updated
    async jwt({ profile, token }) {
      if (token && profile) {
        // Find user by email from GraphQL API

        // If GitHub profile information is available, use it
        if ('login' in profile) {
          token.username = profile.login!;
        }
      }
      return token;
    },

    // Session callback: Populate session data based on JWT information
    async session({ session, token }) {
      const customUser = {
        username: token.username,
        name: token.name,
        email: token.email,
        image: token.picture,
        id: token.sub,
      };
      session.user = customUser; // Set custom user data in the session

      return session;
    },
  },
};
