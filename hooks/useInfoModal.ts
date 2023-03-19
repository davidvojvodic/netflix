import { create } from "zustand";

// Define the interface for the modal store
export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

// Create the modal store using Zustand
const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  // Define the openModal function to set the movieId and isOpen to true
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  // Define the closeModal function to set the movieId to undefined and isOpen to false
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

// Export the modal store
export default useInfoModal;
