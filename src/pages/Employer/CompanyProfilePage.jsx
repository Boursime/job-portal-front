import React, { useEffect, useState } from "react";
import { getMyCompany, updateMyCompany } from "../../services/company.service";
import CompanyProfileHero from "../../components/employer/CompanyProfileHero";
import CompanyProfileForm from "../../components/employer/CompanyProfileForm";
import CompanyInfoSidebar from "../../components/employer/CompanyInfoSidebar";
import CompanyLogoUploader from "../../components/employer/CompanyLogoUploader";

export default function CompanyProfilePage() {
  const [form, setForm] = useState({
    company_name: "",
    description: "",
    industry: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getMyCompany();
        const company = res.company || res.data || res;

        setForm({
          company_name: company.company_name || "",
          description: company.description || "",
          industry: company.industry || "",
          location: company.location || "",
        });
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le profil entreprise.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateMyCompany(form);
      setSuccess("Profil entreprise mis à jour avec succès.");
    } catch (err) {
      console.error(err);
      setError("Impossible de mettre à jour le profil entreprise.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <CompanyProfileHero companyName={form.company_name} />

<CompanyLogoUploader />

<CompanyProfileForm
  form={form}
  loading={loading}
  saving={saving}
  error={error}
  success={success}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>
          </div>

          <CompanyInfoSidebar />
        </div>
      </div>
    </div>
  );
}