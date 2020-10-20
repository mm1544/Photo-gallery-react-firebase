import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  // Hook. setFile - is a f. to update a state. Null is an initial value.
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  //   Will need to check whether selected file is of allowed type. Therefore will have an array of allowed types.
  const types = ["image/png", "image/jpeg"];

  // e - event obj. that we get automatically
  const changeHandler = (e) => {
    // Multiple files could be selected
    // Want save this file in the local peace of state. For this purpose will use useState hook
    let selected = e.target.files[0];
    /*
      Need to ensure that the file is actually selected. If it is selected then 'selected' will evaluate to true.
      Aswell it is checking the type of selected file
    */
    if (selected && types.includes(selected.type)) {
      // File will be stored in LOCAL STATE
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      // Error will be stored in the state
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />

        <span>+</span>
      </label>

      <div className="output">
        {
          // If there is an error, then it will be rendered
          error && <div className="error">{error}</div>
        }
        {
          // If selection is successful
          file && <div>{file.name}</div>
        }
        {
          /*
           Only rendering progress when there is a file selected. Passing 'file' and func. 'setFile' as props.
          */
          file && <ProgressBar file={file} setFile={setFile} />
        }
      </div>
    </form>
  );
};

export default UploadForm;
