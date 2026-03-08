import axios from "axios";

export async function getApplicantsByJob(jobId) {
  const res = await axios.get(
    `http://localhost:5000/api/employer/jobs/${jobId}/applicants`,
    {
      withCredentials: true,
    }
  );

  return res.data;
}