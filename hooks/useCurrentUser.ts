// importing the `useSWR` hook from the `swr` library
import useSWR from "swr";
// fetching the user details from the `/api/current` endpoint via this `fetcher` method.
import fetcher from "@/lib/fetcher";

// Define a function named `useCurrentUser` that will return objects holding user data, errors, loading state, etc.
const useCurrentUser = () => {
  // Getting the values returns by SWR hook when fetch completed, which are data, error, isLoading and mutate functions.
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  // Returning the result Objec,
  return {
    // current user data fetched by useSWR at the /api/current endpoint.
    data,
    // any errors that might occur when fetching the user data
    error,
    // whether the data is currently being fetched or not
    isLoading,
    // A mutate method to update the data manually
    mutate,
  };
};

// exporting the useCurrentUser function as default, so that other modules can re-use it.
export default useCurrentUser;
