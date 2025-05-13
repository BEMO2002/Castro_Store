import React from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
import { IoEarthOutline } from "react-icons/io5";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaPinterestP } from "react-icons/fa";
const TopNav = () => {
  return (
    <div className="bg-assent-tertiary ">
      <div className="flex flex-row justify-around space-x-4 items-center  p-4 ">
        <div className="lg:flex hidden flex-row items-center space-x-7">
          <div className="flex flex-row items-center space-x-2">
            <IoMailUnreadOutline size={20} />
            <h2 className="">Castro@gmail.com</h2>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoEarthOutline size={20} />
            <h2> Kleine Pierbard 8-6 2249 KV Vries</h2>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-2 ">
          <LuFacebook
            size={20}
            className="hover:text-primary duration-300 transition-all"
          />
          <FaInstagram
            size={20}
            className="hover:text-primary duration-300 transition-all"
          />
          <CiTwitter
            size={22}
            className="hover:text-primary duration-300 transition-all"
          />
          <FaPinterestP
            size={20}
            className="hover:text-primary duration-300 transition-all"
          />
        </div>
      </div>

      <hr />
    </div>
  );
};

export default TopNav;
