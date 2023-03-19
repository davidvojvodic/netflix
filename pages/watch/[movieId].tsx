// Importing required dependencies
import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

// Defining a functional component named Watch
const Watch = () => {
  // Getting the router instance
  const router = useRouter();
  // Using router to get the movieId from the URL query string
  const { movieId } = router.query;

  // Fetching movie details associated with given movieId using a custom hook named useMovie
  const { data } = useMovie(movieId as string);

  // Rendering the video viewer
  return (
    <div className="h-screen w-screen bg-black">
      {/* Navigation bar */}
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      {/* Video player, auto play attribute is set to true */}
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
