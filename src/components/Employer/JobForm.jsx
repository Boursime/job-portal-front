import { Button, I, Input, Select, Textarea, cn } from "../common/UiPrimitives";

const EMPLOYMENT_TYPES = ["CDI", "CDD", "Stage", "Freelance", "Temporaire"];
const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior"];

const setValue = (setForm) => (key) => (e) => {
  const value = e?.target?.value ?? "";
  setForm((prev) => ({ ...prev, [key]: value }));
};

export default function JobForm({ form, setForm, onSubmit, onCancel, label }) {
  const set = setValue(setForm);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4 p-4 bg-gray-50/80 rounded-xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <I.Briefcase /> Job Details
        </p>

        {/* Job Title */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Job Title <span className="text-red-400">*</span>
          </label>
          <Input
            placeholder="e.g. Senior Software Engineer"
            value={form.job_title}
            onChange={set("job_title")}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Employment Type */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Employment Type
            </label>
            <div className="flex flex-wrap gap-1">
              {EMPLOYMENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, employment_type: type }))}
                  className={cn(
                    "flex-1 text-xs font-medium py-1.5 rounded-lg border transition-all",
                    form.employment_type === type
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Experience Level
            </label>
            <Select value={form.experience_level} onChange={set("experience_level")}>
              <option value="">-- Select --</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Location */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Location
            </label>
            <Input
              placeholder="e.g. Casablanca"
              value={form.location}
              onChange={set("location")}
            />
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Salary Range
            </label>
            <Input
              placeholder="e.g. 8000"
              type="number"
              value={form.salary_range}
              onChange={set("salary_range")}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Status
          </label>
          <div className="flex gap-1.5">
            {[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ].map((s) => (
              <button
                key={String(s.value)}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, is_active: s.value }))}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
                  form.is_active === s.value
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 p-4 bg-gray-50/80 rounded-xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Job Description
        </p>
        <Textarea
          rows={5}
          placeholder="Describe the role, responsibilities..."
          value={form.job_description}
          onChange={set("job_description")}
        />
      </div>

      {/* Skills */}
      <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-100">
        <label className="text-xs font-medium text-gray-600 mb-1 block">
          Skills (comma separated)
        </label>
        <Input
          placeholder="e.g. Node.js, React, PostgreSQL"
          value={Array.isArray(form.skills) ? form.skills.join(", ") : form.skills || ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, skills: e.target.value }))
          }
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <I.Send />
          {label}
        </Button>
      </div>
    </form>
  );
}