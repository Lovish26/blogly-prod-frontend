import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [openNavbar, setOpenNavbar] = useState(false);
  const handleLogout = async () => {
    setOpenNavbar(false);
    Cookies.remove("jwt");
    Cookies.remove("userId");
    navigate("/");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="navbar-wrapper bg-white py-4 px-20 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link
        className=" uppercase text-[#111] text-[20px] font-extrabold tracking-[3px]"
        to="/"
      >
        Blogly.
      </Link>
      {Cookies.get("jwt") ? (
        <div className="nav-links flex items-center gap-8">
          <Link
            className="uppercase text-[11px] font-medium tracking-[3px]  hover:text-[#111]"
            to="/create"
          >
            Create new post
          </Link>
          <Link
            className="uppercase text-[11px] font-medium tracking-[3px]  hover:text-[#111]"
            to="/"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="nav-links flex items-center gap-8">
          <Link
            className="uppercase text-[11px] font-medium tracking-[3px]  hover:text-[#111]"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="uppercase text-[11px] font-medium tracking-[3px] hover:text-[#111]"
            to="/register"
          >
            Register
          </Link>
        </div>
      )}
      <button className="small-screen-btn" onClick={() => setOpenNavbar(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {openNavbar && (
        <div className="w-full fixed top-0 bottom-0 right-0  bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm">
          {Cookies.get("jwt") ? (
            <div className="flex flex-col gap-5 p-10 pt-16 z-[999]">
              <Link
                className="uppercase text-white  font-medium tracking-[3px]  "
                to="/create"
                onClick={() => setOpenNavbar(false)}
              >
                Create new post
              </Link>
              <Link
                className="uppercase text-white font-medium tracking-[3px]  "
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5 p-10 pt-16 z-[999]">
              <Link
                className="uppercase text-white  font-medium tracking-[3px]  "
                to="/login"
                onClick={() => setOpenNavbar(false)}
              >
                Login
              </Link>
              <Link
                className="uppercase text-white  font-medium tracking-[3px]  "
                to="/register"
                onClick={() => setOpenNavbar(false)}
              >
                Register
              </Link>
            </div>
          )}
          <div
            className="absolute top-5 right-5 text-white cursor-pointer "
            onClick={() => setOpenNavbar(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
