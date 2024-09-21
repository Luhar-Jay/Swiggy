import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import RestaurentCard from "./RestaurentCard";
import { CDN_URL } from "../utils/constant";
import Category from "./Category";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [listOfRestaurent, setListOfRestaurent] = useState([]);
  // const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [suggetions, setSuggetions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchData("");
  }, []);

  const fetchData = async (searchText) => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=23.022505&lng=72.5713621&str=${searchText}`
    );
    const json = await response.json();
    console.log(json?.data?.suggestions);
    setListOfRestaurent(json?.data?.suggestions);
  };
  console.log("listOfRestaurent", listOfRestaurent);

  const handleSearchTextChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (listOfRestaurent && listOfRestaurent.length > 0) {
      const suggested = listOfRestaurent.filter((res) =>
        res.text.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggetions(suggested);
    } else {
      fetchData(searchText);
    }
  };
  return (
    <>
      <div className="max-w-[1250px] mx-auto">
        <div className="justify-center flex mx-auto items-center text-center">
          <input
            type="text"
            data-testid="searchInput"
            placeholder="Search for restaurant and food"
            className="border p-2 border-solid border-black rounded h-9 w-[550px]"
            value={searchText}
            onChange={handleSearchTextChange}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearchTextChange();
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button
            className="px-4 py-2 bg-green-200 m-4 rounded-lg"
            onClick={handleSearchTextChange}
          >
            Search
          </button>

          {showSuggestions && suggetions.length > 0 && (
            <ul className="absolute bg-white top-[150px] left-[455px] border z-10 w-[550px] p-2 ">
              {suggetions.map((s) => (
                <Link to={`/search/${id}`} key={s.text}>
                  <li className="cursor-pointer hover:bg-gray-100">
                    <div className="flex space-x-4 my-2 border-b-2">
                      <img
                        className="w-16 h-16 mb-1 rounded-full"
                        src={CDN_URL + s.cloudinaryId}
                        alt={s.text}
                      />
                      <div>
                        <p>{s.text}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        {/* <div className="search m-4 p-4 flex items-center">
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
    </div> */}
      </div>
      <div className="max-w-[1500px] mx-auto w-8/12">
        <Category />
      </div>
      <div className="flex flex-wrap">
        {/* {filteredRestaurants.map((restaurent, index) => (
      <Link to={`/category/${restaurent.info.id}`} key={restaurent.info.id}>
        {" "}
        <RestaurentCard key={index} resData={restaurent.info} />
      </Link>
    ))} */}

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
    </>
  );
};

export default Search;
