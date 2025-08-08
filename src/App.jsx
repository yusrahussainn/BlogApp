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

export default function App() {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs.filteredList || state.blogs.list);
  const isOptionsModalOpen = useSelector((state) => state.ui.isOptionsModalOpen);
  const isProfileModalOpen = useSelector((state) => state.ui.isProfileModalOpen);

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
        onOptionClick={() => dispatch(openModal())}
        onProfileClick={() => dispatch(openProfileModal())}
      />

      <div className="main-content">
        <Options
          isVisible={isOptionsModalOpen}
          onClose={() => dispatch(closeModal())}
          onProfileClick={() => {
            dispatch(closeModal());
            dispatch(openProfileModal());
          }}
        />

        <Profile
          isVisible={isProfileModalOpen}
          onClose={() => dispatch(closeProfileModal())}
        />

        <CreateBlog />

        <div className="blogs-container">
          <Blogs blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
