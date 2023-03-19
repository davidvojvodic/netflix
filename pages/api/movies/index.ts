import { NextApiRequest, NextApiResponse } from "next"; // importing required modules
import prismadb from "@/lib/prismadb"; //importing the database client module
import serverAuth from "@/lib/serverAuth"; //importing custom authentication middleware

export default async function handler( // defining an async function as the API route handler
  req: NextApiRequest, //define the type for request parameter which will be an object that implements NextApiRequest interface.
  res: NextApiResponse // define the type for response parameter which will be an object that implements NextApiResponse interface.
) {
  if (req.method !== "GET") {
    //checking request method, If the method of the request is not 'GET' status is responded with 405.
    return res.status(405).end();
  }

  try {
    //try-catch block to handle any errors while processing the data
    await serverAuth(req); //authentication middleware which authenticates the user

    const movies = await prismadb.movie.findMany(); // fetches all the documents from the movie collection of the database.

    return res.status(200).json(movies); // Sends the fetched data as a JSON response with status "success" signalizes by HTTP status code 200 (or OK).
  } catch (error) {
    //If the execution throws an exception then prompt an error message
    console.log(error); // Logs the error to console.
    return res.status(400).end(); //Sends the error response as an HTTP status code 400 (Bad Request).
  }
}
