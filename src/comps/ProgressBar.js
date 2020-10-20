import React, { useEffect } from "react";
// Custom hook
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

// Will use 'useStorage' hook to upload the file
const ProgressBar = (
  // Destructuring passed-in props
  { file, setFile }
) => {
  const { url, progress } = useStorage(file);

  /*
   We know that file is uploaded when we will get a url value.
   Will use useEffect to fire a function when the value of url changes.
*/
  useEffect(() => {
    //   If url value is valid (not null or undefined)
    if (url) {
      // Then the progress-bar will not show anymore.
      setFile(null); //???!!! 'setFile' as second argument
    }
  }, [url]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      // Will animate to whatever the progress value is
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
