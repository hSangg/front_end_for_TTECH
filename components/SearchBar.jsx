"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CiMinimize1, CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setShowSearchPage(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <AnimatePresence>
        {showSearchPage && (
          <motion.div
            initial={{ y: "-100%", scaleY: 0, opacity: 0 }}
            animate={{ y: 0, scaleY: 1, opacity: 1 }}
            exit={{ y: "-100%", scaleY: 0, opacity: 0 }}
            className=" absolute h-[100vh]  inset-0 backdrop-blur-2xl text-black origin-top"
            transition={{ type: "tween" }}
          >
            <div className="absolute z-40 inset-x-0 top-0 bottom-0 md:bottom-[90px] bg-[#efeff1]">
              <motion.div
                whileInView={{ scaleY: [0, 1] }}
                transition={{ delay: 0.1 }}
                className="flex flex-col  mt-[10%] items-center origin-top"
              >
                <div className="flex items-center w-[30%] gap-2 justify-evenly">
                  <motion.form className="flex items-center w-[30%] gap-2 justify-start">
                    <CiSearch size={20} />
                    <motion.input
                      autoFocus
                      placeholder="Tìm Kiếm"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      type="text"
                      className="outline-none bg-[#efeff1] w-full text-[2rem] font-semibold "
                    />
                  </motion.form>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowSearchPage(false)}
                  >
                    <CiMinimize1 size={20} />
                  </motion.div>
                </div>

                <div className="items-center mx-auto flex flex-col justify-start w-[30%]">
                  {["result 1", "result 2", "result 3"].map((x, i) => (
                    <h1 key={i} className="text-black font-[700]">
                      {x}
                    </h1>
                  ))}
                </div>
              </motion.div>
            </div>

            <div
              onClick={() => setShowSearchPage(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-3xl"
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="items-center w-full flex justify-end">
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setShowSearchPage((pre) => !pre);
          }}
        >
          <CiSearch size={22} />
        </motion.div>
      </div>
    </div>
  );
};

export default SearchBar;
