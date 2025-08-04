import React, { useState } from "react";
import { db } from "/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../style.css";
import InputField from "./InputField";
import { isEmptyOrWhitespace } from "../utils";

const NewBlog = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if ([title, content, author].some(isEmptyOrWhitespace)) {
      setError("All fields must be filled properly.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        author,
        likes: 0,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setContent("");
      setAuthor("");
      if (onClose) onClose();
    } catch (error) {
      setError("Error creating blog: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="new-blog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <InputField
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="blog-textarea"
        />
        {error && <p className="error-text">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`blog-submit-btn ${loading ? "disabled" : ""}`}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
