import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import ListItem from "./ListItem";

const RestaurantCategory = ({ data }) => {
  const [show, setShow] = useState(true);
  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className="my-4">
      <div className="items-center p-4 shadow-xl rounded-lg bg-white">
        <div
          className="flex justify-between items-center font-bold py-2 cursor-pointer"
          onClick={handleToggle}
        >
          <span className="text-lg sm:text-xl">
            {data.title} ({data.itemCards.length})
          </span>
          <span
            className={`transform ${
              show ? "rotate-180" : "rotate-0"
            } transition-transform duration-300`}
          >
            <FaAngleDown />
          </span>
        </div>
        {/* Render ListItems only if 'show' is true */}
        {show && <ListItem items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
