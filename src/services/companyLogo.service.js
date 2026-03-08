import axios from "axios";

export async function getCompanyLogo() {
  const res = await axios.get("http://localhost:5000/api/employer/company/logo", {
    withCredentials: true,
    responseType: "blob",
  });

  return res.data;
}

export async function uploadCompanyLogo(file) {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await axios.post(
    "http://localhost:5000/api/employer/company/logo",
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}