import caterogyDataExample from "../data";

const ProductListCategoryOnPhone = () => {
  return (
    <div className="flex flex-col ml-3 gap-3 text-[1.8rem] w-full">
      {caterogyDataExample.map((x, i) => (
        <div
          key={i}
          className="text-[2.5rem] font-[600] tracking-[0.007em]	capitalize"
        >
          {x.name}
        </div>
      ))}
    </div>
  );
};

export default ProductListCategoryOnPhone;
