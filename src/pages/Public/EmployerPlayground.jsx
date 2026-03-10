import { useNavigate } from "react-router-dom";

export default function EmployerPlayground() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow space-y-3 w-full max-w-md">
        <h1 className="text-lg font-semibold">Employer Playground</h1>
        <p className="text-sm text-gray-500">
          Temporary navigation page for Employer UI routes.
        </p>

        <button
          className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate("/employer/jobs")}
        >
          Jobs List
        </button>

        <button
          className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate("/employer/jobs/new")}
        >
          Create Job
        </button>

        <button
          className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate("/employer/published")}
        >
          Published Jobs
        </button>
      </div>
    </div>
  );
}
