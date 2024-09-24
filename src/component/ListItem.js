import { CDN_URL } from "../utils/constant";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ListItem = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const addToCart = (item) => {
    dispatch(addItem(item));
  };

  const removeCart = (item) => {
    dispatch(removeItem(item));
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="p-4">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex flex-col md:flex-row justify-between gap-4 my-4 border-b-2 pb-4 px-2 md:px-4"
        >
          <div className="w-full md:w-6/12">
            <p className="font-bold text-lg">{item.card.info.name}</p>
            <p className="flex items-center font-bold text-xl">
              <LiaRupeeSignSolid className="text-xl" />
              {(
                (item.card.info.price || item.card.info.defaultPrice) / 100
              ).toFixed(2)}
            </p>
            <p className="flex font-bold my-1 text-[14px] items-center gap-1 text-green-800">
              <FaStar /> {item.card.info.ratings.aggregatedRating.rating}
            </p>
            <p className="text-gray-600 font-sans">
              {item.card.info.description}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="h-36 w-36 rounded-lg border mb-2"
            />
            {getItemQuantity(item.card.info.id) <= 0 ? (
              <button
                className="bg-white border rounded-md font-bold text-green-600 py-2 w-20"
                onClick={() => addToCart(item.card.info)}
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center bg-white border rounded-md p-1 space-x-2">
                <span
                  className="cursor-pointer border-r-2 px-4"
                  onClick={() => removeCart(item.card.info)}
                >
                  -
                </span>
                <span className="text-green-600 font-bold">
                  {getItemQuantity(item.card.info.id)}
                </span>
                <span
                  className="cursor-pointer border-l-2 px-4"
                  onClick={() => addToCart(item.card.info)}
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

export default ListItem;
