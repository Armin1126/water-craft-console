import { useState, useEffect } from "react";
import { useSensorData } from "../../hooks/useSensorData.js";
import { useAlertWorkflow } from "../../hooks/useAlertWorkflow.js";
import { SCENARIOS } from "../../types/sensor.js";
import { Sidebar } from "./Sidebar.jsx";
import { TopBar } from "./TopBar.jsx";
import { SystemStatus } from "./SystemStatus.jsx";
import { SensorCards } from "./SensorCards.jsx";
import { Charts } from "./Charts.jsx";
import { TreatmentPipeline } from "./TreatmentPipeline.jsx";
import { Verification } from "./Verification.jsx";
import { Energy } from "./Energy.jsx";
import { SettingsModal } from "./SettingsModal.jsx";
import { KeyButton, Stamp } from "../ui-industrial/Primitives.jsx";

const LABELS = {
  NOMINAL: "Nominal",
  TURBID_INTAKE: "Turbid intake",
  HIGH_TDS: "High TDS",
  LOW_BATTERY: "Low battery",
};

export function Dashboard() {
  const { data, history, secondsAgo, scenario, setScenario } = useSensorData();
  const alertWorkflow = useAlertWorkflow(data);
  const [activeSection, setActiveSection] = useState("overview");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Scroll spy to highlight current section in navigation
  useEffect(() => {
    const sectionIds = ["overview", "water-quality", "treatment", "energy"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-chassis lg:flex">
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <main className="min-w-0 flex-1 px-4 pb-16 pt-4 sm:px-8 lg:pt-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-16 lg:gap-24">
          <TopBar
            deviceId={data?.deviceId ?? "UNIT-001"}
            secondsAgo={secondsAgo}
            alertWorkflow={alertWorkflow}
          />

          <div className="-mt-10 flex flex-wrap items-center gap-3 rounded-xl bg-chassis px-4 py-3 shadow-recessed lg:-mt-16">
            <Stamp className="text-[0.55rem]">
              Intake Condition Profile
            </Stamp>
            <div className="flex flex-wrap gap-2">
              {SCENARIOS.map((s) => (
                <KeyButton
                  key={s}
                  accent={s === scenario}
                  active={s === scenario}
                  onClick={() => setScenario(s)}
                >
                  {LABELS[s]}
                </KeyButton>
              ))}
            </div>
          </div>

          {data ? (
            <>
              <div id="overview" className="scroll-mt-6">
                <SystemStatus data={data} />
              </div>

              <div id="water-quality" className="flex scroll-mt-6 flex-col gap-16 lg:gap-24">
                <SensorCards data={data} history={history} secondsAgo={secondsAgo} />
                <Charts history={history} />
              </div>

              <div id="treatment" className="flex scroll-mt-6 flex-col gap-16 lg:gap-24">
                <TreatmentPipeline data={data} />
                <Verification data={data} />
              </div>

              <div id="energy" className="scroll-mt-6">
                <Energy data={data} />
              </div>
            </>
          ) : (
            <p className="stamp text-xs">Initialising sensor array…</p>
          )}
        </div>
      </main>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
