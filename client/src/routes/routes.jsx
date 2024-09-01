import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import JobGiverLayout from "../layout/jobgiver/JobGiverLayout";
import JobSeekerLayout from "../layout/jobseeker/JobSeekerLayout";

// Job Giver Pages
import JobGiverLogin from "../pages/jobgiver/auth/Login";
import JobGiverSignUp from "../pages/jobgiver/auth/SignUp";
import JobGiverHome from "../pages/jobgiver/home/index";

// Job Seeker Pages
import JobSeekerLogin from "../pages/jobseeker/auth/Login";
import JobSeekerSignUp from "../pages/jobseeker/auth/Signup";
import JobSeekerHome from "../pages/jobseeker/home/index";

// Common Pages
import Jobs from "../pages/jobseeker/jobs/index";
import Profile from "../pages/jobseeker/profile/index";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Job Giver Routes */}
      <Route path="jobgiver">
        <Route path="login" element={<JobGiverLogin />} />
        <Route path="signup" element={<JobGiverSignUp />} />
        <Route element={<JobGiverLayout />}>
          <Route path="home" element={<JobGiverHome />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Job Seeker Routes */}
      <Route path="jobseeker">
        <Route path="login" element={<JobSeekerLogin />} />
        <Route path="signup" element={<JobSeekerSignUp />} />
        <Route element={<JobSeekerLayout />}>
          <Route path="home" element={<JobSeekerHome />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
