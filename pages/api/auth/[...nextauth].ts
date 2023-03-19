import NextAuth from "next-auth/next"; // Importing the NextAuth library
import Credentials from "next-auth/providers/credentials"; // Importing the credentials provider for authenticating with username and password
import prismadb from "../../../lib/prismadb"; // Importing the Prisma client instance to interact with the database
import { compare } from "bcrypt"; // Used for comparing plain text passwords with hashed passwords.

import GithubProvider from "next-auth/providers/github"; // Importing Github provider for authentication
import GoogleProvider from "next-auth/providers/google"; // Importing Google provider for authentication

import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Adapter to use Prisma as a database in NextAuth

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "", // API key of Github account
      clientSecret: process.env.GITHUB_SECRET || "", // Secret key of Github account
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "", // API key of Google account
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Secret key of Google account
    }),
    Credentials({
      // Adding the custom credentials provider to the providers array
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await prismadb.user.findUnique({
          // Fetching the user from the database using the provided email in credentials
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          // If there is no user or hashed password, then throw an error
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          // Comparing plain text password with hashed password fetched from the database
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          // If the provided password is incorrect, then throw an error
          throw new Error("Incorrect password");
        }

        return user; // Returns the authenticated user object on successful login
      },
    }),
  ],
  pages: {
    signIn: "/auth", // Setting the default sign in page
  },

  debug: process.env.NODE_ENV === "development", // Enable debugging when in development mode.

  adapter: PrismaAdapter(prismadb), // Setting up the PrismaAdapter with NextAuth

  session: {
    // Providing the strategy used to generate session token and authenticate requests with them.
    strategy: "jwt",
  },

  jwt: {
    // JWT token configuration
    secret: process.env.NEXTAUTH_JWT_SECRET, // Secret for signing JWT tokens
  },

  secret: process.env.NEXTAUTH_SECRET, // A secret string used for integration with next-auth that users should keep it secure and private
});
