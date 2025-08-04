import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  openProfileModal,
  closeProfileModal,
} from "./redux/uiSlice";
import { setBlogs, filterBlogs } from "./redux/blogsSlice";
import Options from "./components/OptionsModal";
import Profile from "./components/ProfileModal";
import CreateBlog from "./components/CreateBlog";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import { fetchBlogsFromFirestore } from "./utils";
import useModal from "./hooks/useModal";

export default function App() {
  const dispatch = useDispatch();
  const modal = useModal();
  const profileModal = useModal();
  const blogs = useSelector((state) => state.blogs.list);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await fetchBlogsFromFirestore();
      dispatch(setBlogs(blogsData));
    };
    fetchBlogs();
  }, [dispatch]);

  const handleSearch = (filteredBlogs) => {
    dispatch(filterBlogs(filteredBlogs));
  };

  return (
    <div className="app-container">
      <Header
        onSearch={handleSearch}
        onOptionClick={modal.open}
        onProfileClick={profileModal.open}
      />

      <div className="main-content">
        <Options
          isVisible={modal.isOpen}
          onClose={modal.close}
          onProfileClick={profileModal.open}
        />
        <Profile
          isVisible={profileModal.isOpen}
          onClose={profileModal.close}
        />
        <CreateBlog />
        <div className="blogs-container">
          <Blogs blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
