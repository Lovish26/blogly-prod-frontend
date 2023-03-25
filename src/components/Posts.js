import React from "react";
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Posts = ({
  _id,
  title,
  summary,
  imageUrl,
  content,
  createdAt,
  author,
}) => {
  return (
    <>
      <div className="single-post-wrapper flex items-center gap-[40px] ">
        <img
          className="post-img max-w-[720px] h-[550px]"
          src={imageUrl}
          alt="blog-img"
        />

        <div>
          <div className="flex items-center gap-5 mb-4">
            <p className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium ">
              <span className="text-[#f4bf2c]">
                <FaUserAlt />
              </span>
              {author?.username}
            </p>
            <p className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium">
              <span className="text-[#f4bf2c]">
                <FaCalendarAlt />
              </span>
              {new Date(createdAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Link
            to={`/post/${_id}`}
            className="title text-[65px] leading-[1.1] text-[#444] underline transition duration-300 hover:decoration-[#f4bf2c]"
          >
            {title}
          </Link>
          <p className="summary my-6">{summary}</p>
          <Link
            className="text-[#444] text-[13px] font-medium uppercase tracking-[3px]"
            to={`/post/${_id}`}
          >
            Learn More &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default Posts;
