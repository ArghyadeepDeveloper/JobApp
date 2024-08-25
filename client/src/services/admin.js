import { axiosPrivate } from "../api/config";

export function getCitiesClient() {
  return axiosPrivate.get("/admin/cities");
}
