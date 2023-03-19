// Importing the required dependencies
import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash"; // Lodash library provides utility functions for common programming tasks
import prismadb from "@/lib/prismadb"; // Prisma is an ORM that generates SQL queries by inspecting your database and represents a much more safer alternative to raw SQL queries
import serverAuth from "@/lib/serverAuth"; // Custom authentication middleware that checks if the request is coming from an authenticated user

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      // Checks whether the request type is POST
      const { currentUser } = await serverAuth(req); // Gets the authenticated user from the request

      const { movieId } = req.body; // Extracts the movie id from the request body

      const existingMovie = await prismadb.movie.findUnique({
        // Searches for the movie in Prismadb
        where: {
          id: movieId, // Using the extracted movieId
        },
      });

      // Throws an error if the movie does not exist
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      // Adds the current user's favorite id to list of favorites(i.e push)
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "", // Find the user based on their email address
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user); // Return the updated user with their favorited movies
    }

    if (req.method === "DELETE") {
      // Checks whether the request type is DELETE
      const { currentUser } = await serverAuth(req); // Gets the authenticated user from the request

      const { movieId } = req.body; // Extracts the movie id from the request body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId, // Using the extracted movieId
        },
      });

      // Throws an error if the movie does not exist
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      // Removes the current user's favorite id from the list of favorites
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      // Updates the user's favoriteIds with the updated value
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "", // Find the user based on their email address
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser); // Returns the updated user with the removed movie id from favorites
    }

    return res.status(405).end(); // Error response if invalid request method used
  } catch (error) {
    console.log(error);
    return res.status(400).end(); // Error response if something went wrong
  }
}
