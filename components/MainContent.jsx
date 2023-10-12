"use client";

import { useEffect, useState } from "react";
import BestSaleProduct from "./BestSaleProduct";
import FakePage from "./FakePage";
import ImageSlide from "./ImageSlide";
import ProductListAbs from "./ProductListAbs";

const MainContent = () => {
  const [imageSlideHeight, setImageSlideHeight] = useState("auto");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        const imageSlideElement = document.querySelector(".image-slide");
        if (imageSlideElement) {
          const height = imageSlideElement.offsetHeight;
          console.log(height);
          setImageSlideHeight(height);
        }
      } else {
        setImageSlideHeight("auto");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      <div className="m-2 ">
        <div className="md:flex gap-5">
          <div className="md:flex-1">
            <ImageSlide />
          </div>
          <BestSaleProduct height={imageSlideHeight} />
        </div>
        <ProductListAbs />
        <FakePage />
      </div>
    </div>
  );
};

export default MainContent;
