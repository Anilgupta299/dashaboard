import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";

function ProtectedRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
       
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;