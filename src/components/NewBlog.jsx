import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../style.css";
import InputField from "./InputField";

const NewBlog = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      await addDoc(collection(db, "blogs"), {
        title: data.title.trim(),
        content: data.content.trim(),
        author: data.author.trim(),
        likes: 0,
        createdAt: serverTimestamp(),
      });

      reset();
      if (onClose) onClose();
    } catch (error) {
      setSubmitError("Error creating bloh: " + error.message);
    }
  };

  return (
    <div className="new-blog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
        <InputField
          placeholder="Blog Title"
          {...register("title", {
            required: "Title is required",
            validate: (val) => val.trim() !== "" || "Title cannot be empty",
          })}
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}

        <InputField
          placeholder="Author Name"
          {...register("author", {
            required: "Author is required",
            validate: (val) => val.trim() !== "" || "Author cannot be empty",
          })}
        />
        {errors.author && <p className="error-text">{errors.author.message}</p>}

        <textarea
          placeholder="Blog Content"
          rows={10}
          className="blog-textarea"
          {...register("content", {
            required: "Content is required",
            validate: (val) => val.trim() !== "" || "Content cannot be empty",
          })}
        />
        {errors.content && <p className="error-text">{errors.content.message}</p>}

        {submitError && <p className="error-text">{submitError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`blog-submit-btn ${isSubmitting ? "disabled" : ""}`}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
