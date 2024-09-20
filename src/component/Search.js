import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurentCard from "./RestaurentCard";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [listOfRestaurent, setListOfRestaurent] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    // console.log(listOfRestaurent); // Verify state update here
    // setFilteredRestaurants(listOfRestaurent); // Initialize filtered list here
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();
    console.log(json.data);
    setListOfRestaurent(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const handleSearch = () => {
    const filteredRestaurant = listOfRestaurent.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredRestaurant);
  };
  return (
    <div className="max-w-[1250px] mx-auto">
      <div className="justify-center flex mx-auto items-center text-center">
        <input
          type="text"
          data-testid="searchInput"
          placeholder="Search for restaurant and food"
          className="border p-2 border-solid border-black rounded h-9 w-[550px]"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="px-4 py-2 bg-green-200 m-4 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurent.filter(
                (res) => res.info.avgRating > 4.2
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>

      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurent, index) => (
          <Link
            to={"/restaurants/" + restaurent.info.id}
            key={restaurent.info.id}
          >
            {" "}
            <RestaurentCard key={index} resData={restaurent.info} />
          </Link>
        ))}

        {/* {
        filteredRestaurants.length > 0
          ? filteredRestaurants.map((restaurent, index) => (
              <Link
                to={"/restaurants/" + restaurent.info.id}
                key={restaurent.info.id}
              >
                {" "}
                <RestaurentCard key={index} resData={restaurent.info} />
              </Link>
            ))
          :
           listOfRestaurent.map((restaurent) => (
              <div className="duration-1000">
                <Link
                  to={"/restaurants/" + restaurent.info.id}
                  key={restaurent.info.id}
                >
                  <div>
                    <RestaurentCard
                      key={restaurent.info.id}
                      resData={restaurent.info}
                    />
                  </div>
                </Link>
              </div>
            )
            )} */}
      </div>
    </div>
  );
};

export default Search;
