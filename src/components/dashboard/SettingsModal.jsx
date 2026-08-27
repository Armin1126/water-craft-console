import { useState } from "react";
import {
  Settings,
  X,
  Cpu,
  Radio,
  Sliders,
  ShieldCheck,
  Volume2,
  VolumeX,
  Power,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { KeyButton, Led, Stamp, IconHousing } from "../ui-industrial/Primitives.jsx";

export function SettingsModal({ open, onClose }) {
  const [standard, setStandard] = useState("BIS");
  const [rate, setRate] = useState("2s");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [solenoidOpen, setSolenoidOpen] = useState(true);
  const [selfTestRunning, setSelfTestRunning] = useState(false);
  const [selfTestComplete, setSelfTestComplete] = useState(false);

  if (!open) return null;

  const runSelfTest = () => {
    setSelfTestRunning(true);
    setSelfTestComplete(false);
    setTimeout(() => {
      setSelfTestRunning(false);
      setSelfTestComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-panel p-6 shadow-floating sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-5">
          <div className="flex items-center gap-3">
            <IconHousing icon={Settings} />
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-ink sm:text-lg">
                Device Configuration & Diagnostics
              </h2>
              <Stamp className="block">W.I.S.E UNIT-001 · System Parameters</Stamp>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Settings"
            className="press grid h-10 w-10 place-items-center rounded-xl bg-chassis text-ink-muted shadow-card hover:text-ink"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 flex max-h-[70vh] flex-col gap-6 overflow-y-auto pr-1">
          {/* Hardware & Telemetry Specs */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-chassis p-4 shadow-recessed">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-ink-muted" />
                <Stamp className="text-[0.55rem]">Firmware OS</Stamp>
              </div>
              <p className="mt-2 font-mono text-xs font-bold text-ink">v2.4.1 (Build 890)</p>
              <Stamp className="text-[0.52rem]">ESP32-S3 Dual Core</Stamp>
            </div>
            <div className="rounded-xl bg-chassis p-4 shadow-recessed">
              <div className="flex items-center gap-2">
                <Radio size={14} className="text-ink-muted" />
                <Stamp className="text-[0.55rem]">Uplink Channel</Stamp>
              </div>
              <p className="mt-2 font-mono text-xs font-bold text-ink">MQTT / Cellular LTE</p>
              <div className="mt-1 flex items-center gap-1.5">
                <Led tone="ok" />
                <Stamp className="text-[0.52rem]">Signal: -68 dBm (Strong)</Stamp>
              </div>
            </div>
            <div className="rounded-xl bg-chassis p-4 shadow-recessed">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-ink-muted" />
                <Stamp className="text-[0.55rem]">Purification Gate</Stamp>
              </div>
              <p className="mt-2 font-mono text-xs font-bold text-ink">Dual-Check Interlock</p>
              <Stamp className="text-[0.52rem]">Auto-Shutoff Active</Stamp>
            </div>
          </div>

          {/* Water Quality Standards Preset */}
          <div className="rounded-xl bg-chassis p-4 shadow-recessed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders size={15} className="text-ink-muted" />
                <p className="stamp text-[0.68rem] text-ink">Compliance Standard</p>
              </div>
              <Stamp className="text-[0.55rem]">Threshold Benchmark</Stamp>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <KeyButton
                accent={standard === "BIS"}
                active={standard === "BIS"}
                onClick={() => setStandard("BIS")}
                className="text-xs"
              >
                BIS IS-10500:2012 (India)
              </KeyButton>
              <KeyButton
                accent={standard === "WHO"}
                active={standard === "WHO"}
                onClick={() => setStandard("WHO")}
                className="text-xs"
              >
                WHO Potable Guidelines
              </KeyButton>
              <KeyButton
                accent={standard === "CUSTOM"}
                active={standard === "CUSTOM"}
                onClick={() => setStandard("CUSTOM")}
                className="text-xs"
              >
                Custom Field Limits
              </KeyButton>
            </div>
          </div>

          {/* Telemetry Reporting Frequency */}
          <div className="rounded-xl bg-chassis p-4 shadow-recessed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-ink-muted" />
                <p className="stamp text-[0.68rem] text-ink">Telemetry Refresh Interval</p>
              </div>
              <Stamp className="text-[0.55rem]">Sensor Polling Cycle</Stamp>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { id: "1s", label: "1s (High Precision)" },
                { id: "2s", label: "2s (Default Stream)" },
                { id: "10s", label: "10s (Bandwidth Saver)" },
                { id: "30s", label: "30s (Eco Low Power)" },
              ].map((item) => (
                <KeyButton
                  key={item.id}
                  accent={rate === item.id}
                  active={rate === item.id}
                  onClick={() => setRate(item.id)}
                  className="text-xs"
                >
                  {item.label}
                </KeyButton>
              ))}
            </div>
          </div>

          {/* System Hardware Controls */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Inlet Solenoid Valve */}
            <div className="flex items-center justify-between rounded-xl bg-chassis p-4 shadow-recessed">
              <div>
                <p className="stamp text-[0.68rem] text-ink">Inlet Solenoid Valve</p>
                <Stamp className="text-[0.55rem]">
                  {solenoidOpen ? "Flow Enabled (Normal)" : "EMERGENCY SHUT-OFF CLOSED"}
                </Stamp>
              </div>
              <button
                type="button"
                onClick={() => setSolenoidOpen(!solenoidOpen)}
                className={`press flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
                  solenoidOpen ? "bg-panel text-ink shadow-card" : "bg-accent text-white shadow-pressed"
                }`}
              >
                <Power size={14} />
                {solenoidOpen ? "Open" : "Isolated"}
              </button>
            </div>

            {/* Audio Alarm */}
            <div className="flex items-center justify-between rounded-xl bg-chassis p-4 shadow-recessed">
              <div>
                <p className="stamp text-[0.68rem] text-ink">Acoustic Alarm Tone</p>
                <Stamp className="text-[0.55rem]">
                  {soundEnabled ? "Audible on Critical Alert" : "Silent (Visual LED only)"}
                </Stamp>
              </div>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="press flex items-center gap-2 rounded-lg bg-panel px-3 py-2 text-xs font-bold text-ink shadow-card"
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                {soundEnabled ? "Enabled" : "Muted"}
              </button>
            </div>
          </div>

          {/* Self-Test Diagnostic Button */}
          <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-chassis p-4 shadow-recessed sm:flex-row">
            <div className="min-w-0">
              <p className="stamp text-[0.68rem] text-ink">Hardware Self-Test Diagnostic</p>
              <Stamp className="text-[0.55rem]">
                Sweep 7 sensor channels, optical density, and pressure transducer
              </Stamp>
            </div>
            <button
              type="button"
              onClick={runSelfTest}
              disabled={selfTestRunning}
              className="press flex shrink-0 items-center gap-2 rounded-lg bg-panel px-4 py-2.5 text-xs font-bold text-ink shadow-card disabled:opacity-50"
            >
              {selfTestRunning ? (
                <>
                  <Activity size={14} className="animate-spin text-accent" />
                  Testing...
                </>
              ) : selfTestComplete ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Passed (7/7 OK)
                </>
              ) : (
                <>
                  <Activity size={14} className="text-accent" />
                  Run Self-Test
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
          <div className="flex items-center gap-2">
            <Led tone="ok" />
            <Stamp className="text-[0.6rem]">W.I.S.E Engine Synchronized</Stamp>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="press rounded-lg bg-panel px-5 py-2 text-xs font-bold text-ink shadow-card"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
