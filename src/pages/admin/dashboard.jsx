import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [program, setProgram] = useState("");

  useEffect(() => {
    const selectedProgram = localStorage.getItem("adminProgram");
    if (!selectedProgram) {
      navigate("/admin/select-program");
    } else {
      setProgram(selectedProgram);
    }
  }, [navigate]);

  const goToManage = (category) => {
    navigate(`/admin/manage?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-2">{program} Admin Dashboard</h1>

      <p className="text-gray-600 mb-6">
        Khwaja Moinuddin Chishti Language University – CS & IT Department
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-3xl">
        <button
          onClick={() => goToManage("Syllabus")}
          className="p-6 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Manage Syllabus
        </button>

        <button
          onClick={() => goToManage("Timetable")}
          className="p-6 bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          Manage Timetable
        </button>

        <button
          onClick={() => goToManage("Exam Notice")}
          className="p-6 bg-orange-600 text-white rounded shadow hover:bg-orange-700"
        >
          Manage Exam Notices
        </button>

        <button
          onClick={() => goToManage("Previous Year Paper")}
          className="p-6 bg-purple-600 text-white rounded shadow hover:bg-purple-700"
        >
          Manage Previous Year Papers
        </button>
      </div>
    </div>
  );
}
