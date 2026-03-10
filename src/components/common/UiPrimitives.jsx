import React from "react";

export const cn = (...classes) => classes.filter(Boolean).join(" ");
export const fmt = (n) => (n ? `$${Number(n).toLocaleString()}` : null);

export const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled,
}) => {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
    destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  const sizes = {
    sm: "h-7 px-2.5 text-xs gap-1",
    md: "h-9 px-4 text-sm gap-1.5",
    lg: "h-11 px-6 text-base gap-2",
    icon: "h-8 w-8 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
};

export const Input = ({ className = "", ...props }) => (
  <input
    className={cn(
      "flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all",
      className,
    )}
    {...props}
  />
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={cn(
      "flex w-full rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none",
      className,
    )}
    {...props}
  />
);

export const Select = ({ value, onChange, children, className = "" }) => (
  <select
    value={value}
    onChange={onChange}
    className={cn(
      "flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all cursor-pointer",
      className,
    )}
  >
    {children}
  </select>
);

export const Badge = ({ children, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-100 text-gray-600",
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    sky: "bg-sky-100 text-sky-700",
    violet: "bg-violet-100 text-violet-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
        colors[color],
      )}
    >
      {children}
    </span>
  );
};

export const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      "bg-white rounded-2xl border border-gray-100 shadow-sm",
      onClick && "cursor-pointer",
      className,
    )}
  >
    {children}
  </div>
);

export const Divider = () => <div className="h-px bg-gray-100 my-3" />;

const Ico = ({ d, size = 15, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("shrink-0", className)}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

export const I = {
  Plus: () => <Ico d="M12 5v14M5 12h14" />,
  Edit: () => (
    <Ico
      d={[
        "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
      ]}
    />
  ),
  Trash: () => (
    <Ico
      d={[
        "M3 6h18",
        "M19 6l-1 14H6L5 6",
        "M10 11v6",
        "M14 11v6",
        "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2",
      ]}
    />
  ),
  Search: () => (
    <Ico d={["M21 21l-4.35-4.35", "M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0"]} />
  ),
  Briefcase: () => (
    <Ico
      d={[
        "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2",
        "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
      ]}
    />
  ),
  MapPin: () => (
    <Ico
      d={[
        "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0",
        "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
      ]}
    />
  ),
  Dollar: () => <Ico d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  X: () => <Ico d="M18 6L6 18M6 6l12 12" />,
  Grid: () => <Ico d={["M3 3h7v7H3z", "M14 3h7v7h-7z", "M3 14h7v7H3z", "M14 14h7v7h-7"]} />,
  List: () => (
    <Ico
      d={["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]}
    />
  ),
  Eye: () => (
    <Ico
      d={[
        "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8",
        "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
      ]}
    />
  ),
  EyeOff: () => (
    <Ico
      d={[
        "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94",
        "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19",
        "M1 1l22 22",
      ]}
    />
  ),
  ArrowLeft: () => <Ico d="M19 12H5M12 5l-7 7 7 7" />,
  Clock: () => <Ico d={["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2", "M12 6v6l4 2"]} />,
  Globe: () => (
    <Ico
      d={[
        "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2",
        "M2 12h20",
        "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10",
      ]}
    />
  ),
  Users: () => (
    <Ico
      d={[
        "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
        "M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
        "M23 21v-2a4 4 0 0 0-3-3.87",
        "M16 3.13a4 4 0 0 1 0 7.75",
      ]}
    />
  ),
  CheckCircle: () => (
    <Ico d={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4L12 14.01l-3-3"]} />
  ),
  AlertCircle: () => (
    <Ico
      d={[
        "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0",
        "M12 9v4",
        "M12 17h.01",
      ]}
    />
  ),
  Send: () => <Ico d={["M22 2L11 13", "M22 2L15 22 11 13 2 9l20-7"]} />,
  Bold: () => (
    <Ico d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  ),
  Italic: () => <Ico d="M19 4h-9M14 20H5M15 4L9 20" />,
  UList: () => (
    <Ico
      d={["M9 6h11", "M9 12h11", "M9 18h11", "M4 6h.01", "M4 12h.01", "M4 18h.01"]}
    />
  ),
  Link: () => (
    <Ico
      d={[
        "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
        "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
      ]}
    />
  ),
};
