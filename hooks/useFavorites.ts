// This module Imports swr and fetcher from respective modules into this file

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// A custom hook function is defined called useFavorites that returns an object

const useFavorites = () => {
  // Inside the function, useSWR is called with "/api/favorites" (as URL), fetcher (as data fetching function) and a configuration object.
  // The four values returned by useSWR is destructured into individual variables in the order of declaration (data, error, isLoading, mutate).
  const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Finally, an object is created to be returned from the custom hook. It contains all the variables we destructured earlier
  // using the shorthand object property syntax, where key and value have the same name.
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;

// And the useFavorites is exported as the default export of this module.
