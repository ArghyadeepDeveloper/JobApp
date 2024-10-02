import React, { useState, useEffect } from "react";
import InputField from "../../../components/InputField";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { loginJobseeker } from "../../../services/jobseeker";
import { notifyError, notifySuccess } from "../../../helpers/ToastNotification";
import { InputOtp } from "primereact/inputotp";

const JobSeekerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpMode, setOtpMode] = useState(false); // To toggle between password and OTP modes
  const [otp, setOtp] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleOtpChange = (otp) => {
    setFormData({ ...formData, otp });
    validateField("otp", otp);
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

      case "otp":
        if (!value) {
          validationErrors.otp = "OTP is required";
        } else if (value.length !== 6) {
          validationErrors.otp = "OTP must be 6 digits";
        } else {
          delete validationErrors.otp;
        }
        break;

      default:
        break;
    }

    setErrors(validationErrors);
  };

  const validateForm = () => {
    if (
      (!otpMode && (!formData.email || !formData.password)) ||
      (otpMode && (!formData.email || !formData.otp))
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await loginJobseeker({
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        notifySuccess("Login successful");
      }
    } catch (err) {
      notifyError(err.message ? err.message : err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData, otpMode]);

  const customInput = ({ events, props }) => (
    <input
      {...events}
      {...props}
      type="text"
      className="bg-gray-100 border border-slate-400 rounded-[5px] w-10 h-12"
    />
  );

  return (
    <div className="w-[90vw] 2xl:w-[30vw] xl:w-[30vw] flex flex-col items-start h-screen justify-start">
      <header className="text-teal-500 mb-2 mt-[200px] text-2xl font-semibold">
        Login
      </header>
      <p className="text-lg text-slate-700 font-bold mb-6">
        Access your account
      </p>
      <div className="flex flex-col justify-between items-center card w-full">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email"
        />
        {!otpMode ? (
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Enter your password"
          />
        ) : (
          <InputOtp
            value={otp}
            onChange={(e) => setOtp(e.value)}
            inputTemplate={customInput}
          />
        )}
        <Button
          className={`px-3 py-1 my-4 cursor-pointer text-white ${
            buttonDisabled ? "bg-teal-700" : "bg-teal-400"
          }`}
          label="Login"
          onClick={handleSubmit}
          disabled={buttonDisabled}
          loading={loading}
        />
        <div className="flex gap-2 mb-2">
          <p className="m-0">Don't have an account?</p>
          <Link to="/jobseeker/signup" className="text-teal-700 font-medium">
            Sign Up
          </Link>
        </div>
        <div className="flex gap-2 mt-4">
          <p className="m-0">
            Login with {!otpMode ? "OTP" : "password"} instead?
          </p>
          <Button
            label={otpMode ? "Use Password" : "Use OTP"}
            className="p-button-link p-0 text-teal-700 font-medium"
            onClick={() => setOtpMode(!otpMode)}
          />
        </div>
      </div>
    </div>
  );
};

export default JobSeekerLogin;
