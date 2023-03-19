import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

// Define an async function that receives the request and response objects as parameters and returns a Promise
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is not GET and send a 405 status response if so.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Get the authenticated user information from the request object
    const { currentUser } = await serverAuth(req);

    // Get the favorite movies of the current user from Prismadb database
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    // Send a success HTTP response with the user's favorite movies data in JSON format
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    // Log any error occurred and send a bad request HTTP response
    console.log(error);
    return res.status(400).end();
  }
}
