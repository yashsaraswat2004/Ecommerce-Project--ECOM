import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, registerUser } from "../state/Auth/Action";
// import loader from "./loader.gif"
import { reuleaux } from "ldrs";
// import { Rings } from "react-loader-spinner";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!validate(userData)) {
      setLoading(false);
      return;
    }

    dispatch(registerUser(userData));

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 3000);

    console.log("userData", userData);
  };

  const [errors, setErrors] = useState({});
  const validate = (userData) => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!userData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  reuleaux.register();
  return (
    <>
      <div className="bg-white min-h-screen flex justify-center items-center mt-[40px]">
        <div className="bg-white border h-50 w-96 rounded p-8">
          {loading ? (
            <div className="flex justify-center items-center">
              {/* <img src={loader} alt="Loading..." className="h-16 w-16" /> */}

              <l-reuleaux
                size="40"
                stroke="5"
                stroke-length="0.15"
                bg-opacity="0"
                speed="1.2"
                color="black"
              ></l-reuleaux>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  id="firstName"
                  placeholder="Enter Your First Name:"
                  name="firstName"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  id="lastName"
                  placeholder="Enter Your Last Name:"
                  name="lastName"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  id="email"
                  placeholder="Enter Your Email:"
                  name="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  id="password"
                  placeholder="Enter Your Password:"
                  name="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              >
                Sign Up
              </button>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-500"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
