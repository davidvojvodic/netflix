// Importing the "useSWR" hook from the "swr" package which allows easy data fetching with caching and revalidation.
import useSWR from "swr";

// Importing the "fetcher" function from the "fetcher" module that wraps the fetch API with error handling.
import fetcher from "@/lib/fetcher";

// Defining a custom hook called "useBillboard".
const useBillboard = () => {
  // Using the "useSWR" hook to fetch data for a random billboard video using the "/api/random" endpoint with the "fetcher" function.
  const { data, error, isLoading } = useSWR("/api/random", fetcher, {
    // Configuring SWR not to revalidate the data automatically when it becomes stale, or on window focus, or on reconnect.
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Returning an object containing the fetched data, any error that occurred, and a loading flag.
  return {
    data,
    error,
    isLoading,
  };
};

// Exporting the "useBillboard" hook as the default export of this module.
export default useBillboard;
