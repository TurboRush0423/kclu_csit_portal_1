import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SelectProgram() {
  const navigate = useNavigate();
  const [program, setProgram] = useState("");

  const handleContinue = () => {
    if (!program) {
      alert("Please select a program");
      return;
    }

    // Store selected program in localStorage
    localStorage.setItem("adminProgram", program);

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-6">Select Program</h2>

        <p className="text-gray-600 mb-6">
          Khwaja Moinuddin Chishti Language University
          <br />
          Department of CS & IT
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setProgram("BCA")}
            className={`hover:bg-gray-200 cursor-pointer w-1/2 p-4 border rounded ${
              program === "BCA" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            BCA
          </button>

          <button
            onClick={() => setProgram("MCA")}
            className={` hover:bg-gray-200 cursor-pointer w-1/2 p-4 border rounded ${
              program === "MCA" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            MCA
          </button>
        </div>

        <button
          onClick={handleContinue}
          className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
