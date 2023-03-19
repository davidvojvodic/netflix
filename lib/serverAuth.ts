// Importing required modules for authentication and database operations
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

// Defining an asynchronous function serverAuth that takes NextApiRequest object as input to authenticate user.
const serverAuth = async (req: NextApiRequest) => {
  // Retrieving session of the user requesting access.
  const session = await getSession({ req });

  // Checking whether a valid session for user exists or not. If session does not exists then we throw an error
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Finding the current user from the database. In this particular scenario, it tries to find user from "prismadb" based on email address
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // We throw an error if no user is found with the provided email address
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // Returning the authenticated user object
  return { currentUser };
};

// Exporting the function for use throughout the application
export default serverAuth;
