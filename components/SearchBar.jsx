"use client";

import { useRef } from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = () => {
  const clickPoint = useRef();
  const handleFocus = () => {
    clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    clickPoint.current.style.display = "block";
  };

  return (
    <div className="items-center w-full flex justify-center">
      <div className="relative mr-3 w-full">
        <div
          className="absolute top-1/2 -translate-y-1/2 ml-3 items-center"
          ref={clickPoint}
        >
          <RiSearch2Line size={22} />
        </div>
        <input
          type="text"
          className="block text-[1.5rem] p-2 pl-16 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
          placeholder="Search Here..."
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default SearchBar;
