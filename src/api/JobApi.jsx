import apiClient from "@/services/api";

const EMPLOYER_JOBS_BASE = "/api/employer/jobs";
const JOBSEEKER_JOBS_BASE = "/api/job-seeker/jobs";

const EMPLOYMENT_TYPE_MAP = {
  "Full-time": "CDI",
  "Part-time": "CDD",
  Contract: "Freelance",
};

const buildQuery = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};

const mapToBackendPayload = (payload = {}) => ({
  job_title: payload.job_title ?? "",
  job_description: payload.job_description ?? "",
  employment_type: payload.employment_type ?? "CDI",
  experience_level: payload.experience_level || undefined,
  salary_range: payload.salary_range ? String(payload.salary_range) : undefined,
  location: payload.location || undefined,
  is_active: payload.is_active ?? true,
  skills: payload.skills || "",
});

export const getEmployerJobs = async ({
  search = "",
  status = "",
  jobType = "",
  page = 1,
  limit = 10,
} = {}) => {
  try {
    const query = buildQuery({ search, status, jobType, page, limit,  _t: Date.now() });
    // Temporary fallback: read endpoints from job-seeker API.
    const response = await apiClient.get(
      query ? `${JOBSEEKER_JOBS_BASE}?${query}` : JOBSEEKER_JOBS_BASE,
    );
    return response.data;
  } catch (error) {
    console.error("Get Employer Jobs Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    // Temporary fallback: detail endpoint from job-seeker API.
    const response = await apiClient.get(`${JOBSEEKER_JOBS_BASE}/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Get Job By Id Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createJob = async (payload) => {
  try {
    const response = await apiClient.post(
      EMPLOYER_JOBS_BASE,
      mapToBackendPayload(payload),
    );
    return response.data;
  } catch (error) {
    console.error("Create Job Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateJob = async (jobId, payload) => {
  try {
    const response = await apiClient.put(
      `${EMPLOYER_JOBS_BASE}/${jobId}`,
      mapToBackendPayload(payload),
    );
    return response.data;
  } catch (error) {
    console.error("Update Job Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await apiClient.delete(`${EMPLOYER_JOBS_BASE}/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Delete Job Error:", error.response?.data || error.message);
    throw error;
  }
};

export const toggleJobPublish = async (jobId, isPublished) => {
  try {
    const response = await apiClient.patch(`${EMPLOYER_JOBS_BASE}/${jobId}/status`, {
      is_active: isPublished,
    });
    return response.data;
  } catch (error) {
    console.error("Toggle Job Publish Error:", error.response?.data || error.message);
    throw error;
  }
};
