// Import necessary dependencies and modules
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if request method is GET
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Authenticate server
    await serverAuth(req);

    // Retrieve ID of the requested movie from query params
    const { movieId } = req.query;

    // Validate movie ID
    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }
    if (!movieId) {
      throw new Error("Invalid ID");
    }

    /* Query for the movie with the specified ID using the Prisma ORM 
       by searching for a match in the 'id' field */
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    // Return error response if no matching movie record was found
    if (!movie) {
      throw new Error("Invalid ID");
    }

    // Return the movie object as JSON response
    return res.status(200).json(movie);
  } catch (error) {
    // Log any errors thrown during processing of the request.
    console.log(error);
    // Return an error response
    return res.status(400).end();
  }
}
