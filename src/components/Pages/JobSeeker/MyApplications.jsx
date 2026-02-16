import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyApplications } from "../../../Redux/applicationSlice";
import ApplicationCard from "../../common/cards/applicationCard";
import { ApplicationHeader } from "../../common/Headers/ApplicationHeader";
import useDebounce from "../../../hooks/useDebounce";

export default function MyApplicationsPage() {
  const dispatch = useDispatch();
  const { items: applications, loading, error } = useSelector(
    (state) => state.applications
  );

  const [search,setSearch] = useState('')
  const [debounceSearch, cancelDebounce] = useDebounce(search.trim(),500)

  useEffect(() => {
    if (debounceSearch.length < 3 && debounceSearch !== '') return ;
    const userId = "59d04c22-9d7c-4be5-8f61-16da54552bbe";
    dispatch(fetchMyApplications({userId,search:debounceSearch}));
    return ()=> cancelDebounce()
  }, [dispatch,debounceSearch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-4 px-8">
      <ApplicationHeader
        title={"My Applications"}
        para={"Track and manage your job applications"}
        placeholder={"Search by job title or by status"}
        value={search}
        onChange={(e) => {setSearch(e.target.value)}}
        
      />
      <main>
        <section>
          {applications.length === 0 ? (
          <p>You haven't applied to any jobs yet.</p>
        ) : (
          applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))
        )}
        </section>
        <section>
          
        </section>
      </main>
    </div>
  );
}
