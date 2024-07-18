import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetch = () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, collectionName),

        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const allData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(allData);
          toast.success("Products fetched....");
        } else {
          toast.warn("No products found in the database.");
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return { data, isLoading };
};

export default useFetchCollection;
