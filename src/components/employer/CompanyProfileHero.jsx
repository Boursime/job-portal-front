import React from "react";

export default function CompanyProfileHero({ companyName }) {
  const initial = companyName?.trim()?.charAt(0)?.toUpperCase() || "C";

  return (
    <div className="rounded-xl border border-[#e0dfdc] bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-r from-[#dbeafe] via-[#e0f2fe] to-[#f1f5f9]" />

      <div className="p-6">
        <div className="-mt-14 flex h-20 w-20 items-center justify-center rounded-xl border-4 border-white bg-[#0a66c2] text-2xl font-bold text-white shadow-sm">
          {initial}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Profil Entreprise
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Gérez les informations de votre entreprise.
          </p>
        </div>
      </div>
    </div>
  );
}