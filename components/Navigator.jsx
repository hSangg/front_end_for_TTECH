"use client";
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import {
  RiAccountCircleLine,
  RiContactsLine,
  RiFileList2Line,
  RiHomeLine,
  RiPercentLine,
} from "react-icons/ri";

const Navigator = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (lastest) => {
    const previous = scrollY.getPrevious();

    console.log("lastest:", lastest);
    console.log("previous:", previous);
    if (lastest > previous && lastest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.15, ease: easeInOut }}
      className="md:hidden z-10 fixed bottom-0 left-0 right-0 bg-white p-2 flex justify-around"
    >
      <div className="flex flex-col gap-1 justify-center items-center">
        <RiHomeLine size={30} />
        <div className="text-[1.3rem]">Trang chủ</div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center">
        <RiFileList2Line size={30} />
        <div className="text-[1.3rem]">Danh mục</div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center">
        <RiPercentLine size={30} />
        <div className="text-[1.3rem]">Khuyến mãi</div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center">
        <RiContactsLine size={30} />
        <div className="text-[1.3rem]">Tư vấn</div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center">
        <RiAccountCircleLine size={30} />
        <div className="text-[1.3rem]">Tài khoản</div>
      </div>
    </motion.nav>
  );
};

export default Navigator;
