import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const cartItem = useSelector((store) => store.cart.items);
  console.log("cartItem", cartItem);

  return (
    <div className=" max-w-[1200px] mx-auto ">
      <h1 className="font-bold text-3xl my-10 text-center">Cart</h1>
      {cartItem.length === 0 ? (
        <>
          <div className=" flex items-center justify-center mt-10">
            <img
              className="h-64"
              src="https://img.freepik.com/free-vector/woman-with-shopping-cart-vector_1308-129957.jpg?w=740&t=st=1726723431~exp=1726724031~hmac=8043c5c789c857dbddae8308af4a8bbc474fd0c69686e7fad23a534c0404403b"
              alt=""
            />
          </div>
          <div className="text-center justify-center ">
            <p className="text-slate-500 font-bold text-xl mt-4">
              Your cart is empty
            </p>
            <p className="text-slate-500 text-sm font-sans">
              You can go to home page to view more restaurants
            </p>
            <button
              className="uppercase w-72 mt-10 p-4 bg-orange-600 font-bold text-sm text-white"
              onClick={(c) => navigate("/")}
            >
              See Restaurants Near You
            </button>
          </div>
        </>
      ) : (
        <CartItem key={cartItem.id} items={cartItem} />
      )}
    </div>
  );
};

export default Cart;
