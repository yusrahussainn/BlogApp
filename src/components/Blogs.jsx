import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  likeBlog,
  setSelectedBlog,
  clearSelectedBlog,
} from "../redux/blogsSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../style.css";

export default function Blogs({ blogs: externalBlogs }) {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => externalBlogs || state.blogs.list);
  const selectedBlog = useSelector((state) => state.blogs.selected);

  useEffect(() => {
    if (!externalBlogs) dispatch(fetchBlogs());
  }, [dispatch, externalBlogs]);

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog));
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleFavourite = async (blog) => {
    try {
      await addDoc(collection(db, "favourites"), {
        blogId: blog.id,
        title: blog.title,
        author: blog.author,
      });
      alert("Added to Favourites");
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  const handleShare = async (blog) => {
    const email = prompt("Enter email to share with:");
    if (!email || !email.includes("@")) {
      alert("Enter a valid email address.");
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          title: blog.title,
          content: blog.content,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      alert(`Blog titled "${blog.title}" shared with ${email}`);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="blogs-container">
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => dispatch(setSelectedBlog(blog))}
            >
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-author"><strong>Author:</strong> {blog.author}</p>
              <p className="blog-snippet">{blog.content.substring(0, 100)}...</p>
              <hr className="blog-divider" />

              <div className="blog-meta" onClick={(e) => e.stopPropagation()}>
                <button className="icon-btn" onClick={() => handleLike(blog)} title="Like">
                  ♡ {blog.likes || 0}
                </button>
                <button className="icon-btn" onClick={() => handleFavourite(blog)} title="Add to Favourites">
                  ☆
                </button>
                <button className="icon-btn share" onClick={() => handleShare(blog)} title="Share via Email">
                  ⌯⌲
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBlog && (
        <div className="popup-overlay" onClick={() => dispatch(clearSelectedBlog())}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => dispatch(clearSelectedBlog())}>×</button>
            <h2 className="popup-title">{selectedBlog.title}</h2>
            <p className="popup-author"><strong>Author:</strong> {selectedBlog.author}</p>
            <div className="popup-body">{selectedBlog.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}
