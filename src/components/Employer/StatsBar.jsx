import { Card, I, cn } from "../common/UiPrimitives";

export default function StatsBar({ jobs }) {
  const active = jobs.filter((job) => job.is_active === true).length;
  const inactive = jobs.filter((job) => job.is_active === false).length;
  
  const employmentTypes = {
    CDI: jobs.filter((job) => job.employment_type === "CDI").length,
    CDD: jobs.filter((job) => job.employment_type === "CDD").length,
  };

  const stats = [
    {
      icon: I.Briefcase,
      label: "Total Jobs",
      val: jobs.length,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: I.CheckCircle,
      label: "Active",
      val: active,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: I.EyeOff,
      label: "Inactive",
      val: inactive,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      icon: I.Clock,
      label: "CDI",
      val: employmentTypes.CDI,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: I.Globe,
      label: "CDD",
      val: employmentTypes.CDD,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      icon: I.Users,
      label: "Autres",
      val: jobs.length - employmentTypes.CDI - employmentTypes.CDD,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {stats.map(({ icon: Icon, label, val, color, bg }) => (
        <Card key={label} className="p-3 text-center space-y-1">
          <div className={cn("inline-flex p-1.5 rounded-lg", bg, color)}>
            <Icon />
          </div>
          <p className="text-xl font-bold text-gray-900">{val}</p>
          <p className="text-xs text-gray-400">{label}</p>
        </Card>
      ))}
    </div>
  );
}