import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ResourceList({ program, category }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!program || !category) return;

    // IMPORTANT:
    // orderBy is intentionally removed to avoid Firestore index issues
    const q = query(
      collection(db, "resources"),
      where("program", "==", program),
      where("category", "==", category),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Manual sorting by createdAt (latest first)
      data.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.seconds - a.createdAt.seconds;
      });

      setResources(data);
    });

    return () => unsub();
  }, [program, category]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await deleteDoc(doc(db, "resources", id));
  };

  return (
    <div className="mt-8 bg-white p-5 rounded shadow">
      <h3 className="text-lg font-bold mb-4">
        {category} – {program}
      </h3>

      {resources.length === 0 && (
        <p className="text-gray-500">No data uploaded yet.</p>
      )}

      {resources.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-600">
              {item.semester === "ALL"
                ? "All Semesters"
                : `Semester ${item.semester}`}
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View
            </a>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
