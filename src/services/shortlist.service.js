import axios from "axios";

export async function toggleShortlist(applicationId, isShortlisted) {
  const res = await axios.patch(
    `http://localhost:5000/api/employer/applications/${applicationId}/shortlist`,
    { is_shortlisted: isShortlisted },
    {
      withCredentials: true,
    }
  );

  return res.data;
}