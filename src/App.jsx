import React, { useEffect, useState , useRef } from "react";
import Options from "./components/OptionsModal";
import Profile from "./components/ProfileModal";
import CreateBlog from "./components/CreateBlog";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import { fetchBlogsFromFirestore } from "./utils";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const originalBlogs = useRef([]);

  useEffect(() => {
  const fetchBlogs = async () => {
    const blogsData = await fetchBlogsFromFirestore();
    setBlogs(blogsData);
    originalBlogs.current = blogsData;
  };
  fetchBlogs();
}, []);

  const handleSearch = (filteredBlogs) => {
    setBlogs(filteredBlogs?.length ? filteredBlogs : originalBlogs.current);
  };

  return (
    <div className="app-container">
     <Header
      onSearch={handleSearch}
      onOptionClick={() => setIsModalOpen(true)}
      onProfileClick={() => setIsProfileModalOpen(true)}
    />

    <div className="main-content">
      <Options
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />
      <Profile 
        isVisible={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
      <CreateBlog />
      <div className="blogs-container">
        <Blogs blogs={blogs} />
      </div>
    </div>
  </div>
);
}
