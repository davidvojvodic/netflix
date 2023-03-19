import useSWR from "swr"; // Importing the "useSWR" hook from the "swr" package.
import fetcher from "@/lib/fetcher"; // Importing the "fetcher" function from the "@/lib/fetcher" module.

const useMovieList = () => {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher, {
    // Using the "useSWR" hook to fetch data from "/api/movies".
    revalidateIfStale: false, // When set to false, it specifies that only one request should be sent while data is being requested from backend server even if the data becomes stale
    revalidateOnFocus: false, // When set to false, it means that fetching data again when the document regains focus (eg. fair amount of focus loss and new focus) should not occur
    revalidateOnReconnect: false, // When set to false, it means that data should not refetch automatically upon reconnection after lost connection
  });

  return {
    data, // Returning the data fetched from the API.
    error, // Returning any errors occurred during the data fetch.
    isLoading, // returning a boolean representing the state indicate whether we’re currently loading data or not.
  };
};

export default useMovieList; // Exporting the "useMovieList" function for use in other modules/components.
