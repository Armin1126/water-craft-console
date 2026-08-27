import { useState } from "react";
import { Droplets, Gauge, FlaskConical, Zap, Settings, Menu, X } from "lucide-react";
import { Led, Stamp } from "../ui-industrial/Primitives.jsx";

const NAV = [
  { id: "overview", label: "Dashboard", icon: Gauge },
  { id: "water-quality", label: "Water Quality", icon: Droplets },
  { id: "treatment", label: "Treatment", icon: FlaskConical },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "settings", label: "Settings", icon: Settings },
];

function NavList({ activeSection, onNavigate, onOpenSettings, onPickMobile }) {
  return (
    <nav className="flex flex-col gap-2">
      {NAV.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.id === "settings") {
                onOpenSettings();
              } else {
                onNavigate(item.id);
              }
              if (onPickMobile) onPickMobile();
            }}
            className={`press flex min-h-12 w-full items-center gap-3 rounded-lg px-4 text-left transition-all ${
              isActive
                ? "bg-chassis shadow-pressed"
                : "bg-panel text-ink-muted shadow-card hover:text-ink"
            }`}
          >
            <item.icon
              strokeWidth={1.5}
              size={18}
              className={`shrink-0 ${isActive ? "text-accent" : "text-ink-muted"}`}
            />
            <span
              className={`stamp min-w-0 flex-1 truncate text-[0.7rem] ${
                isActive ? "font-bold text-ink" : "text-ink-muted"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-panel shadow-floating">
        <Droplets strokeWidth={1.5} size={20} className="text-accent" />
      </span>
      <div className="min-w-0">
        <p className="stamp truncate text-sm font-extrabold tracking-wider text-ink">W.I.S.E</p>
        <p className="stamp truncate text-[0.52rem] leading-tight text-accent">WATER INTELLIGENCE & SURVEILLANCE ENGINE</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="rounded-xl bg-chassis p-4 shadow-recessed">
      <p className="stamp text-[0.7rem] text-ink">UNIT-001</p>
      <p className="mt-1 text-[0.65rem] text-ink-muted">W.I.S.E Treatment Unit</p>
      <div className="mt-3 flex items-center gap-2">
        <Led tone="ok" />
        <Stamp className="text-[0.6rem]">Live Surveillance</Stamp>
      </div>
    </div>
  );
}

export function Sidebar({ activeSection = "overview", onNavigate = () => {}, onOpenSettings = () => {} }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between bg-chassis p-6 lg:flex">
        <div className="flex flex-col gap-8">
          <Brand />
          <NavList
            activeSection={activeSection}
            onNavigate={onNavigate}
            onOpenSettings={onOpenSettings}
          />
        </div>
        <Footer />
      </aside>

      {/* Mobile top nav */}
      <div className="sticky top-0 z-30 bg-chassis px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-panel p-3 shadow-card">
          <Brand />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="press grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-panel shadow-card"
          >
            {open ? (
              <X strokeWidth={1.5} size={18} className="text-ink" />
            ) : (
              <Menu strokeWidth={1.5} size={18} className="text-ink" />
            )}
          </button>
        </div>
        {open && (
          <div className="mt-3 flex flex-col gap-4 rounded-xl bg-panel p-4 shadow-card">
            <NavList
              activeSection={activeSection}
              onNavigate={onNavigate}
              onOpenSettings={onOpenSettings}
              onPickMobile={() => setOpen(false)}
            />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
