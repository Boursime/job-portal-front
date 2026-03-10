import { Badge, Button, Card, Divider, I, cn } from "../common/UiPrimitives";

const TYPE_COLOR = {
  CDI: "indigo", CDD: "amber", Freelance: "violet", Stage: "sky", Temporaire: "rose",
};

export default function JobDetail({ job, onBack, onEdit, onDelete }) {
  const isActive = job.is_active ?? job.status === "published";

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
      >
        <I.ArrowLeft /> Back to Jobs
      </button>

      <Card className="overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-gray-900">{job.job_title}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge color={TYPE_COLOR[job.employment_type] || "gray"}>
                  {job.employment_type}
                </Badge>
                <Badge color={isActive ? "emerald" : "rose"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
                {job.experience_level && (
                  <Badge color="sky">{job.experience_level}</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
                <I.Edit /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(job)}>
                <I.Trash /> Delete
              </Button>
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              { icon: I.MapPin, label: "Location", val: job.location || "Non spécifié" },
              { icon: I.Dollar, label: "Salary", val: job.salary_range || "Non spécifié" },
              { icon: I.Clock, label: "Type", val: job.employment_type || "Non spécifié" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label}>
                <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-1">
                  <Icon />{label}
                </div>
                <p className="text-sm font-semibold text-gray-800">{val}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          {job.skills?.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 font-medium mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(job.skills) ? job.skills : job.skills.split(",")).map((skill) => (
                  <span key={skill} className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Job Description</h2>
        {job.job_description ? (
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {job.job_description}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">No description provided.</p>
        )}
      </Card>
    </div>
  );
}