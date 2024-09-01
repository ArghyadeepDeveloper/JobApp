import SignupPage from "./pages/jobseeker/auth/Signup";
import React, { useRef } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  const toast = useRef(null);

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <SignupPage />
    </div>
  );
}
