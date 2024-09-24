import React, { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { FaAngleDown, FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoBagHandle, IoCart } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosHelpBuoy } from "react-icons/io";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
  const [popUp, setPopUp] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // Handle error.
      });
  };

  const handlePopUp = () => {
    setPopUp(true);
  };

  const closeToggle = () => {
    setPopUp(false);
  };

  return (
    <>
      {/* Popup */}
      <div
        className="black-overlay h-full w-full fixed transition-opacity duration-500"
        style={{
          opacity: popUp ? 1 : 0,
          visibility: popUp ? "visible" : "hidden",
          zIndex: 1000,
        }}
        onClick={closeToggle}
      >
        <div
          className="w-full sm:w-[400px] h-full absolute bg-white transition-transform duration-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-10 my-10 items-center">
            <RxCross2
              className="h-8 w-5 cursor-pointer"
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
              <div className="flex gap-4 items-center w-full">
                <FaLocationCrosshairs />
                <p>Location</p>
              </div>
              <div className="pl-8">
                <p>Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="shadow-xl bg-white">
        <div className="flex justify-between p-4 mx-4 lg:mx-24">
          {/* Left Section */}
          <div className=" md:flex items-center gap-4">
            <div className="flex">
              <Link to="/">
                <img
                  src={LOGO_URL}
                  alt="Logo"
                  className="h-10 lg:h-12 cursor-pointer"
                />
              </Link>
              <span className="sm:border-b-2 hover:text-orange-600 font-bold sm:border-b-black border-hidden flex items-center">
                Other
              </span>
            </div>
            <div>
              <p
                className="cursor-pointer flex items-center gap-2"
                onClick={handlePopUp}
              >
                Ahmedabad, Gujarat, India
                <FaAngleDown className="hover:text-orange-500" />
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center">
            <ul className="flex gap-6 xl:gap-10">
              <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer">
                <IoBagHandle />
                <p>Swiggy Corporate</p>
              </li>
              <Link to="/search">
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
              <Link to="/login">
                <li
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer"
                  onClick={handleLogin}
                >
                  <FaUser />
                  {user ? "Signout" : <p>Sign In</p>}
                </li>
              </Link>
              <Link to="/cart">
                <li className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium cursor-pointer relative">
                  <IoCart />
                  Cart
                  {!!cartItems.length && (
                    <span className="w-5 h-5 bg-orange-500 flex rounded-full absolute top-[-10px] right-[-10px] text-center items-center justify-center text-white">
                      {cartItems.length}
                    </span>
                  )}
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden flex justify-between p-4">
          <Link to="/search">
            <FaSearch className="text-gray-600 hover:text-orange-500 text-lg" />
          </Link>
          <Link to="/cart">
            <IoCart className="text-gray-600 hover:text-orange-500 text-lg relative">
              {!!cartItems.length && (
                <span className="w-4 h-4 bg-orange-500 flex rounded-full absolute top-[-10px] right-[-10px] text-xs text-center items-center justify-center text-white">
                  {cartItems.length}
                </span>
              )}
            </IoCart>
          </Link>
          <Link to="/login">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                <FaUser className="mr-2" />
                {user ? "Logout" : "Sign In"}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
