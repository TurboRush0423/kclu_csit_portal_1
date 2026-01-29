import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectProgram from "./pages/admin/selectProgram";
import Dashboard from "./pages/admin/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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

        {/* <Route
          path="/admin/manage"
          element={
            <ProtectedRoute>
              <Manage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
