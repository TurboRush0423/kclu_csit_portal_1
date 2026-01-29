import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function ResourceList({ category }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "resources"),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [category]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">{category} (Latest First)</h3>

      {data.length === 0 && <p>No records yet</p>}

      {data.map((item) => (
        <div key={item.id} className="border p-3 mb-2 rounded">
          <h4 className="font-semibold">{item.title}</h4>
          <p>
            {item.program} – Semester {item.semester}
          </p>
          <a
            href={item.pdfLink}
            target="_blank"
            className="text-blue-600 underline"
          >
            View PDF
          </a>
        </div>
      ))}
    </div>
  );
}
