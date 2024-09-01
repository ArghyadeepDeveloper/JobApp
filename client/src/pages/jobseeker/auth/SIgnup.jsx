import React, { useState, useRef, useEffect } from "react";
import InputField from "../../../components/InputField";
import DatePicker from "../../../components/DatePicker";
import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import SelectField from "../../../components/SelectField";
import { getCitiesClient } from "../../../services/admin";
import { registerJobseeker } from "../../../services/jobseeker";
import { notifyError, notifySuccess } from "../../../helpers/ToastNotification";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    dateOfBirth: null,
  });

  const [errors, setErrors] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [buttonDisabled, setButtonDisabeld] = useState(true);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, dateOfBirth: e.value });
    validateField("dateOfBirth", e.value);
  };

  const validateField = (name, value) => {
    let validationErrors = { ...errors };

    switch (name) {
      case "firstName":
        if (!value) {
          validationErrors.firstName = "First Name is required";
        } else {
          delete validationErrors.firstName;
        }
        break;

      case "lastName":
        if (!value) {
          validationErrors.lastName = "Last Name is required";
        } else {
          delete validationErrors.lastName;
        }
        break;

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

      case "phone":
        if (!value) {
          validationErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          validationErrors.phone = "Phone number must be 10 digits";
        } else {
          delete validationErrors.phone;
        }
        break;

      case "city":
        if (!value) {
          validationErrors.city = "City is required";
        } else {
          delete validationErrors.city;
        }
        break;

      case "dateOfBirth":
        if (!value) {
          validationErrors.dateOfBirth = "Date of Birth is required";
        } else {
          delete validationErrors.dateOfBirth;
        }
        break;

      default:
        break;
    }

    setErrors(validationErrors);
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.city ||
      !formData.dateOfBirth ||
      !formData.password ||
      !formData.phone
    ) {
      console.log(formData);
      setButtonDisabeld(true);
    } else {
      console.log("false");
      setButtonDisabeld(false);
    }
  };

  const handleSubmit = async () => {
    try {
      let response = await registerJobSeekerWithAPI();
      if (response.status == 201) {
        notifySuccess("User registered successfully");
      } else throw new Error("something wrond");
    } catch (err) {
      // e.preventDefault();
      // if (validateStep()) {
      //   console.log("Form Submitted", formData);
      //   await registerJobSeekerWithAPI();
      // } else {
      //   console.log("not validated");
      // }
      notifyError(err.message ? err.message : err.response.data.message);
    }
  };

  const stepperRef = useRef(null);

  async function getCitiesWithAPI() {
    try {
      let response = await getCitiesClient();
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCitiesWithAPI();
  }, []);

  useEffect(function () {
    validateForm();
  });

  async function registerJobSeekerWithAPI() {
    try {
      setLoading(true);
      const response = await registerJobseeker(formData);
      if (response.status == 201) {
        showSuccess("User registered successfully!");
      }
    } catch (err) {
      showError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[90vw] 2xl:w-[30vw] xl:w-[30vw] flex flex-col items-center">
      <Stepper
        ref={stepperRef}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="w-full p-0"
      >
        <StepperPanel header="" className="p-0">
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            placeholder="Enter your first name"
          />
          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            placeholder="Enter your last name"
          />
        </StepperPanel>

        <StepperPanel header="">
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
          <InputField
            label="Phone"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            placeholder="Enter your phone number"
          />
        </StepperPanel>

        <StepperPanel header="">
          <SelectField
            label="City"
            value={formData.city}
            onChange={(value) => setFormData({ ...formData, city: value })}
            data={cities}
            helper={{ label: "name", value: "code" }}
            placeholder="Select your city"
            error={errors.city}
            name="city"
          />
          <DatePicker
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleDateChange}
            error={errors.dateOfBirth}
            placeholder="Select your date of birth"
            name="dateOfBirth"
          />
        </StepperPanel>
      </Stepper>
      <Button
        className={` px-3 py-1 text-white ${
          buttonDisabled ? "bg-teal-700" : "bg-teal-400"
        }`}
        label="Submit"
        onClick={handleSubmit}
        disabled={buttonDisabled}
        loading={loading}
      />
    </div>
  );
};

export default SignUp;
