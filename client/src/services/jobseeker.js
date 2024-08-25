import { axiosPrivate } from "../api/config";

export async function registerJobseeker(payload) {
  return axiosPrivate.post("jobseekers/register", payload);
}

export async function loginJobseeker(payload) {
  return axiosPrivate.post("jobseekers/login", payload);
}
