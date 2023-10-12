"use client";
import { convertToVND, getCurrentDate } from "@/utils/until";
import { useEffect, useState } from "react";
import { CiBookmark, CiChat1 } from "react-icons/ci";

export default function Page({ params }) {
  const [product, setProduct] = useState({
    id: 1,
    name: "AirPods Max",
    category: "tai nghe",
    price: 10_000_000,
  });

  useEffect(() => {
    //fetch product following id
  }, []);

  return (
    <div className="container mx-auto pb-[100px]">
      <div className="mx-auto w-4/5">
        <div className="text-[1.9rem] capitalize font-[600] cursor-pointer">
          {product.category}
        </div>
        <hr className="bg-black/10 h-[2px]"></hr>
        <div>
          <div className="title mt-2">{product.name}</div>
          <div className="text-[1.6rem]">{convertToVND(product.price)}</div>
          <div className="my-24">
            <span className="text-[1.4rem]">Giao hàng ngay trong hôm nay </span>{" "}
            <br></br>
            <span className="text-[1.5rem] font-semibold">
              {getCurrentDate("/")} - Miễn phí
            </span>
          </div>
          <div>
            <div className="my-24">
              <button className="w-full p-2 rounded-xl text-white text-[1.7rem] bg-blue-500 flex items-center justify-center">
                Đặt hàng ngay
              </button>
            </div>
            <div className="my-24">
              <div className="text-[1.5rem] font-semibold">
                Đang phân vân ra quyết định
              </div>

              <div className="text-[1.3rem]">
                Lưu vào danh sách một cách dễ dàng và quay lại xem sau đó
              </div>

              <div className="flex gap-2  text-blue-500 items-center">
                <CiBookmark size={20} />
                <span className=" text-[1.4rem] underline cursor-pointer">
                  lưu vào danh sách xem sau
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[1.5rem]">
          <CiChat1 size={20} />
          Chat ngay với hệ thống, hoặc liên hệ hotline 09009090
        </div>
      </div>
    </div>
  );
}
