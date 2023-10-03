"use client";
import caterogyDataExample from "@/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import CategoryPhone from "./CategoryPhone";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <>
      <div className="mx-3 mt-3">
        <div className="flex w-full items-center gap-[10px] justify-evenly ">
          <div className="lg:hidden  p-2">
            <CategoryPhone />
          </div>
          <div className="shinks-0">
            <Image src={"/images/1x/Asset1.png"} width={90} height={30} />
          </div>
          <div className="grow-[1]">
            <SearchBar />
          </div>
          <div className="mr-2  p-2 ">
            <CiShoppingCart size={25} />
          </div>
        </div>
        <div className="overflow-x-scroll flex flex-nowrap my-2">
          {caterogyDataExample.map((category, index) => (
            <motion.div
              whileHover={{ color: "red" }}
              key={index}
              className="text-xl mx-2 cursor-pointer whitespace-nowrap	"
            >
              {category.name}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
