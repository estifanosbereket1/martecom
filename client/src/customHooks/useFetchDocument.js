// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/config";
// import { useEffect, useState } from "react";

// const useFetchDocument = (Document, DocumentId) => {
//   const [document, setDocument] = useState("");
//   const fetchDocument = async () => {
//     try {
//       console.log("Fetching document..."); // Log to confirm function call
//       const docRef = doc(db, Document, DocumentId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data()); // Log document data
//         const obj = {
//           id: id,
//           ...docSnap.data(),
//         };
//         setDocument(obj);
//       } else {
//         console.log("No such document!"); // Log if no document found
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error); // Log errors
//     }
//   };
//   useEffect(() => {
//     fetchDocument();
//   }, []);
//   return { document };
// };

// export default useFetchDocument;
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const useFetchDocument = (Document, DocumentId) => {
  const [document, setDocument] = useState(null);

  const fetchDocument = async () => {
    try {
      console.log("Fetching document..."); // Log to confirm function call
      console.log("Document:", Document, "DocumentId:", DocumentId); // Log the Document and DocumentId

      // Ensure Document and DocumentId are strings

      const docRef = doc(db, Document, DocumentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()); // Log document data
        const obj = {
          id: DocumentId, // Use the DocumentId directly
          ...docSnap.data(),
        };
        setDocument(obj);
      } else {
        console.log("No such document!"); // Log if no document found
      }
    } catch (error) {
      console.error("Error fetching document:", error); // Log errors
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [Document, DocumentId]); // Add dependencies to re-fetch when they change

  return { document };
};

export default useFetchDocument;
