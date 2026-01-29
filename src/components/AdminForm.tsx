import { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function AdminPanel({ defaultCategory }) {
  const [title, setTitle] = useState("");
  const [program, setProgram] = useState("BCA");
  const [semester, setSemester] = useState("1");
  const [category, setCategory] = useState(defaultCategory);
  const [pdfLink, setPdfLink] = useState("");

  // Dynamic semester list
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
        semester,
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
    <div className="bg-white p-5 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {/* Title */}
      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Program */}
      <select
        className="w-full border p-2 mb-3"
        value={program}
        onChange={(e) => {
          setProgram(e.target.value);
          setSemester("1"); // reset semester when program changes
        }}
      >
        <option value="BCA">BCA</option>
        <option value="MCA">MCA</option>
      </select>

      {/* Semester */}
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

      {/* Category */}
      <select
        className="w-full border p-2 mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Syllabus">Syllabus</option>
        <option value="Timetable">Timetable</option>
        <option value="Exam Notice">Exam Notice</option>
        <option value="Previous Year Paper">Previous Year Paper</option>
      </select>

      {/* PDF Link */}
      <input
        className="w-full border p-2 mb-3"
        placeholder="Google Drive PDF Link"
        value={pdfLink}
        onChange={(e) => setPdfLink(e.target.value)}
      />

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}
