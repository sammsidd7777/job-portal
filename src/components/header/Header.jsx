import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  BriefcaseBusiness,
  Building2,
  Bookmark,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Plus,
} from "lucide-react";
import AuthPage from "../Auth/AuthPage";
import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";
import AnimatedBrand from "./AnimatedBrand";

const Header = () => {
  const [isLoginCard, setIsLoginCard] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  useEffect(() => {
    const close = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    setIsProfileOpen(false);
    try { await logoutUser().unwrap(); } catch { /* local logout still succeeds */ }
    navigate("/");
  };

  const desktopLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Jobs", path: "/find-job", icon: BriefcaseBusiness },
    { name: "Companies", path: "/companies", icon: Building2 },
  ];

  const mobileLinks = user
    ? [
        { name: "Home", path: "/", icon: Home },
        { name: "Jobs", path: "/find-job", icon: BriefcaseBusiness },
        { name: "Companies", path: "/companies", icon: Building2 },
        { name: "Saved", path: "/candidate/saved-jobs", icon: Bookmark },
        { name: "Profile", path: "/candidate", icon: User },
      ]
    : [
        { name: "Home", path: "/", icon: Home },
        { name: "Jobs", path: "/find-job", icon: BriefcaseBusiness },
        { name: "Companies", path: "/companies", icon: Building2 },
        { name: "Login", action: () => setIsLoginCard(true), icon: LogIn },
      ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080806]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">
          <Link to="/" className="group flex min-w-0 items-center gap-2.5" onClick={() => setIsProfileOpen(false)}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[3px_3px_0_#D4AF37] transition-transform group-hover:-translate-y-0.5 sm:h-10 sm:w-10">
              <img src="/logo.svg" alt="JoblessJob" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="text-lg font-black leading-none tracking-[-0.05em] text-white sm:text-xl">
                <AnimatedBrand />
              </div>
              <p className="mt-1 hidden text-[9px] font-medium tracking-[0.08em] text-slate-500 sm:block">FIND SOMETHING WORTH SAYING YES TO</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {desktopLinks.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) => `group relative flex items-center gap-2 py-2 text-sm font-semibold transition ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}
              >
                {({ isActive }) => <><Icon size={16} aria-hidden="true" /><span>{name}</span><span className={`absolute -bottom-1 left-0 h-px bg-amber-400 transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} /></>}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <>
                <Link to="/find-job" className="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:text-white xl:inline-flex">
                  <BriefcaseBusiness size={16} /> Explore jobs
                </Link>
                <button onClick={() => setIsLoginCard(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#F5D76E] px-4 text-sm font-bold text-[#080806] transition hover:-translate-y-0.5 hover:bg-[#FFF4B0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  <LogIn size={16} /> Login / Sign up
                </button>
              </>
            ) : (
              <div ref={profileRef} className="relative">
                <button onClick={() => setIsProfileOpen((v) => !v)} aria-expanded={isProfileOpen} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-2.5 pr-3 transition hover:border-white/20 hover:bg-white/[0.08]">
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#FFF4B0] via-[#D4AF37] to-[#9A6C08] text-[#0b0b09]">
                    {user?.profileImage ? <img src={user.profileImage} alt="" className="h-full w-full object-cover" /> : <User size={16} />}
                  </span>
                  <span className="hidden max-w-28 truncate text-sm font-semibold text-white xl:block">{user?.name || "Profile"}</span>
                  <ChevronDown size={15} className={`text-slate-500 transition ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#14140f] p-2 shadow-2xl shadow-black/30">
                    <div className="border-b border-white/[0.06] px-3 py-3">
                      <p className="truncate text-sm font-bold text-white">{user?.name || "Candidate"}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{user?.email || ""}</p>
                    </div>
                    <Link to="/candidate" onClick={() => setIsProfileOpen(false)} className="mt-2 flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white"><LayoutDashboard size={17} /> Dashboard</Link>
                    <Link to="/candidate/saved-jobs" onClick={() => setIsProfileOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white"><Bookmark size={17} /> Saved jobs</Link>
                    <button onClick={handleLogout} disabled={isLoading} className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-red-400 hover:bg-red-500/10 disabled:opacity-50"><LogOut size={17} /> {isLoading ? "Logging out…" : "Log out"}</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {user ? (
              <Link to="/candidate" aria-label="Open profile" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] text-white">
                {user?.profileImage ? <img src={user.profileImage} alt="" className="h-full w-full object-cover" /> : <User size={18} />}
              </Link>
            ) : (
              <button onClick={() => setIsLoginCard(true)} aria-label="Log in" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-200"><LogIn size={18} /></button>
            )}
          </div>
        </nav>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/[0.08] bg-[#080806]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid h-[68px] max-w-lg px-1" style={{ gridTemplateColumns: `repeat(${mobileLinks.length}, minmax(0, 1fr))` }}>
          {mobileLinks.map((item) => {
            const Icon = item.icon;
            if (item.action) return <button key={item.name} onClick={item.action} className="flex flex-col items-center justify-center gap-1 text-slate-500"><Icon size={20} /><span className="text-[10px] font-semibold">{item.name}</span></button>;
            return <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex flex-col items-center justify-center gap-1 ${isActive ? "text-[#F5D76E]" : "text-slate-500"}`}><Icon size={20} strokeWidth={2.2} /><span className="text-[10px] font-semibold">{item.name}</span></NavLink>;
          })}
        </div>
      </nav>

      {isLoginCard && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm" onClick={() => setIsLoginCard(false)}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}><AuthPage onClose={() => setIsLoginCard(false)} /></div>
        </div>
      )}
    </>
  );
};

export default Header;
