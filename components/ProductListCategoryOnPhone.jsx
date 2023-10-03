import {
  CiLaptop,
  CiHeadphones,
  CiMicrophoneOn,
  CiMonitor,
  CiKeyboard,
  CiMobile1,
  CiDesktopMouse2,
} from "react-icons/ci";

import { motion } from "framer-motion";

const ProductListCategoryOnPhone = () => {
  return (
    <div className="flex flex-col ml-3 gap-5  text-[1.8rem] w-full">
      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiLaptop size={20} />
        </div>
        <span>Laptop</span>
      </motion.div>

      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiMobile1 size={20} />
        </div>
        <span>Điện Thoại</span>
      </motion.div>

      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiHeadphones size={20} />
        </div>
        <span>Tai Nghe</span>
      </motion.div>

      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiMicrophoneOn size={20} />
        </div>
        <span>Micro</span>
      </motion.div>

      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiMonitor size={20} />
        </div>
        <span>Màn hình</span>
      </motion.div>
      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiDesktopMouse2 size={20} />
        </div>
        <span>Chuột</span>
      </motion.div>
      <motion.div whileHover={{ color: "red" }} className="item-category">
        <div>
          <CiKeyboard size={20} />
        </div>
        <span>Bàn phím</span>
      </motion.div>
    </div>
  );
};

export default ProductListCategoryOnPhone;
