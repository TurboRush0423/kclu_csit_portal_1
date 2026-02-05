import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/login";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectProgram from "./pages/admin/selectProgram";
import Dashboard from "./pages/admin/dashboard";
import Manage from "./pages/admin/manage";
import StudentView from "./pages/student/StudentView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/student" element={<StudentView />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/select-program"
          element={
            <ProtectedRoute>
              <SelectProgram />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute>
              <Manage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
