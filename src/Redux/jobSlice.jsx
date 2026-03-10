import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  deleteJob,
  getEmployerJobs,
  getJobById,
  toggleJobPublish,
  updateJob,
} from "@/api/JobApi";

const getErrorMessage = (error) =>
  error?.errors?.[0] ||
  error?.data?.errors?.[0] ||
  error.response?.data?.message || error.message || "Something went wrong";

export const fetchEmployerJobs = createAsyncThunk(
  "jobs/fetchEmployerJobs",
  async (params, { rejectWithValue }) => {
    try {
      return await getEmployerJobs(params);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      return await getJobById(jobId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createJobThunk = createAsyncThunk(
  "jobs/createJob",
  async (payload, { rejectWithValue }) => {
    try {
      return await createJob(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateJobThunk = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, payload }, { rejectWithValue }) => {
    try {
      return await updateJob(jobId, payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteJobThunk = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await deleteJob(jobId);
      return jobId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const toggleJobPublishThunk = createAsyncThunk(
  "jobs/toggleJobPublish",
  async ({ jobId, isPublished }, { rejectWithValue }) => {
    try {
      return await toggleJobPublish(jobId, isPublished);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const initialState = {
  items: [],
  selectedJob: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasMore: false,
  },
  filters: {
    search: "",
    status: "",
    jobType: "",
  },
};

const adaptBackendJob = (job = {}) => ({
  ...job,
  id: job.id,
  title: job.title ?? job.job_title ?? "",
  description: job.description ?? job.job_description ?? "",
  jobType:
    job.jobType ??
    (job.employment_type === "CDI"
      ? "Full-time"
      : job.employment_type === "CDD"
        ? "Part-time"
        : job.employment_type === "Freelance"
          ? "Contract"
          : job.employment_type || "Full-time"),
  status:
    job.status ??
    (typeof job.is_active === "boolean"
      ? job.is_active
        ? "published"
        : "paused"
      : "draft"),
  salaryMin: job.salaryMin ?? "",
  salaryMax: job.salaryMax ?? "",
});

const normalizeJobListPayload = (payload) => {
  // Accept different backend shapes without breaking UI.
  const jobs = Array.isArray(payload)
    ? payload
    : payload?.jobs || payload?.items || payload?.data || [];
  const pagination = payload?.pagination || initialState.pagination;
  return { jobs: jobs.map(adaptBackendJob), pagination };
};

const normalizeSingleJobPayload = (payload) =>
  adaptBackendJob(payload?.job || payload?.data || payload);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
    resetJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.loading = false;
        const { jobs, pagination } = normalizeJobListPayload(action.payload);
        state.items = jobs;
        state.pagination = { ...state.pagination, ...pagination };
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load jobs";
      })

      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = normalizeSingleJobPayload(action.payload);
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load job details";
      })

      .addCase(createJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newJob = normalizeSingleJobPayload(action.payload);
        if (newJob) state.items.unshift(newJob);
      })
      .addCase(createJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create job";
      })

      .addCase(updateJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = normalizeSingleJobPayload(action.payload);
        const index = state.items.findIndex((item) => item.id === updated?.id);
        if (index !== -1) state.items[index] = updated;
        if (state.selectedJob?.id === updated?.id) state.selectedJob = updated;
      })
      .addCase(updateJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update job";
      })

      .addCase(deleteJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.selectedJob?.id === action.payload) state.selectedJob = null;
      })
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete job";
      })

      .addCase(toggleJobPublishThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleJobPublishThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = normalizeSingleJobPayload(action.payload);
        const index = state.items.findIndex((item) => item.id === updated?.id);
        if (index !== -1) state.items[index] = updated;
        if (state.selectedJob?.id === updated?.id) state.selectedJob = updated;
      })
      .addCase(toggleJobPublishThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change job status";
      });
  },
});

export const { setJobFilters, clearSelectedJob, resetJobsState } = jobsSlice.actions;
export default jobsSlice.reducer;
