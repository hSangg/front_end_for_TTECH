"use client";

import { imageSlideList } from "@/data";
import Image from "next/image";
import { useEffect, useState } from "react";
const ImageSlide = () => {
  const [current, setCurrent] = useState(0);

  const length = imageSlideList.length;
  const array_list_number = [];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent === length - 1 ? 0 : prevCurrent + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [length]);
  for (let index = 0; index < imageSlideList.length; index++) {
    array_list_number.push(index + 1);
  }

  if (!Array.isArray(imageSlideList) || length <= 0) {
    return null;
  }

  return (
    <div className="flex items-center relative">
      <div className="flex-grow overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {imageSlideList.map((image, index) => (
            <div key={index} className="flex-none w-full">
              <Image
                src={"/images/image_slide/" + image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", objectFit: "contain" }} // optional
              />
            </div>
          ))}
        </div>
        {/* <div className="absolute inset-x-0 bottom-3 z-10 gap-3 flex justify-center font-bold">
          {array_list_number.map((x, i) => (
            <span
              className="block text-white backdrop-blur-lg cursor-pointer px-4 py-1 bg-slate-200/25 rounded-full"
              key={i}
              onClick={() => setCurrent(i)}
            ></span>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ImageSlide;
