import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

// Define the props for the InfoModal component
interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

// Define the InfoModal component
const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  // Set up state to track the visibility of the modal
  const [isVisible, setIsVisible] = useState(!!visible);

  // Use the useInfoModal hook to get the movieId from the context
  const { movieId } = useInfoModal();
  // Use the useMovie hook to get the movie data based on the movieId
  const { data = {} } = useMovie(movieId);

  // Update the visibility state when the visible prop changes
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  // Define a function to handle closing the modal
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // If the modal is not visible, return null
  if (!visible) {
    return null;
  }

  // Render the InfoModal component
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md `}
        >
          <div className="relative h-96">
            {/* Render the video player with the movie data */}
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}
            ></video>
            {/* Render the close button */}
            <div
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>

            {/* Render the movie title, play button, and favorite button */}
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          {/* Render the movie details */}
          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.genre}</p>
            <p className="text-white text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the InfoModal component
export default InfoModal;
