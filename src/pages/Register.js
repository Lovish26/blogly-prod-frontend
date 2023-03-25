import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [signupBtnText, setSignupBtnText] = useState("Sign up");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      cpassword: "",
    },
  });
  const password = watch("password");

  const handleRegisterForm = async (data) => {
    setSignupBtnText("Signing up...");

    const host = "https://blogly.onrender.com";
    const res = await fetch(`${host}/api/v1/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        passwordConfirm: data.cpassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();

    if (res.ok) {
      Cookies.set("jwt", json.token, {
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      Cookies.set("userId", json.data.user._id, {
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      toast.success("Registeration successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setSignupBtnText("Sign up");
      Cookies.remove("jwt");
      Cookies.remove("userId");
      toast.error("Username already taken!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="register-wrapper bg-yellow mt-[68px] bg-gradient-to-r from-[#f4bf2c] to-[#fef08a] flex flex-row-reverse justify-between ">
        <div className="w-3/5 px-20 pt-20">
          <h1 className=" text-black text-[27px] text-center ">
            Create an account
          </h1>
          <form
            className=" signup-form"
            onSubmit={handleSubmit(handleRegisterForm)}
          >
            <input
              type="text"
              placeholder="Enter username"
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message:
                    "Username needs to be atleast 5 characters (and up to 30 characters)",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Username needs to be atleast 5 characters (and up to 30 characters)",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                  message:
                    "Username can only include [a-z],[A-Z],[0-9],[_],[.] and it must not start/end with [_],[.] ",
                },
              })}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="top-10">*{errors.username.message}</span>
            )}
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message:
                    "Password needs to be atleast 8 characters (and up to 30 characters)",
                },
                maxLength: {
                  value: 30,
                  message:
                    "Password needs to be atleast 8 characters (and up to 30 characters)",
                },
              })}
            />
            {errors.password && (
              <span className="top-[104px]">*{errors.password.message}</span>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              {...register("cpassword", {
                required: "This field is required",
                validate: {
                  match: (v) => v === password || "Password do not match!",
                },
              })}
            />
            {errors.cpassword && (
              <span className="top-[164px]">*{errors.cpassword.message}</span>
            )}
            <button className="signup-btn">{signupBtnText}</button>
          </form>
          <p className="text-[#111] text-[14px]">
            Already a member?{" "}
            <Link className="font-semibold" to="/login">
              Log in
            </Link>{" "}
          </p>
          {errors.username &&
            (errors.username.type === "pattern" ||
              errors.username.type === "minLength" ||
              errors.username.type === "maxLength") && (
              <div
                className="mt-5 flex p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg  "
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Danger</span>
                <div>
                  <span className="font-medium">
                    Ensure that these requirements are met for username:
                  </span>
                  <ul className="mt-1.5 ml-4 list-disc list-inside">
                    <li>At least 5 characters (and up to 30 characters)</li>
                    <li>Should not include any spaces</li>
                    <li>Should only include [a-z], [A-Z], [_], [.] </li>
                    <li>Exclusion of special characters, e.g., ! @ # ?</li>
                    <li>Should not start or end with [_] or [.] </li>
                    <li>[_] & [.] cannot be used together. </li>
                  </ul>
                </div>
              </div>
            )}
        </div>
        <div>
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/5082561/pexels-photo-5082561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Register;
