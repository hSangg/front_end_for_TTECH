"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { RiMenuFill, RiShoppingCartLine, RiCloseFill } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
const Header = () => {
  const [showCategory, setShowCategory] = useState(false);
  return (
    <>
      <div className="mx-3 mt-3">
        <div className="flex w-full items-center gap-[10px] justify-evenly ">
          <div className="lg:hidden" onClick={() => setShowCategory(true)}>
            <RiMenuFill size={25} />
          </div>
          <div>
            <Image src={"/images/1x/Asset1.png"} width={70} height={20} />
          </div>
          <div className="grow-[1]">
            <SearchBar />
          </div>
          <div>
            <RiShoppingCartLine size={25} />
          </div>
        </div>
        <div>category</div>
      </div>

      <AnimatePresence>
        {showCategory && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-white"
          >
            <div className="text-white flex justify-between ">
              <h1 className="text-[2.5rem] font-semibold bg-blue-900 py-2 rounded-br-3xl grow-[1]">
                <span className="ml-3 uppercase">Doanh mục hàng hóa</span>
              </h1>
              <div
                className="cursor-pointer rounded-tl-2xl bg-white flex justify-center items-center px-2"
                onClick={() => setShowCategory(false)}
              >
                <RiCloseFill size={30} color="black" />
              </div>
            </div>
            <div className="text-black text-[2rem] uppercase">
              {["laptop", "tai nghe", "điện thoại", "RAM"].map((x, index) => {
                return (
                  <motion.div
                    whileHover={{ color: "#2563eb" }}
                    className="cursor-pointer"
                    key={index}
                  >
                    <span className="ml-3">{x}</span> <hr></hr>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
