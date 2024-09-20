import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RestaurantCard from "./RestaurentCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [slider, setSlider] = useState(0);
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // if (restaurant === 0) {
  //   return <Shimmer />;
  // }

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await response.json();
    setRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const prevImage = () => {
    if (restaurant.length - 4 === slider) {
      return false;
    }
    setSlider(slider + 2);
  };
  const nextImage = () => {
    if (restaurant.length + 4 === slider) {
      return false;
    }
    setSlider(slider - 2);
  };

  if (!restaurant.length) {
    return <Shimmer />;
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <div>
        {/* <Shimmer /> */}
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">
            Top restaurant chains in Ahmedabad
          </h1>
          <div className="flex gap-4">
            <div
              className=" bg-gray-400 w-10 h-10 rounded-full justify-center flex items-center cursor-pointer"
              onClick={nextImage}
            >
              <FaArrowLeft />
            </div>
            <div
              className=" bg-gray-400 w-10 h-10 rounded-full justify-center flex items-center cursor-pointer"
              onClick={prevImage}
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div className="flex overflow-x-hidden">
          {restaurant.map((res) => (
            <div
              key={res.info.id}
              className="duration-1000"
              style={{ transform: `translateX(-${slider * 100}% )` }}
            >
              <Link to={`/category/${res.info.id}`}>
                <RestaurantCard resData={res.info} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
