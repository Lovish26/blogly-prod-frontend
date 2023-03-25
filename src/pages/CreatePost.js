import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Editor from "../components/Editor";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const [createBtnText, setCreateBtnText] = useState("Create Post");
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

  useEffect(() => {
    register("content", {
      required: "This field is required",
      minLength: {
        value: 1000,
        message: "Content should be at least 1000 characters long",
      },
    });
  }, [register]);
  const content = watch("content");

  const createNewPost = async (registerData) => {
    setCreateBtnText("Creating...");

    const data = new FormData();
    data.set("title", registerData.title);
    data.set("summary", registerData.summary);
    data.set("content", registerData.content);
    data.set("file", registerData.files[0]);

    const host = "https://blogly.onrender.com";
    const res = await fetch(`${host}/api/v1/posts`, {
      method: "POST",
      body: data,
      credentials: "include",
      headers: {
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    });
    const postData = await res.json();
    if (postData.status === "success") {
      navigate("/");
    } else {
      setCreateBtnText("Create Post");
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
    <div className="create-post-wrapper px-20 my-24">
      <h1 className="text-[24px] text-[#444] font-semibold uppercase text-center mb-5">
        Create a Post
      </h1>
      <form className="create-post-form" onSubmit={handleSubmit(createNewPost)}>
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
        <input
          type="file"
          {...register("files", { required: "This field is required" })}
        />
        {errors.files && (
          <span className="top-[150px]">*{errors.files.message}</span>
        )}
        <div>
          <Editor
            name="content"
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
        <Link to="/" className="create-post-btn inline-block mr-3">
          Cancel
        </Link>
        <button className="create-post-btn poin">{createBtnText}</button>
      </form>
    </div>
  );
};

export default CreatePost;
