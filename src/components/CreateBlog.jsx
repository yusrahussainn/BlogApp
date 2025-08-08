import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import NewBlog from "./NewBlog";
import Modal from "./Modal";

export default function CreateBlog() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (

    <div className="create-blog-container">
      <button className="create-blog-button" onClick={() => setIsModalVisible(true)}>

        <div className="create-blog-circle">
          <PlusIcon className="plus-icon" />
        </div>

        <span className="create-blog-text">Create Blog</span>

      </button>

      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <NewBlog onClose={() => setIsModalVisible(false)} />
      </Modal>

    </div>
  );
}
