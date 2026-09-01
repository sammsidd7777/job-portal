import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, MapPin, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const locations = ["Delhi, India", "Noida, India", "Gurgaon, India", "Bangalore, India", "Mumbai, India", "Remote"];
const popular = ["React Developer", "MERN Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "UI/UX Designer", "Internships"];

const HeroSection = () => {
  const navigate = useNavigate();
  const locationRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = ["Tired of applying everywhere and hearing nothing?", "We know you're tired of hearing it.", "Let's find you something worth saying YES to."];

  useEffect(() => {
    const id = setInterval(() => setMessageIndex((i) => (i + 1) % messages.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const close = (e) => { if (locationRef.current && !locationRef.current.contains(e.target)) setLocationOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const searchJobs = (overrideKeyword = keyword) => {
    const params = new URLSearchParams();
    if (overrideKeyword.trim()) params.set("keyword", overrideKeyword.trim());
    if (location) params.set("location", location);
    navigate(`/find-job?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.06] bg-[#080806] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-22rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-amber-500/[0.13] blur-[140px]" />
        <div className="absolute right-[-14rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-amber-400/[0.06] blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300 shadow-lg shadow-black/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.6)]" /> Fresh opportunities for your next move
          </div>

          <div className="relative min-h-[210px] sm:min-h-[250px] lg:min-h-[290px]">
            <h1 key={messageIndex} className="hero-text-enter mx-auto max-w-5xl text-[clamp(2.7rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.065em]">
              {messageIndex === 0 ? <>Tired of applying everywhere and <span className="text-slate-500">hearing nothing?</span></> : messageIndex === 1 ? <>We know you're tired of hearing it.</> : <>Let's find you something worth saying <span className="inline-block rounded-xl bg-[#D4AF37] px-2.5 py-1 text-[#080806] shadow-[5px_5px_0_#8A650A]">YES.</span></>}
            </h1>
          </div>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Discover relevant IT &amp; tech opportunities, explore companies, and apply directly to roles that match your skills.</p>

          <div className="mx-auto mt-8 max-w-5xl rounded-[22px] border border-white/10 bg-white/[0.055] p-2 shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-xl sm:mt-10">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#12120e] px-4 text-left focus-within:border-amber-400/50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300"><Search size={18} /></span>
                <span className="min-w-0 flex-1"><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Job title or skill</span><input aria-label="Job title or skill" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchJobs()} placeholder="React, MERN, Designer…" className="mt-0.5 w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-600" /></span>
              </label>

              <div ref={locationRef} className="relative flex-1">
                <button type="button" onClick={() => setLocationOpen((v) => !v)} className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#12120e] px-4 text-left hover:border-white/15">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300"><MapPin size={18} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Location</span><span className="mt-0.5 block truncate text-sm font-semibold text-white">{location || "Any location"}</span></span>
                  <ChevronDown size={16} className={`text-slate-500 transition ${locationOpen ? "rotate-180" : ""}`} />
                </button>
                {locationOpen && <div className="absolute left-0 right-0 top-[62px] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#12120e] p-1.5 shadow-2xl"><button onClick={() => { setLocation(""); setLocationOpen(false); }} className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-400 hover:bg-white/[0.06] hover:text-white">Any location</button>{locations.map((item) => <button key={item} onClick={() => { setLocation(item); setLocationOpen(false); }} className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white">{item}</button>)}</div>}
              </div>

              <button onClick={() => searchJobs()} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#F5D76E] px-6 text-sm font-black text-[#080806] transition hover:-translate-y-0.5 hover:bg-[#FFF4B0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:min-w-36">Find Jobs <ArrowRight size={17} /></button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="mr-1 font-semibold text-slate-500">Popular:</span>
            {popular.map((item) => <button key={item} onClick={() => searchJobs(item)} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 font-medium text-slate-400 transition hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-200">{item}</button>)}
          </div>
        </div>

        <div className="mt-10 grid gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-3">
          {["Search by skill, role or location", "See real listing details before you apply", "Use direct application links when available"].map((item, i) => <div key={item} className="flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-500 sm:justify-start sm:text-left"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[10px] font-black text-amber-300">0{i + 1}</span>{item}</div>)}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
