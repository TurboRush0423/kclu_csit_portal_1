import { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function AdminForm({ program, category }) {
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("1");
  const [pdfLink, setPdfLink] = useState("");

  const isExamNotice = category === "Exam Notice";

  const semesters =
    program === "BCA" ? ["1", "2", "3", "4", "5", "6"] : ["1", "2", "3", "4"];

  const handleSubmit = async () => {
    if (!title || !pdfLink) {
      alert("All fields required");
      return;
    }

    try {
      await addDoc(collection(db, "resources"), {
        title,
        program,
        semester: isExamNotice ? "ALL" : semester,
        category,
        pdfLink,
        createdAt: serverTimestamp(),
      });

      alert("Uploaded successfully");
      setTitle("");
      setPdfLink("");
      setSemester("1");
    } catch (error) {
      console.error(error);
      alert("Error uploading");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow max-w-md">
      <h2 className="text-xl font-bold mb-2">
        Upload {category} – {program}
      </h2>

      {isExamNotice && (
        <p className="text-sm text-gray-500 mb-3">
          This notice will apply to all semesters.
        </p>
      )}

      {/* Title */}
      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Semester (hidden for Exam Notice) */}
      {!isExamNotice && (
        <select
          className="w-full border p-2 mb-3"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      )}

      {/* PDF Link */}
      <input
        className="w-full border p-2 mb-3"
        placeholder="Google Drive PDF Link"
        value={pdfLink}
        onChange={(e) => setPdfLink(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}
