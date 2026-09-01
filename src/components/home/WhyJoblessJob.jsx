import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Search, Sparkles, Heart } from "lucide-react";

const features = [
  [Search, "Relevant discovery", "Search by role, skill and location instead of endlessly scrolling."],
  [Sparkles, "Fresh opportunities", "Keep an eye on current listings and use the posting date to judge freshness."],
  [ExternalLink, "Direct applications", "When a listing provides an external application link, the destination is clearly shown."],
  [Heart, "Built for job seekers", "Save useful roles and come back to them when you're ready to apply."],
];

const WhyJoblessJob = () => <section className="bg-[#0d0d0a] py-16 text-white sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">Why JoblessJob?</p><h2 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">A simpler way to move your search forward.</h2><p className="mt-3 text-sm leading-6 text-slate-500">Less noise, clearer job information and a product designed around the actions job seekers actually need.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{features.map(([Icon, title, copy]) => <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/15 hover:bg-white/[0.04]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-amber-300"><Icon size={18} /></span><h3 className="mt-5 text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p></div>)}</div><div className="mt-8"><Link to="/find-job" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-50">Start exploring <ArrowRight size={16} /></Link></div></div></section>;

export default WhyJoblessJob;
