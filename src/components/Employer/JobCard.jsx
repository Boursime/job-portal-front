import { Badge, Button, Card, Divider, I, cn } from "../common/UiPrimitives";

const TYPE_COLOR = {
  CDI: "indigo",
  CDD: "amber",
  Freelance: "violet",
  Stage: "sky",
  Temporaire: "rose",
};

const STATUS_COLOR = { true: "emerald", false: "rose" };

export function JobCard({ job, onView, onEdit, onDelete, onToggleStatus }) {
  const isActive = job.is_active ?? job.status === "published";

  return (
    <Card className="p-5 flex flex-col gap-3 hover:shadow-md hover:border-indigo-100 transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5 min-w-0 flex-1">
          <button
            onClick={() => onView(job)}
            className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors text-left leading-snug line-clamp-2 w-full"
          >
            {job.job_title}
          </button>
          <div className="flex flex-wrap gap-1.5">
            <Badge color={TYPE_COLOR[job.employment_type] || "gray"}>
              {job.employment_type}
            </Badge>
            {job.experience_level && (
              <Badge color="sky">{job.experience_level}</Badge>
            )}
          </div>
        </div>
        <Badge color={isActive ? "emerald" : "rose"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="space-y-1 text-xs text-gray-500">
        {job.location && (
          <div className="flex items-center gap-1.5">
            <I.MapPin />
            {job.location}
          </div>
        )}
        {job.salary_range && (
          <div className="flex items-center gap-1.5">
            <I.Dollar />
            {job.salary_range}
          </div>
        )}
        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {(Array.isArray(job.skills) ? job.skills : job.skills.split(","))
              .slice(0, 3)
              .map((skill) => (
                <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {skill}
                </span>
              ))}
          </div>
        )}
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <button
          onClick={() => onToggleStatus(job)}
          className={cn(
            "text-xs font-medium flex items-center gap-1 transition-colors",
            isActive
              ? "text-amber-600 hover:text-amber-800"
              : "text-emerald-600 hover:text-emerald-800",
          )}
        >
          {isActive ? (
            <><I.EyeOff /> Pause</>
          ) : (
            <><I.CheckCircle /> Publish</>
          )}
        </button>
        <div className="flex gap-0.5">
          <Button variant="ghost" size="icon" onClick={() => onView(job)}>
            <I.Eye />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(job)}>
            <I.Edit />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(job)}
            className="text-red-400 hover:text-red-600 hover:bg-red-50"
          >
            <I.Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function ListRow({ job, onView, onEdit, onDelete, onToggleStatus }) {
  const isActive = job.is_active ?? job.status === "published";

  return (
    <Card className="px-5 py-3.5 flex items-center gap-4 hover:shadow-md hover:border-indigo-100 transition-all">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onView(job)}
            className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors truncate"
          >
            {job.job_title}
          </button>
          <Badge color={TYPE_COLOR[job.employment_type] || "gray"}>
            {job.employment_type}
          </Badge>
          <Badge color={isActive ? "emerald" : "rose"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 mt-0.5 text-xs text-gray-400">
          {job.location && (
            <span className="flex items-center gap-1">
              <I.MapPin />{job.location}
            </span>
          )}
          {job.salary_range && (
            <span className="flex items-center gap-1">
              <I.Dollar />{job.salary_range}
            </span>
          )}
          {job.experience_level && (
            <span className="flex items-center gap-1">
              <I.Clock />{job.experience_level}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onToggleStatus(job)}
          className={cn(
            "text-xs font-medium hidden sm:flex items-center gap-1 mr-1 transition-colors",
            isActive
              ? "text-amber-500 hover:text-amber-700"
              : "text-emerald-600 hover:text-emerald-800",
          )}
        >
          {isActive ? (
            <><I.EyeOff /> Pause</>
          ) : (
            <><I.CheckCircle /> Publish</>
          )}
        </button>
        <Button variant="ghost" size="icon" onClick={() => onView(job)}>
          <I.Eye />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(job)}>
          <I.Edit />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(job)}
          className="text-red-400 hover:bg-red-50 hover:text-red-600"
        >
          <I.Trash />
        </Button>
      </div>
    </Card>
  );
}