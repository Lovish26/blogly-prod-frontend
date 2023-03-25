import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editBtnText, setEditBtnText] = useState("Edit Post");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      files: "",
    },
  });

  const title = watch("title");
  const summary = watch("summary");
  const files = watch("files");
  const content = watch("content");

  useEffect(() => {
    register("content", {
      required: "This field is required",
      minLength: {
        value: 1000,
        message: "Content should be at least 1000 characters",
      },
    });

    const host = "https://blogly.onrender.com";
    fetch(`${host}/api/v1/posts/post/${postId}`).then((res) => {
      res.json().then((data) => {
        setValue("title", data.data.post.title);
        setValue("summary", data.data.post.summary);
        setValue("content", data.data.post.content);
        setLoading(false);
      });
    });
  }, [register, postId, setValue]);

  const editPost = async (registerData) => {
    setEditBtnText("Editing...");
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", postId);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const host = "https://blogly.onrender.com";
    const res = await fetch(`${host}/api/v1/posts`, {
      method: "PUT",
      body: data,
      credentials: "include",
      headers: {
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    });

    if (res.ok) {
      navigate("/post/" + postId);
    } else {
      setEditBtnText("Edit Post");
      toast.error("Something went wrong!", {
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
    <div className="edit-post-wrapper px-20 my-24">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-[24px] text-[#444] font-semibold uppercase text-center mb-5">
            Edit Post
          </h1>
          <form className="create-post-form" onSubmit={handleSubmit(editPost)}>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Title should have minimum 10 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Title can have maximum 50 characters",
                },
              })}
            />
            {errors.title && (
              <span className="top-11">*{errors.title.message}</span>
            )}
            <input
              type="text"
              placeholder="Summary"
              {...register("summary", {
                required: "This field is required",
                minLength: {
                  value: 50,
                  message: "Summary should have minimum 50 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Summary can have maximum 500 characters",
                },
              })}
            />
            {errors.summary && (
              <span className="top-[105px]">*{errors.summary.message}</span>
            )}
            <input type="file" {...register("files")} />
            <div>
              <Editor
                value={content}
                onChange={(newValue) =>
                  setValue("content", newValue, { shouldValidate: true })
                }
              />
              {errors.content && (
                <span className="top-[175px] text-[red] text-[12px] pointer-events-none">
                  *{errors.content.message}
                </span>
              )}
            </div>
            <Link
              to={`/post/${postId}`}
              className="create-post-btn inline-block mr-3"
            >
              Cancel
            </Link>
            <button className="create-post-btn">{editBtnText}</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
