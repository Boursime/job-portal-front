import React, { useMemo, useState } from "react";
import CandidateCard from "../../components/candidates/CandidateCard";

export default function CandidateCardTest() {
  const [search, setSearch] = useState("");

  const candidates = useMemo(
    () => [
      {
        id: "1",
        fullName: "Imane Aitmessaoud",
        title: "Full Stack Developer (NodeJs + React)",
        location: "Marrakech, MA",
        experienceLevel: "Junior",
        skills: ["React", "Redux", "NodeJs", "MongoDB", "JWT", "Tailwind"],
        cvId: "67a781e2-cb9c-4a17-9ec6-a1a4ef4397bd", //  
        cvFileName: "CV_Imane_Aitmessaoud.pdf",
        lastActive: "Actif aujourd’hui",
        status: "Disponible",
      },
      {
        id: "2",
        fullName: "Kaoutar Belail",
        title: "Frontend Developer (React)",
        location: "Casablanca, MA",
        experienceLevel: "Mid",
        skills: ["React", "TypeScript", "UI/UX", "Tailwind"],
        cvId: "67a781e2-cb9c-4a17-9ec6-a1a4ef4397bd", // 
        cvFileName: "CV_Kaoutar_Belail.pdf",
        lastActive: "Actif hier",
        status: "En recherche",
      },
    ],
    []
  );

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.skills.join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#f3f2ef] py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          {/* Main */}
          <div className="space-y-3">
            {/* Search bar */}
            <div className="rounded-xl border border-[#e0dfdc] bg-white p-3 shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher (nom, poste, compétences...)"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0a66c2]/30"
              />
            </div>

            {/* List */}
            {filtered.map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block space-y-3">
            <div className="rounded-xl border border-[#e0dfdc] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Filtres</p>
              <p className="mt-2 text-sm text-gray-600">
                (À ajouter ensuite : ville, expérience, skills…)
              </p>
            </div>

            <div className="rounded-xl border border-[#e0dfdc] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Shortlist</p>
              <p className="mt-2 text-sm text-gray-600">
                Les favoris sont sauvegardés automatiquement.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}