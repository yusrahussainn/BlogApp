import React, { useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import "../style.css";

export default function Blogs({ blogs: externalBlogs }) {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    if (!externalBlogs) fetchBlogs();
  }, [externalBlogs]);

  const blogsToShow = externalBlogs || blogs;



  const handleLike = async (blog) => {
    try {
      const blogRef = doc(db, "blogs", blog.id);
      await updateDoc(blogRef, {
        likes: (blog.likes || 0) + 1,
      });
      window.location.reload();
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === blog.id ? { ...b, likes: (b.likes || 0) + 1 } : b
        )
      );
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
      const templateParams = {
        to_email: email,
        title: blog.title,
        content: blog.content,
      };

     await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
);


      alert(`Blog titled "${blog.title}" shared with ${email}`);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  const handleClosePopup = () => setSelectedBlog(null);

  return (
    <div className="blogs-container">
      {blogsToShow.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blogs-grid">
          {blogsToShow.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => setSelectedBlog(blog)}
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
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePopup}>×</button>
            <h2 className="popup-title">{selectedBlog.title}</h2>
            <p className="popup-author"><strong>Author:</strong> {selectedBlog.author}</p>
            <div className="popup-body">{selectedBlog.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}
