import SignupPage from "./pages/jobseeker/auth/Signup";
import React, { useRef } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RoutesComponent from "./routes/routes";

export default function App() {
  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <RoutesComponent />
    </div>
  );
}
