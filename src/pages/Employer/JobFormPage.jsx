import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, I } from "../../components/common/UiPrimitives";
import Header from "../../components/Employer/Header";
import JobForm from "../../components/Employer/JobForm";
import JobFilters from "../../components/Employer/JobFilters";
import JobDetail from "../../components/Employer/JobDetail";
import { ConfirmDelete, Modal } from "../../components/Employer/Modals";
import StatsBar from "../../components/Employer/StatsBar";
import { JobCard, ListRow } from "../../components/Employer/JobCard";
import useDebounce from "../../hooks/useDebounce";
import {
  createJobThunk,
  deleteJobThunk,
  fetchEmployerJobs,
  toggleJobPublishThunk,
  updateJobThunk,
} from "../../Redux/jobSlice";

const EMPTY = {
  job_title: "",
  job_description: "",
  employment_type: "CDI",
  experience_level: "",
  salary_range: "",
  location: "",
  is_active: true,
  skills: "",
};

export default function JobFormPage() {
  const dispatch = useDispatch();
  const { items: jobs = [], loading, error } = useSelector((state) => state.jobs);

  const [viewMode, setViewMode] = useState("grid");
  const [activePage, setActivePage] = useState("list");
  const [detailJob, setDetailJob] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [debouncedSearch] = useDebounce(search.trim(), 400);

  const loadJobs = useCallback(() => {
    dispatch(
      fetchEmployerJobs({
        search: debouncedSearch,
        status: filterStatus === "All" ? "" : filterStatus,
        jobType: filterType === "All" ? "" : filterType,
        page: 1,
        limit: 50,
      }),
    );
  }, [dispatch, debouncedSearch, filterStatus, filterType]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const filtered = useMemo(
  () =>
    jobs.filter((job) => {
      const q = search.toLowerCase();
      const title = job.job_title?.toLowerCase() || "";

      return (
        (!q || title.includes(q)) &&
        (filterType === "All" || job.employment_type === filterType) &&
        (filterStatus === "All" || String(job.is_active) === filterStatus)
      );
    }),
  [jobs, search, filterType, filterStatus],
);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createJobThunk(form)).then((res) => {
      if (!res.error) {
        setCreateOpen(false);
        setForm(EMPTY);
        loadJobs();
      }
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editTarget?.id) return;

    dispatch(updateJobThunk({ jobId: editTarget.id, payload: form })).then((res) => {
      if (!res.error) {
        if (detailJob?.id === editTarget.id) {
          setDetailJob((prev) => ({ ...prev, ...form }));
        }
        setEditTarget(null);
        loadJobs();
      }
    });
  };

  const handleDelete = () => {
    if (!deleteTarget?.id) return;

    dispatch(deleteJobThunk(deleteTarget.id)).then((res) => {
      if (!res.error) {
        if (detailJob?.id === deleteTarget.id) {
          setActivePage("list");
          setDetailJob(null);
        }
        setDeleteTarget(null);
        loadJobs();
      }
    });
  };

  const toggleStatus = (job) => {
    if (!job?.id) return;
    const nextIsPublished = job.status !== "published";

    dispatch(
      toggleJobPublishThunk({
        jobId: job.id,
        isPublished: nextIsPublished,
      }),
    ).then((res) => {
      if (!res.error) {
        if (detailJob?.id === job.id) {
          setDetailJob((prev) => ({
            ...prev,
            status: nextIsPublished ? "published" : "paused",
          }));
        }
        loadJobs();
      }
    });
  };

const openEdit = (job) => {
  setForm({
    ...EMPTY,
    job_title: job?.job_title ?? "",
    job_description: job?.job_description ?? "",
    employment_type: job?.employment_type ?? "CDI",
    experience_level: job?.experience_level ?? "",
    salary_range: job?.salary_range ?? "",
    location: job?.location ?? "",
    is_active: job?.is_active ?? true,
    skills: Array.isArray(job?.skills) ? job.skills.join(", ") : job?.skills ?? "",
  });
  setEditTarget(job);
};

  const openView = (job) => {
    setDetailJob(job);
    setActivePage("detail");
  };

  const openCreate = () => {
    setForm(EMPTY);
    setCreateOpen(true);
  };

  if (activePage === "detail" && detailJob) {
    const liveJob = jobs.find((job) => job.id === detailJob.id) || detailJob;

    return (
      <div className="min-h-screen bg-gray-50/70">
        <Header onNewJob={openCreate} />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <JobDetail
            job={liveJob}
            onBack={() => setActivePage("list")}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
          />
        </main>

        <Modal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          title="Edit Job Posting"
          wide
        >
          <JobForm
            form={form}
            setForm={setForm}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
            label="Save Changes"
          />
        </Modal>

        <ConfirmDelete
          job={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70">
      <Header onNewJob={openCreate} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <StatsBar jobs={jobs} />

        <JobFilters
          search={search}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-gray-400">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </p>
          {loading && <p className="text-xs text-gray-500">Loading...</p>}
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}

        {filtered.length === 0 ? (
          <Card className="p-16 text-center">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <I.Briefcase />
              <p className="text-sm">
                No jobs match your filters.{" "}
                <button
                  onClick={openCreate}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Post a new job
                </button>
                .
              </p>
            </div>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onView={openView}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onToggleStatus={toggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((job) => (
              <ListRow
                key={job.id}
                job={job}
                onView={openView}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onToggleStatus={toggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Post a New Job"
        wide
      >
        <JobForm
          form={form}
          setForm={setForm}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          label="Post Job"
        />
      </Modal>

      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Job Posting"
        wide
      >
        <JobForm
          form={form}
          setForm={setForm}
          onSubmit={handleEdit}
          onCancel={() => setEditTarget(null)}
          label="Save Changes"
        />
      </Modal>

      <ConfirmDelete
        job={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
