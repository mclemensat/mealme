import React from "react";
import LoaderGIF from "@assets/LoadLogo.gif";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full min-h-screen">
      <img src={LoaderGIF} alt="Loading..." />
      <p className="mt-8 text-mada text-2xl dark:text-white text-gray-800">
        <span className="text-atma font-bold">Kitchen</span> is loading...
      </p>
    </div>
  );
}
