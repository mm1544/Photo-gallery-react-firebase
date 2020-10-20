import React from "react";
import { motion } from "framer-motion";

const Modal = ({ selectedImg, setSelectedImg }) => {
  // To close the Modal when clicked on 'backdrop'
  const handleClick = (e) => {
    // To prevent from closing the Modal when it is clicked on the image itself.
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        // For slide-in effect
        initial={{ y: "-100vh" }}
        // Will bring image to its original position
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
