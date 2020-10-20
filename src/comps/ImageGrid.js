import React from "react";
import useFirestore from "../hooks/useFirestore";
// Will use framer-motion package for animation
import { motion } from "framer-motion";

const ImageGrid = (
  // Destructuring from the props
  { setSelectedImg }
) => {
  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          //By adding 'motion.' to div will make it a 'motion element'
          <motion.div
            className="img-wrap"
            key={doc.id}
            // onClick listener. Will pass url of the image that we want to show.
            onClick={() => setSelectedImg(doc.url)}
            // It is a 'motion' atribute
            whileHover={{ opacity: 1 }}
            // Whenever "img-wrap" class element will change position, it will animate transition.
            layout
          >
            <motion.img
              alt="uploaded img"
              src={doc.url}
              // 'Motion' atribute to fade-in the image
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
