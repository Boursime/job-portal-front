import axios from "axios";

/**
 * Download CV from: GET /api/cvs/download/:id
 * backend should return the file (pdf) with proper headers.
 */
export async function downloadCv(cvId, fileName = "CV.pdf") {
  const res = await axios.get(`/api/cvs/download/${cvId}`, {
    responseType: "blob",
    withCredentials: true, // important si auth via cookies
  });

  const blob = new Blob([res.data]);
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}