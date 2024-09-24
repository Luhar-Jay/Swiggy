import React, { useEffect, useRef, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleButtonClick = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  };

  return (
    <div className="max-w-[1200px] flex justify-center mx-auto  mt-10">
      <div className="p-4 w-80 bg-white shadow-xl bg-opacity-50 justify-center items-center">
        <div className="mb-5">
          <div className=" text-center flex flw justify-center">
            <img src={LOGO_URL} alt="" className="h-28 " />
          </div>
          <div>
            <p className="text-center text-xl text-orange-600 tracking-wider font-bold">
              Swiggy
            </p>
          </div>
        </div>
        <span className=" p-2 text-xl font-bold  border-b-2 ">Sign In</span>
        <div className="mt-5">
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" flex flex-wrap items-center justify-center"
          >
            <div className=" space-y-3 flex flex-wrap justify-center ">
              {/* <label className="w-20">Email:</label> */}
              <input
                ref={email}
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border"
              />
              {/* <label className="w-32 mx-auto">Password:</label> */}
              <input
                ref={password}
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border"
              />
            </div>
            {/* <div> */}
            <p className="text-red-600">{errorMessage}</p>
            <button
              className=" p-2 text-lg font-medium bg-orange-500 mt-4 rounded-lg w-24 text-center "
              onClick={handleButtonClick}
            >
              SignIn
            </button>
            {/* </div> */}
          </form>

          <p style={{ cursor: "pointer" }}>
            New User?{" "}
            <Link to={"/register"} className="sign-up-link">
              <span className="cursor-pointer hover:text-orange-500 font-semibold">
                {" "}
                Sign Up Now.
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
