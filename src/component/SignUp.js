import React, { useRef, useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    // Validate name input
    const nameRegex = /^[a-zA-Z ]{2,}$/;
    if (!nameValue || !nameRegex.test(nameValue)) {
      setErrorMessage("Please enter a valid name");
      return;
    }

    // Validate email input
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Validate password input
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordValue || !passwordRegex.test(passwordValue)) {
      setErrorMessage(
        "Please enter a password with at least 6 characters, at least one letter, one number and one special character:"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
        })
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            setErrorMessage(error.errorMessage);
          });

        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + errorMessage);
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
        <span className=" p-2 text-xl font-bold  border-b-2 ">Sign Up</span>
        <div className="mt-5">
          <form
            className=" flex flex-wrap items-center justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className=" space-y-3 flex flex-wrap justify-center ">
              <input
                ref={name}
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border"
              />
              <input
                ref={email}
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border"
              />
              <input
                ref={password}
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border"
              />
            </div>
            <p className="text-red-600">{errorMessage}</p>
            {/* <div> */}
            <button
              className=" p-2 text-lg font-medium bg-orange-500 mt-4 rounded-lg w-24 text-center "
              onClick={handleButtonClick}
            >
              SignUp
            </button>
            {/* </div> */}
          </form>

          <p className=" mt-4">
            Already registered?{" "}
            <Link to={"/login"} className="sign-up-link">
              <span className="cursor-pointer hover:text-orange-500 font-semibold">
                {" "}
                Sign In Now.
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
