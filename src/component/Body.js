import React from "react";
import Category from "./Category";
import RestaurantMenu from "./RestaurantMenu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, email, displayName } = user;
      dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
    } else {
      dispatch(removeUser());
    }
  });
  return (
    <div>
      <Category />
      <RestaurantMenu />
    </div>
  );
};

export default Body;
