import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminForm from "../../components/AdminForm";
import ResourceList from "../../components/ResourceList";

export default function Manage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState("");
  const category = searchParams.get("category");

  useEffect(() => {
    const selectedProgram = localStorage.getItem("adminProgram");

    if (!selectedProgram || !category) {
      navigate("/admin/dashboard");
    } else {
      setProgram(selectedProgram);
    }
  }, [navigate, category]);

  if (!program || !category) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="mb-4 text-blue-600  cursor-pointer "
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-2">
        {program} – {category}
      </h1>

      <p className="text-gray-600 mb-6">
        Khwaja Moinuddin Chishti Language University – CS & IT
      </p>

      {/* Upload Form */}
      <AdminForm program={program} category={category} />

      {/* List of existing PDFs */}
      <ResourceList program={program} category={category} />
    </div>
  );
}
