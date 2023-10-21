"use client";
import { AnimatePresence, motion } from "framer-motion";

const ProductManagementForm = ({
  currentProductChoose,
  setCurrentProductChoose,
}) => {
  const handleProductValueChange = (e) => {
    const { value, id } = e.target;
    setCurrentProductChoose((pre) => ({ ...pre, [id]: value }));
  };

  return (
    <motion.div
      key={currentProductChoose?.id}
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="flex-1 flex gap-3 w-full"
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="w-44 h-44 bg-blue-300 rounded-[30px] shrink-0"></div>
        <button className="text-center bg-blue-500 text-white text-[1.4rem] font-[600] w-4/5 p-2 rounded-2xl">
          Upload{" "}
        </button>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-[2rem] font-bold w-full"
      >
        {["name", "price"].map((x, i) => (
          <motion.div key={i} className="flex gap-2 w-full">
            <label className="min-w-[60px] text-black/50" htmlFor={x}>
              {x}:
            </label>
            <motion.input
              id={x}
              value={currentProductChoose?.[x]}
              onChange={handleProductValueChange}
              className="outline-none  border-b border-black/20 w-full"
            />
          </motion.div>
        ))}
      </form>
    </motion.div>
  );
};

export default ProductManagementForm;
