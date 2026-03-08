import React from "react";

export default function CompanyInfoSidebar() {
  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-[#e0dfdc] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Conseils</h2>
        <p className="mt-2 text-sm text-gray-600">
          Un profil entreprise complet améliore la crédibilité de vos offres.
        </p>
      </div>

      <div className="rounded-xl border border-[#e0dfdc] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Prochaine étape</h2>
        <p className="mt-2 text-sm text-gray-600">
          Après cette page, on pourra ajouter l’upload du logo entreprise.
        </p>
      </div>
    </aside>
  );
}