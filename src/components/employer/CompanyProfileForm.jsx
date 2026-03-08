import React from "react";

export default function CompanyProfileForm({
  form,
  loading,
  saving,
  error,
  success,
  onChange,
  onSubmit,
}) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[#e0dfdc] bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#e0dfdc] bg-white p-6 shadow-sm">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nom de l’entreprise
          </label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/20"
            placeholder="Ex: Tech Solutions SARL"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/20"
            placeholder="Décrivez votre entreprise..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Secteur
            </label>
            <input
              type="text"
              name="industry"
              value={form.industry}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/20"
              placeholder="Ex: informatique"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Localisation
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/20"
              placeholder="Ex: Marrakech, Morocco"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#0a66c2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004182] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}