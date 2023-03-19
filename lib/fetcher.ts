// Import axios library to perform http requests.
import axios from "axios";

// Define a function named fetcher which accepts a URL string parameter.
const fetcher = (url: string) =>
  // Use axios get method to fetch data from the passed URL, and then return the resolved promise with response data.
  axios.get(url).then((res) => res.data);

// Export the fetcher function to be available in other modules.
export default fetcher;
