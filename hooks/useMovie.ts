//importing the useSWR hook from 'swr' package and fetcher function from '@/lib/fetcher'.
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//Defining a custom hook called "useMovie" which accepts an optional "id" parameter.
const useMovie = (id?: string) => {
  //calling the useSWR hook with certain arguments which will return data, error and loading state.
  const { data, error, isLoading } = useSWR(
    //using the spread operator to check if the optional parameter exists, if it does then the url for the data fetch is generated else it's set to null.
    id ? `/api/movies/${id}` : null,
    fetcher,
    //options object which turns off revalidation under certain conditions for performance reasons.
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  //Object is returned with data, error and loading state.
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
