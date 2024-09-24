import { CiStar } from "react-icons/ci";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData;

  return (
    <div
      data-testid="resCard"
      className="m-4 p-4 w-[200px] sm:w-[250px] h-[370px] rounded-lg overflow-hidden border hover:border-red-600 hover:scale-95 transition-transform duration-300"
    >
      <div className="relative object-cover">
        <img
          className="rounded-lg relative object-cover w-full h-52 opacity-80 shadow-xl"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
        <div
          className="absolute top-[185px] w-full font-bold rounded-b-lg text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, #fff, #000)",
            backgroundOpacity: 0.5,
          }}
        >
          {costForTwo} FOR TWO
        </div>
      </div>
      <h3 className="font-bold pt-5 text-lg ">{name}</h3>
      <div className="flex items-center">
        <span className="mr-1">
          <CiStar className="rounded-full bg-yellow-500" />
        </span>
        <h4>{avgRating}</h4>
        <span className="mx-1 font-bold text-2xl">·</span>
        <h4>{sla?.slaString}</h4>
      </div>
      <h4 className="text-sm text-gray-500">{cuisines.join(", ")}</h4>
    </div>
  );
};

export default RestaurantCard;
