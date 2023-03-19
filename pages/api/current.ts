// Importing Next.js types for handling HTTP requests and responses
import { NextApiRequest, NextApiResponse } from "next";

// Importing server authentication function from `serverAuth` module
import serverAuth from "@/lib/serverAuth";

// Exporting an async function named `handler` which handles incoming requests
export default async function handler(
  req: NextApiRequest, // `req` represents the incoming request
  res: NextApiResponse // `res` represents the outgoing response
) {
  // Checking if incoming request is a GET request. If not, responding with status 405 (Method Not Allowed)
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Authenticating the incoming request with the `serverAuth` function
    const { currentUser } = await serverAuth(req);

    // Responding with status 200 (OK) and the `currentUser` object as JSON
    return res.status(200).json(currentUser);
  } catch (error) {
    // Logging any errors that occur during the authentication process
    console.log(error);

    // Responding with status 400 (Bad Request)
    return res.status(400).end();
  }
}
