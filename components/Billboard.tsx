import React, { useCallback } from "react"; // import the React library from node_modules
import useBillboard from "@/hooks/useBillboard"; // import a custom hook called `useBillboard` from an alias path (`@/../src/`)
import { AiOutlineInfoCircle } from "react-icons/ai"; // import an icon component from the 'react-icons/ai' library
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

/* 
  This is a functional component called 'Billboard'.
  It retrieves data using the custom hook 'useBillboard' and renders a responsive video billboard with its title, description and a 'More Info' button (which currently doesn't do anything).
*/
const Billboard = () => {
  const { data } = useBillboard(); // retrieve `data` from the API using the `useBillboard` custom hook
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      {/* container with a relative positioning and a height of 56.25% of its width (for responsive video size) */}
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]" // full width, same height ratio as parent and 60% brightness filter on the video
        autoPlay // enable autoplay for the video
        muted // mute the video by default
        loop // make the video loop continuously
        poster={data?.thumbnailUrl} // use the thumbnail image of the video as a placeholder until the video starts playing
        src={data?.videoUrl} // source url of the video to load
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        {" "}
        {/* container for texts, positioned absolutely in the parent with top-margin which varies on diferente device sizes */}
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}{" "}
          {/* display the title of the video from the API in white color, bold font and shadow effect */}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}{" "}
          {/* display the description of the video from the API below the title, in white color and shadow effect */}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {" "}
          <PlayButton movieId={data?.id} />
          {/* container for the More Info button with spacing between its children */}
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            {" "}
            {/* stylized button to show more information about the video */}
            <AiOutlineInfoCircle className="mr-1" />{" "}
            {/* Icon for the 'More Info' button */}
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard; // export the Billboard component to be used in other parts of the application
