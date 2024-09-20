import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import ListItem from "./ListItem";
import { BiHandicap } from "react-icons/bi";

const RestaurantCategory = ({ data }) => {
  const [show, setShow] = useState(true);
  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="  items-center    my-4 p-2 shadow-xl ">
        <div
          className="flex justify-between font-bold py-4 cursor-pointer"
          onClick={handleToggle}
        >
          <span>
            {data.title} ({data.itemCards.length})
          </span>
          <span>
            <FaAngleDown />
          </span>
        </div>
        {show && <ListItem items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
