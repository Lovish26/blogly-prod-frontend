import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt, FaEdit, FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Newsletter from "../components/Newsletter";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);
  const { postId } = useParams();
  const [singlePostData, setSinglePostData] = useState(null);

  useEffect(() => {
    const host = "https://blogly.onrender.com";
    fetch(`${host}/api/v1/posts/post/${postId}`).then((res) => {
      res.json().then((data) => {
        setSinglePostData(data.data.post);
        setLoading(false);
      });
    });
  }, [postId]);

  return (
    <div className="mt-[68px]">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <div className="bg-[#111] bg-opacity-[0.03] flex flex-col items-center justify-center h-[300px]">
              <p className="uppercase text-[#919191] text-[12px] mb-[10px] font-medium tracking-[3px] flex gap-5">
                <span>
                  <a className="" href="/">
                    Blog &rarr;
                  </a>
                </span>
                <span>Blog Single &rarr;</span>
              </p>
              <h1 className="sm:text-[80px] text-[56px] text-[#444] font-semibold leading-tight">
                Blog Details
              </h1>
            </div>
            <div className="post-content-wrapper px-20 pt-16 pb-44 flex flex-col items-center last-child:items-end">
              <div className="flex items-center gap-5 mt-4 ml-auto w-full">
                <Link
                  to="/"
                  className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium"
                >
                  <span className="text-[#f4bf2c] text-[14px]">
                    <FaArrowLeft className="mb-1" />
                  </span>
                  Back
                </Link>
                {Cookies.get("userId") === singlePostData?.author?._id ? (
                  <>
                    <Link
                      to={`/edit/${singlePostData?._id}`}
                      className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium"
                    >
                      <span className="text-[#f4bf2c] text-[14px]">
                        <FaEdit className="mb-1" />
                      </span>
                      Edit Post
                    </Link>
                    <button
                      className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium mr-auto"
                      onClick={() => setOpenDeleteDialogBox(true)}
                    >
                      <span className="text-[#f4bf2c] text-[14px]">
                        <MdDelete />
                      </span>
                      Delete Post
                    </button>
                  </>
                ) : (
                  ""
                )}
                <p className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium ml-auto">
                  <span className="text-[#f4bf2c]">
                    <FaUserAlt className="mb-[2px]" />
                  </span>
                  {singlePostData?.author?.username}
                </p>
                <p className="flex items-center gap-2 uppercase text-[12px] tracking-[2px] font-medium">
                  <span className="text-[#f4bf2c]">
                    <FaCalendarAlt className="mb-1" />
                  </span>
                  {new Date(singlePostData?.createdAt).toLocaleString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
              <title className="block text-[#444] font-semibold text-[52px] leading-tight text-center mb-8  mt-16 underline decoration-[#f4bf2c]">
                {singlePostData?.title}
              </title>
              <div className="">
                <div
                  className="content-wrapper"
                  dangerouslySetInnerHTML={{ __html: singlePostData?.content }}
                />
              </div>
            </div>
          </div>

          {/* ***************** */}
          {/*    NEWSLETTER     */}
          {/* ***************** */}
          <Newsletter />

          {/* ***************** */}
          {/*      FOOTER       */}
          {/* ***************** */}

          <Footer />

          {/* ***************** */}
          {/* DELETE POST MODAL */}
          {/* ***************** */}
          {openDeleteDialogBox && (
            <Modal setOpenDeleteDialogBox={setOpenDeleteDialogBox} />
          )}
        </>
      )}
    </div>
  );
};

export default PostPage;
