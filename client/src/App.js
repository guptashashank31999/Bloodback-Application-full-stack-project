import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import "./index.css"

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
    
        <Route path="/login" element={
            <PublicRoute>
                <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={
        <PublicRoute>
        <Register />

        </PublicRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
