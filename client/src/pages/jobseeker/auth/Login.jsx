import React, { useState } from "react";
import InputField from "../../../components/InputField";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { loginJobseeker } from "../../../services/jobseeker";
import { notifyError, notifySuccess } from "../../../helpers/ToastNotification";

const JobSeekerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otp, setOtp] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let validationErrors = { ...errors };

    switch (name) {
      case "email":
        if (!value) {
          validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          validationErrors.email = "Email is invalid";
        } else {
          delete validationErrors.email;
        }
        break;

      case "password":
        if (!value) {
          validationErrors.password = "Password is required";
        } else if (value.length < 6) {
          validationErrors.password = "Password must be at least 6 characters";
        } else {
          delete validationErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(validationErrors);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginJobseeker(formData);
      if (response.status === 200) {
        notifySuccess("Login successful!");
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (err) {
      notifyError(err.message ? err.message : err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = () => {
    if (!otp) {
      notifyError("Please enter the OTP sent to your email.");
      return;
    }
    // Simulate OTP login success
    notifySuccess("OTP login successful!");
  };

  return (
    <div className="w-[90vw] 2xl:w-[30vw] xl:w-[30vw] flex flex-col items-start h-screen justify-start">
      <header className="text-teal-500 mb-2 mt-[200px] text-2xl font-semibold">
        {showOtpLogin ? "Sign In with OTP" : "Sign In"}
      </header>

      <p className="text-lg text-slate-700 font-bold mb-6">
        Welcome back! Please log in to continue.
      </p>

      <div className="flex flex-col justify-between items-center card w-full">
        {!showOtpLogin ? (
          <>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="Enter your password"
            />
            <Button
              className={` px-3 py-1 my-4 text-white cursor-poiner ${
                loading ? "bg-teal-700" : "bg-teal-400"
              }`}
              label="Login"
              onClick={handleLogin}
              loading={loading}
            />
          </>
        ) : (
          <>
            <InputField
              label="OTP"
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
            />
            <Button
              className=" px-3 py-1 my-4 text-white bg-teal-400"
              label="Verify OTP"
              onClick={handleOtpLogin}
            />
          </>
        )}

        <div className="flex gap-2 mb-2">
          <p className="m-0">
            {showOtpLogin
              ? "Prefer to login with password?"
              : "Sign in with OTP?"}
          </p>
          <span
            className="text-teal-700 font-medium cursor-pointer"
            onClick={() => setShowOtpLogin(!showOtpLogin)}
          >
            {showOtpLogin ? "Login with Password" : "Sign in with OTP"}
          </span>
        </div>

        <div className="flex gap-2 mb-2">
          <p className="m-0">Don't have an account?</p>
          <Link to="/jobseeker/signup" className="text-teal-700 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerLogin;
