import React, { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { FaAngleDown, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBagHandle, IoCart } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosHelpBuoy } from "react-icons/io";
import cross from "../component/Images/image.png";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Header = () => {
  const [popUp, setPopUp] = useState(false);
  const [loggedIn, setLogedIn] = useState(true);
  const cartItems = useSelector((store) => store.cart.items);

  const handleLogin = () => {
    setLogedIn(!loggedIn);
  };

  const handlePopUp = () => {
    setPopUp(true);
  };

  const closeToggle = () => {
    setPopUp(false);
  };

  return (
    <>
      <div
        className="black-overlay h-full w-full duration-500 fixed"
        style={{
          opacity: popUp ? 1 : 0,
          visibility: popUp ? "visible" : "hidden",
          zIndex: 1000,
        }}
        onClick={closeToggle}
      >
        {" "}
        <div
          className="w-[400px] h-full absolute bg-white duration-700"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className=" mx-10 my-10 items-center">
            <img
              src={cross}
              alt=""
              className="h-4 cursor-pointer "
              onClick={closeToggle}
            />
            <div className="mt-5">
              <input
                type="text"
                placeholder="Search location"
                className="border w-full p-2 shadow-xl"
              />
            </div>
            <div className="flex flex-wrap items-center mt-10 p-8 border border-gray-400">
              <div className="flex gap-4 items-center w-full ">
                <FaLocationCrosshairs />
                <p>location</p>
              </div>
              <div className="pl-8">
                <p>location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" shadow-xl">
        <div className="flex  justify-between p-4 mx-24">
          <div className="flex items-center gap-4">
            <Link to={"/"}>
              <img src={LOGO_URL} alt="" className="h-12 cursor-pointer" />
            </Link>
            <p
              className="cursor-pointer flex items-center gap-2"
              onClick={handlePopUp}
            >
              <span className="border-b-2 hover:text-orange-600 font-bold border-b-black ">
                Other
              </span>
              Ahmedabad, Gujarat, India
              <FaAngleDown className="hover:text-orange-500" />
            </p>
          </div>

          <div className="flex items-center">
            <ul className="flex gap-10 justify-between">
              <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer">
                <IoBagHandle />
                <p>Swiggy Corporate</p>
              </li>
              <Link to={"/search"}>
                <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer">
                  <FaSearch />
                  Search
                </li>
              </Link>
              <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer">
                <BiSolidOffer />
                Offers
              </li>
              <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer">
                <IoIosHelpBuoy />
                Help
              </li>
              <li
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer"
                onClick={handleLogin}
              >
                <FaUser />
                {loggedIn ? "Sign In " : "Sing Up"}
              </li>
              <Link to={"/cart"}>
                <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer ">
                  <IoCart />
                  Cart
                  {!!cartItems.length && (
                    <span className="w-5 h-5 bg-orange-500 relative flex rounded-full top-[-14px] text-center items-center justify-center right-3 text-white cursor-pointer">
                      {cartItems.length}
                    </span>
                  )}
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
