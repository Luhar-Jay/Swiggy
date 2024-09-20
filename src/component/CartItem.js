import React from "react";
import { CDN_URL } from "../utils/constant";
import { FaStar } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const CartItem = ({ items }) => {
  console.log("items", items);
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const addToCart = (items) => {
    dispatch(addItem(items));
  };
  const removeCart = (items) => {
    dispatch(removeItem(items));
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between gap-4 my-4 border-b-2 px-4"
        >
          <div className="w-6/12 ">
            <p className="font-bold ">{item.name}</p>
            <p className="flex items-center font-bold ">
              <LiaRupeeSignSolid />

              {(item.price || item.defaultPrice) / 100}
            </p>
            <p className="flex font-bold my-1 text-[14px] items-center gap-1 text-green-800">
              <FaStar /> {item.ratings.aggregatedRating.rating}
            </p>
            <p className=" text-gray-600  font-sans">{item.description}</p>
          </div>
          <div>
            <img
              src={CDN_URL + item.imageId}
              alt={item.name}
              className="h-36 w-36 rounded-lg border "
            />
            {getItemQuantity(item.id) <= 0 ? (
              <button
                className="relative border bottom-5 left-1/4 bg-white rounded-md font-bold text-green-600 mx-auto p-2 w-20 "
                onClick={() => addToCart(item)}
              >
                ADD
              </button>
            ) : (
              <div className="relative w-32 left-2 bg-white bottom-4 p-0 border space-x-4 text-center ">
                <span
                  className="relative cursor-pointer border-r-2 h-full px-4 "
                  onClick={() => removeCart(item)}
                >
                  -
                </span>
                <span className="text-green-600 font-bold ">
                  {getItemQuantity(item.id)}
                </span>
                <span
                  className="relative cursor-pointer px-4 border-l-2 "
                  onClick={() => addToCart(item)}
                >
                  +
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
