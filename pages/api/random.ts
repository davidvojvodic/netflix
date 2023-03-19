import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../lib/prismadb"; // Import database connection
import serverAuth from "@/lib/serverAuth"; // Import authentication middleware.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    // Check if request method is "GET"
    return res.status(405).end(); // If not, return HTTP Status Code "Method Not Allowed" (405) and end the response.
  }

  try {
    await serverAuth(req); // Use server authentication

    const movieCount = await prismadb.movie.count(); // Get count of number of movies in the database.
    const randomIndex = Math.floor(Math.random() * movieCount); // Generate a random index based on the number of movies in the database.

    const randomMovies = await prismadb.movie.findMany({
      // Find all movie(s) matching our criteria from the database.
      take: 1, // Fetch only one movie
      skip: randomIndex, // Skip a certain number of indices before picking back up again
    });

    return res.status(200).json(randomMovies[0]); // Return a JSON object consisting of one chosen movie selected at that particular index.
  } catch (error) {
    // catch any thrown errors
    console.log(error); // log them to the console for debugging purposes
    return res.status(400).end(); // return a HTTP status code of "Bad Request" (400) and end the response.
  }
}
