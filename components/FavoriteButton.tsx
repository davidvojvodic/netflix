// Import required modules, hooks and components.
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

// Define props interface for the FavoriteButton component.
interface FavoriteButtonProps {
  movieId: string;
}

// Define FavoriteButton component with props.
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  // Call useFavorites hook to access favorites data and mutation function.
  const { mutate: mutateFavorites } = useFavorites();

  // Call useCurrentUser hook to access current user data and mutation function.
  const { data: currentUser, mutate } = useCurrentUser();

  // Check if current movie is already in the User's favorite list.
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  // Callback function to toggle the favorite of the current movie.
  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Update current user's favoriteIds.
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    // Reload favorites data.
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  // Set Icon component based on whether the movie is already favorited or not.
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  // Render button with Icon and onClick action to toggle favorites.
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

// Export FavoriteButton component as default export.
export default FavoriteButton;
