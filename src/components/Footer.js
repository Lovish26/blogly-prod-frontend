import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagramSquare,
  FaUserAlt,
  FaCalendarAlt,
  FaMobileAlt,
} from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";

const Footer = () => {
  const [posts, setPosts] = useState([]);
  const host = "https://blogly.onrender.com";
  useEffect(() => {
    fetch(`${host}/api/v1/posts`).then((res) => {
      res.json().then((data) => {
        setPosts(data.posts);
      });
    });
  }, []);

  return (
    <>
      <div className="footer-wrapper bg-[#e9e9e9] p-20 flex justify-between">
        <div className="px-3 max-w-[28%]">
          <h2 className="text-[#111] mb-10 text-[14px] font-bold uppercase tracking-[2px]">
            <Link to="/" className="text-[20px] font-extrabold tracking-[3px]">
              Blogly.
            </Link>
          </h2>
          <p className="mb-4">
            Now write your own blogs on any niche topics free of cost and share
            it with your friends!!
          </p>
          <ul className="flex gap-1">
            <li>
              <Link className="footer-links" to="#">
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link className="footer-links" to="#">
                <FaFacebookSquare />
              </Link>
            </li>
            <li>
              <Link className="footer-links" to="#">
                <FaInstagramSquare />
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-3">
          <h2 className="text-[#111] mb-10 text-[14px] font-bold uppercase tracking-[2px]">
            Recent Posts
          </h2>
          {posts &&
            posts.map((post, ind) => {
              if (ind < 3) {
                return (
                  <div className="mb-6 flex gap-5" key={post?._id}>
                    <Link
                      to={`/post/${post._id}`}
                      className="h-[50px] w-[50px] rounded overflow-hidden"
                    >
                      <img
                        className="h-full object-cover object-left "
                        src={post?.imageUrl}
                        alt=""
                      />
                    </Link>
                    <div>
                      <div className="flex gap-3">
                        <p className="flex items-center gap-1 text-[12px]">
                          <span>
                            <FaCalendarAlt />
                          </span>
                          {new Date(post?.createdAt).toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="flex items-center gap-1  text-[12px]">
                          <span>
                            <FaUserAlt />
                          </span>
                          {post?.author?.username}
                        </p>
                      </div>
                      <div>
                        <Link to={`/post/${post._id}`} className="text-[#666]">
                          {post?.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
              return "";
            })}
        </div>
        <div className="px-3">
          <h2 className="text-[#111] mb-10 text-[14px] font-bold uppercase tracking-[2px]">
            Have any Questions?
          </h2>
          <div>
            <ul>
              <li className="flex items-center gap-5 mb-5">
                <span>
                  <SiMinutemailer className="w-[20px] h-[20px] text-[#111]" />
                </span>
                <span className="text-[#444]">
                  {" "}
                  <a href="mailto:larin99050@gpipes.com">
                    larin99050@gpipes.com
                  </a>{" "}
                </span>
              </li>
              <li className="flex items-center gap-5 mb-5">
                <span>
                  <FaMobileAlt className="w-[20px] h-[20px] text-[#111]" />
                </span>
                <span className="text-[#444]">
                  <a href="tel:+447407603569">+447407603569</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-8 bg-[#111] bg-opacity-[0.03] text-[14px]">
        Copyright ©2023 All rights reserved
      </div>
    </>
  );
};

export default Footer;
