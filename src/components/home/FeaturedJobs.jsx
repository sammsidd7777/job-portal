import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Clock3 } from "lucide-react";
import { useGetAllforJobsQuery } from "../../RTK/HrService";
import { useGetSavedJobsQuery, useSavedJobMutation } from "../../RTK/savedJobsApi";
import JobCard from "../jobs/JobCard";

const normalize = (data) => Array.isArray(data) ? data : Array.isArray(data?.jobs) ? data.jobs : Array.isArray(data?.data) ? data.data : [];

const FeaturedJobs = () => {
  const { data, isLoading, isError } = useGetAllforJobsQuery();
  const user = useSelector((state) => state.auth.user);
  const { data: savedData } = useGetSavedJobsQuery(undefined, { skip: !user });
  const [saveJob, { isLoading: isSaving }] = useSavedJobMutation();
  const [savingId, setSavingId] = useState(null);
  const savedIds = useMemo(() => {
    const list = Array.isArray(savedData) ? savedData : Array.isArray(savedData?.savedJobs) ? savedData.savedJobs : Array.isArray(savedData?.data) ? savedData.data : [];
    return new Set(list.map((item) => item?._id).filter(Boolean));
  }, [savedData]);
  const handleSave = async (id) => {
    if (!id || !user) return;
    try { setSavingId(id); await saveJob(id).unwrap(); } catch { /* Find Jobs handles the full auth UX */ } finally { setSavingId(null); }
  };
  const jobs = useMemo(() => normalize(data).filter((job) => job?.isActive !== false).sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)).slice(0, 6), [data]);

  return (
    <section className="bg-[#0d0d0a] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-300"><BriefcaseBusiness size={13} /> Latest opportunities</div>
            <h2 className="text-3xl font-black tracking-[-0.045em] sm:text-4xl">Fresh roles worth checking out.</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-500">A focused list of current opportunities. No made-up counts or listings.</p>
          </div>
          <Link to="/find-job" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-slate-200 transition hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-white">View all jobs <ArrowRight size={16} /></Link>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-[390px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />)}</div>
        ) : isError ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 text-center"><p className="font-bold text-white">We couldn't load the latest jobs.</p><p className="mt-1 text-sm text-slate-500">Try the jobs page to search again.</p><Link to="/find-job" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-950">Browse jobs <ArrowRight size={16} /></Link></div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center"><Clock3 className="mx-auto text-slate-600" /><p className="mt-3 font-bold text-white">No active opportunities right now.</p><p className="mt-1 text-sm text-slate-500">Check back soon or explore all jobs.</p></div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => <JobCard key={job._id || job.id} job={job} jobType={job?.externalApplyUrl ? "external" : undefined} isSaved={savedIds.has(job?._id)} onSave={handleSave} isSaving={isSaving && savingId === job?._id} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
