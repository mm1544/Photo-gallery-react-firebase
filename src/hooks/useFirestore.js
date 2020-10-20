import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  /*
    Comunication with the database will be inside useEffect hook, because it will re-run whenever the colection changes.
    */
  useEffect(() => {
    /*
        Uses 'projectFirestore' in order to reach in to the collection AND then LISTEN for the documents inside the 
        collection.
        'unsub' after invocation, will return a function, which will be used to unsubscribe from the 'collection' (when we no 
        longer want to be listening to this collection. We will invoke 'unsub' when will UNMOUNT 'ImageGrid' component)
        */
    const unsub = projectFirestore
      .collection(collection)
      // Ordering the documents of collection
      .orderBy("createdAt", "desc")

      /*
        Will fire a callback func. every time the change occures inside the collection (fires initially as well). It takes in 
        a snapchot obj. This snapchot object represents a snapshot of the database collection at that moment.
      */
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          // Push the data to the 'documents' array
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    //   Returns a 'clean-up' func. It will unsubscribe from the collection
    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;