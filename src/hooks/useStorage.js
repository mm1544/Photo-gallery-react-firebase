//Importing hooks
import { useState, useEffect } from "react";
// Storage SDK
import {
  projectStorage,
  projectFirestore,
  timeStamp,
} from "../firebase/config";

/*
This hook will handle file uploads and it will return useful values (like upload progress, image url after upload and
errors). 
Hooks are reusable, they can be used later on in any other componentys.
*/

const useStorage = (file) => {
  // Upload progree
  const [progress, setProgress] = useState(0);
  //   Upload Errors
  const [error, setError] = useState(null);
  // Image url that will get back from storage after upload. It will be saved in database for later use.
  const [url, setUrl] = useState(null);

  /*
   Takes a func. as a parameter and and second argument are dependancies.
   Func. inside of useEffect will 'fire' every time when dependancie changes.
  */
  useEffect(
    () => {
      //### Logic of file upload ###

      // Creating a reference to a file inside a default Firebase storage bucket. File doesn't exist yet.
      const storageRef = projectStorage.ref(file.name);

      //   Reference to the colection where we want to save the document to.
      const collectionRef = projectFirestore.collection("images");

      /*
       It is ASYNChronous. Will attach a listener to it, which will 'fire' func. when certain event will happen 
       ('state_changed' event).
      */
      storageRef.put(file).on(
        "state_changed",
        /*
        That is the func. we want to fire. "state_changed" event may happen many times during the cycle of the upload, so 
        it will fire this func. several times while image is beying uploaded.
        */
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        // Third argument is also a function. It will handle the error of the upload.
        (err) => {
          setError(err);
        },

        /*
        Fourth argument is a function which will fire when the upload is fully complete. It will be 'async' func. because 
        'await' will be used inside of it.
        This func. will get the url of uploaded image.
        */
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timeStamp();
          collectionRef.add(
            // Passing an object that represents the document
            { url, createdAt }
          );
          setUrl(url);
        }
      );
    },
    //   Dependancie is a 'file'
    [file]
  );

  return { progress, url, error };
};

export default useStorage;
