import { CDN_URL } from "../utils/constant";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ListItem = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

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
      <div className="">
        {items.map((item) => (
          <div
            key={item.card.info.id}
            className="flex justify-between gap-4 my-4 border-b-2 px-4"
          >
            <div className="w-6/12 ">
              <p className="font-bold ">{item.card.info.name}</p>
              <p className="flex items-center font-bold ">
                <LiaRupeeSignSolid />
                {(item.card.info.price || item.card.info.defaultPrice) / 100}
              </p>
              <p className="flex font-bold my-1 text-[14px] items-center gap-1 text-green-800">
                <FaStar /> {item.card.info.ratings.aggregatedRating.rating}
              </p>
              <p className=" text-gray-600  font-sans">
                {item.card.info.description}
              </p>
            </div>
            <div>
              <img
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
                className="h-36 w-36 rounded-lg border "
              />
              {getItemQuantity(item.card.info.id) <= 0 ? (
                <button
                  className="relative border bottom-5 left-1/4 bg-white rounded-md font-bold text-green-600 mx-auto p-2 w-20 "
                  onClick={() => addToCart(item.card.info)}
                >
                  ADD
                </button>
              ) : (
                <div className="relative w-32 left-2 bg-white bottom-4 p-0 border space-x-4 text-center ">
                  <span
                    className="relative cursor-pointer border-r-2 h-full px-4"
                    onClick={() => removeCart(item.card.info)}
                  >
                    -
                  </span>
                  <span className="text-green-600 font-bold">
                    {getItemQuantity(item.card.info.id)}
                  </span>

                  <span
                    className="relative cursor-pointer px-4 border-l-2 "
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
    </div>
  );
};

export default ListItem;
