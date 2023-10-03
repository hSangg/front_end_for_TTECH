"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CiMinimize1, CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  return (
    <div>
      <AnimatePresence>
        {showSearchPage && (
          <motion.div
            initial={{ y: "-100%", scaleY: 0, opacity: 0 }}
            animate={{ y: 0, scaleY: 1, opacity: 1 }}
            exit={{ y: "-100%", scaleY: 0, opacity: 0 }}
            className="fixed inset-0 z-30 bg-white text-black origin-top"
            transition={{ type: "tween" }}
          >
            <motion.div
              whileInView={{ scaleY: [0, 1] }}
              transition={{ delay: 0.1 }}
              className="flex justify-evenly mt-[10%] items-center origin-top"
            >
              <motion.form className="flex items-center gap-2 justify-start">
                <CiSearch size={20} />
                <motion.input
                  placeholder="Tìm Kiếm"
                  type="text"
                  className="outline-none text-[2rem] font-semibold "
                />
              </motion.form>
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowSearchPage(false)}
              >
                <CiMinimize1 size={20} />
              </motion.div>
            </motion.div>
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
