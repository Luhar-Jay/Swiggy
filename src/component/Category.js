import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CDN_URL } from "../utils/constant";

const Category = () => {
  const [cateData, setCateData] = useState([]);
  const [slider, setSlider] = useState(0);

  useEffect(() => {
    handleFetchData();
  }, []);
  const handleFetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await response.json();

    setCateData(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );
  };

  const prevImage = () => {
    if (cateData.length - 5 === slider) {
      return false;
    }
    setSlider(slider + 3);
  };
  const nextImage = () => {
    if (cateData.length + 5 === slider) {
      return false;
    }
    setSlider(slider - 3);
  };

  return (
    <div className="max-w-[1200px] mx-auto hidden md:block">
      <div className="flex items-center justify-between mt-4">
        <h1 className="font-bold text-2xl">What's on your mind?</h1>
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
      <div className="flex overflow-x-hidden border-b-2">
        {cateData?.map((category) => (
          <div key={category.id}>
            <div
              className="m-2  justify-between duration-[1500ms] "
              style={{ transform: `translateX(-${slider * 100}% )` }}
            >
              <div className="duration-500 w-[160px]">
                <img src={CDN_URL + category.imageId} alt="" className="h-36" />
                {/* <h3 className="  mx-4 w-full p-2 ">{info?.description}</h3> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
