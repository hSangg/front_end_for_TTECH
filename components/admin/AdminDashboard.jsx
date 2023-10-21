"use client";
import { CiShoppingBasket, CiUser } from "react-icons/ci";
import AdminRevenueChart from "./AdminRevenueChart";
import CompareRevenue from "./CompareRevenue";
import AdminVisitorChart from "./AdminVisitorChart";

const AdminDashboard = () => {
  return (
    <div className=" h-[150vh] mt-10">
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-2xl">
            <CompareRevenue />
          </div>
          <div className="flex flex-1 gap-4 ">
            <div className=" bg-gradient-to-tl from-blue-300 to-blue-600 rounded-2xl p-5 flex-col justify-center gap-5 flex flex-1 text-white">
              <div>
                <CiUser size={30} />
              </div>
              <div>
                <div className="text-[1.1rem] capitalize leading-8 mb-1">
                  Tổng người dùng
                </div>
                <div className="font-[700] text-[2.5rem]">123 123 234 </div>
              </div>
            </div>
            <div className=" rounded-2xl bg-gradient-to-tr from-blue-300 to-blue-600 p-5 flex-col justify-center gap-5 flex flex-1 text-white">
              <div>
                <CiShoppingBasket size={30} />
              </div>
              <div>
                <div className="text-[1.1rem] capitalize leading-8 mb-1">
                  Tổng đơn hàng
                </div>
                <div className="font-[700] text-[2.5rem]">678 454 234</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/20 w-[60%] flex flex-col  shadow-sm p-10 rounded-3xl">
          <AdminRevenueChart />
        </div>
      </div>
      <div className="w-2/5">
        <AdminVisitorChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
