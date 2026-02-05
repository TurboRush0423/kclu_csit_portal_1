import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function StudentView() {
  const [program, setProgram] = useState("BCA");
  const [semester, setSemester] = useState("1");
  const [category, setCategory] = useState("Syllabus");
  const [data, setData] = useState([]);
  const [time, setTime] = useState(new Date());

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Greeting
  const hours = time.getHours();
  const greeting =
    hours < 12
      ? "Good Morning ☀️"
      : hours < 17
        ? "Good Afternoon 🌤"
        : hours < 21
          ? "Good Evening 🌇"
          : "Good Night 🌙";

  const semesters =
    program === "BCA" ? ["1", "2", "3", "4", "5", "6"] : ["1", "2", "3", "4"];

  const fetchData = async () => {
    const q =
      category === "Exam Notice"
        ? query(
            collection(db, "resources"),
            where("program", "==", program),
            where("category", "==", category),
          )
        : query(
            collection(db, "resources"),
            where("program", "==", program),
            where("semester", "==", semester),
            where("category", "==", category),
          );

    const snapshot = await getDocs(q);
    setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchData();
  }, [program, semester, category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 text-center">
        <h1 className="text-2xl font-bold">
          Khwaja Moinuddin Chishti Language University
        </h1>
        <p className="text-gray-600">Department of CS & IT</p>

        <h2 className="text-xl mt-4 font-semibold">Hello Students 👋</h2>
        <p className="text-lg text-blue-600">{greeting}</p>

        <p className="mt-2 text-gray-700">
          {time.toLocaleTimeString()} <br />
          {time.toLocaleDateString()}
        </p>
      </div>

      {/* PROGRAM SELECT */}
      <div className="flex justify-center gap-4 mb-4">
        {["BCA", "MCA"].map((p) => (
          <button
            key={p}
            onClick={() => {
              setProgram(p);
              setSemester("1");
            }}
            className={`px-6 py-2 rounded-full ${
              program === p ? "bg-blue-600 text-white" : "bg-white shadow"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* SEMESTERS */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSemester(sem)}
            className={`px-4 py-2 rounded-full ${
              semester === sem ? "bg-purple-600 text-white" : "bg-white shadow"
            }`}
          >
            Sem {sem}
          </button>
        ))}
      </div>

      {/* CATEGORIES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {["Syllabus", "Timetable", "Exam Notice", "Previous Year Paper"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`p-4 rounded-xl text-center shadow ${
                category === cat ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {cat}
            </button>
          ),
        )}
      </div>

      {/* PDF LIST */}
      <div className="bg-white rounded-xl shadow p-4">
        {data.length === 0 && (
          <p className="text-center text-gray-500">No data available.</p>
        )}

        {data.map((item) => (
          <div
            key={item.id}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.program} – Semester {item.semester}
              </p>
            </div>
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center mt-8 text-sm text-gray-600">
        <p>© CS & IT Department</p>
        <p>Khwaja Moinuddin Chishti Language University</p>
        <p className="mt-2">
          Developed with ❤️ by <br />
          <span className="font-semibold">Sadan Imam & Sheeri Fatima</span>
        </p>
      </div>
    </div>
  );
}
