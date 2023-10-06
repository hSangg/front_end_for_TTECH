"use client";

import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";

const page = () => {
  const { user } = UserAuth();
  console.log(user);

  return (
    <div className="container mx-auto">
      <div className="text-[7rem]  font-[300] uppercase leading-[60px]">
        <div className="w-[100vw]">
          HELLO: <strong className="font-[700]">{user?.displayName}</strong>{" "}
          from <strong className="font-[700]">{user?.email}</strong>
        </div>
      </div>
    </div>
  );
};

export default page;
