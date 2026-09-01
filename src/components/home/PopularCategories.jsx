import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Database, Palette, BarChart3, Cloud, ShieldCheck, TestTube2, BriefcaseBusiness } from "lucide-react";
import { useGetAllforJobsQuery } from "../../RTK/HrService";

const icons = [Code2, Database, Palette, BarChart3, Cloud, ShieldCheck, TestTube2, BriefcaseBusiness];
const normalize = (data) => Array.isArray(data) ? data : Array.isArray(data?.jobs) ? data.jobs : Array.isArray(data?.data) ? data.data : [];

const PopularCategories = () => {
  const { data } = useGetAllforJobsQuery();
  const categories = useMemo(() => {
    const counts = new Map();
    normalize(data).filter((job) => job?.isActive !== false).forEach((job) => {
      const category = job?.jobCategory || job?.category;
      if (category) counts.set(category, (counts.get(category) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [data]);

  if (!categories.length) return null;

  return <section className="border-y border-white/[0.06] bg-[#080806] py-16 text-white sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">Explore by category</p><h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">Find work in your lane.</h2></div><Link to="/find-job" className="hidden items-center gap-2 text-sm font-bold text-slate-400 hover:text-white sm:inline-flex">All jobs <ArrowRight size={15} /></Link></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{categories.map(([name, count], i) => { const Icon = icons[i % icons.length]; return <Link key={name} to={`/find-job?category=${encodeURIComponent(name)}`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-amber-400/25 hover:bg-white/[0.045]"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300"><Icon size={19} /></span><ArrowRight size={16} className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-amber-300" /></div><h3 className="mt-5 text-sm font-bold text-white">{name}</h3><p className="mt-1 text-xs text-slate-500">{count} active {count === 1 ? "role" : "roles"}</p></Link>})}</div></div></section>;
};

export default PopularCategories;
