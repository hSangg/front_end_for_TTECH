import { saleProductList } from "@/data";
import Image from "next/image";

const BestSaleProduct = () => {
  return (
    <div className="w-full bg-slate-500/20  md:w-[260.115606936px] md:max-h-[500px] rounded-[25px] mt-4">
      <div className="flex overflow-scroll flex-nowrap  md:flex-col gap-6">
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
