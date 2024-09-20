import React, { useEffect, useState } from "react";
import { MENU_API } from "../utils/constant";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    handleSubcategory();
  }, [id]);
  const handleSubcategory = async () => {
    const response = await fetch(MENU_API + id);
    const json = await response.json();
    setSubCategories(json.data);
  };
  const { name } = subCategories?.cards?.[2]?.card?.card?.info || {};

  const categoryTyped =
    subCategories?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  if (subCategories.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="max-w-[1200px] m-auto my-10">
      <h1 className="font-bold text-3xl text-center "> {name}</h1>
      <div className="mt-16">
        {categoryTyped &&
          categoryTyped.map((item) => (
            <RestaurantCategory
              key={item?.card?.card?.title}
              data={item?.card?.card}
            />
          ))}
      </div>
    </div>
  );
};

export default SubCategories;
