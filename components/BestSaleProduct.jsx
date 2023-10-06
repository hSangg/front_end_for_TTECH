import { saleProductList } from "@/data";
import Image from "next/image";

const BestSaleProduct = () => {
  return (
    <div className="w-full bg-slate-500/20 rounded-[25px] mt-4">
      <div className="overflow-x-scroll flex flex-nowrap gap-2">
        {saleProductList.map((item, index) => (
          <div
            className="w-[260.115606936px] h-[100px] relative shrink-0"
            key={index}
          >
            <Image
              src={item.imageRef}
              alt="banner"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSaleProduct;
