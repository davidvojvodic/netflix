import bcrypt from "bcrypt"; // Importing the bcrypt library for password hashing and verification.
import { NextApiRequest, NextApiResponse } from "next"; // Importing the functions NextApiRequest and NextApiResponse to type-check the handler function arguments.
import prismadb from "../../lib/prismadb"; // Importing the connection object to the Prisma database.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Exporting an asynchronous handler function that receives a request of type NextApiRequest and a response of type NextApiResponse
  if (req.method !== "POST") {
    // Verify whether the HTTP Method informed is POST
    return res.status(405).end(); // Return an HTTP 405 error message if its any other method than POST
  }

  try {
    const { email, name, password } = req.body; // Destructuring the request body as objects and retrieving its attributes

    const existingUser = await prismadb.user.findUnique({
      // Querying the database to verify the existence of an user with the same email.
      where: {
        email,
      },
    });
    if (existingUser) {
      // Verifying the existence of an user in the database with the same email.
      return res.status(422).json({ error: "Email taken" }); // Returning HTTP status code 422 in case an user is found, preventing users from creating multiple accounts with the same email.
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hashing the password received from the request body with the bcrypt algorithm.

    const user = await prismadb.user.create({
      // Creating an user in the database with provided data, where the password should be stored hashed.
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(), // Keeping record when the email was verified.
      },
    });

    return res.status(200).json(user); // Returning HTTP status code 200 and a json body containing the user information stored in the database.
  } catch (error) {
    console.log(error); // In case an exception occurs while the code is being executed, the details about the error are printed on the console.
    return res.status(400).end(); // Returning HTTP status code 400 indicating that there was an error processing the request with no additional content.
  }
}
