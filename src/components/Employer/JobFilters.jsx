import { Input, I, cn } from "../common/UiPrimitives";

const EMPLOYMENT_TYPES = ["CDI", "CDD", "Stage", "Freelance", "Temporaire"];
const STATUSES = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

export default function JobFilters({
  search,
  setSearch,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="relative flex-1 max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <I.Search />
        </span>
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Employment Type Filter */}
        <div className="flex gap-0.5 bg-gray-100 p-1 rounded-lg">
          {["All", ...EMPLOYMENT_TYPES].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                filterType === type
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-0.5 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setFilterStatus("All")}
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
              filterStatus === "All"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(s.value)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                filterStatus === s.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* View Mode */}
        <div className="flex gap-0.5 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "grid"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            <I.Grid />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "list"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            <I.List />
          </button>
        </div>
      </div>
    </div>
  );
}