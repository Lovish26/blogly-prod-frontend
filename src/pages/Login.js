import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginBtnText, setLoginBtnText] = useState("Log in");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleFormLogin = async (data) => {
    setLoginBtnText("Logging in...");

    const host = "https://blogly.onrender.com";
    const res = await fetch(`${host}/api/v1/users/login`, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
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
      toast.success("Logged in successfully!", {
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
      setLoginBtnText("Log in");
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Cookies.remove("jwt");
      Cookies.remove("userId");
    }
  };

  return (
    <>
      <div className="login-wrapper bg-yellow mt-[68px]  bg-gradient-to-r from-[#fef08a] to-[#f4bf2c]  flex justify-between">
        <div className="w-3/5 px-20 pt-40">
          <h1 className=" text-black text-[27px] text-center ">
            Log in to your account
          </h1>
          <form
            action=""
            className=" login-form"
            onSubmit={handleSubmit(handleFormLogin)}
          >
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "This field is required",
              })}
            />
            {errors.username && (
              <span className="top-10">*{errors.username.message}</span>
            )}
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors.password && (
              <span className="top-[104px]">*{errors.password.message}</span>
            )}

            <button className="login-btn">{loginBtnText}</button>
          </form>
          <p className="text-[#111] text-[14px]">
            Not a member?{" "}
            <Link className="font-semibold" to="/register">
              Create an account
            </Link>{" "}
          </p>
        </div>
        <div>
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/5082561/pexels-photo-5082561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="login-img"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
