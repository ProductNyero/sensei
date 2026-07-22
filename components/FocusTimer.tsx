"use client";

import { useFocusTimer } from "@/hooks/useFocusTimer";
import InfoTooltip from "@/components/InfoTooltip";

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function FocusTimer() {
  const {
    phase,
    mode,
    setMode,
    currentCycle,
    customFocusMinutes,
    setCustomFocusMinutes,
    customBreakMinutes,
    setCustomBreakMinutes,
    remainingMs,
    start,
    stop,
  } = useFocusTimer();

  return (
    <div className="mt-8 rounded-lg border border-gray-300 bg-white p-4">
      <div className="mb-4 flex items-center gap-1.5">
        <h2 className="text-xl font-bold">Focus timer</h2>
        <InfoTooltip text="Default mode uses the traditional Pomodoro technique: 25-minute focus sessions with 5-minute breaks, and a longer 15-minute break every 4 sessions. Custom mode lets you set your own focus and break durations." />
      </div>

      {phase === "idle" && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="timer-mode"
                checked={mode === "default"}
                onChange={() => setMode("default")}
              />
              Default (25 min focus / 5 min break)
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="timer-mode"
                checked={mode === "custom"}
                onChange={() => setMode("custom")}
              />
              Custom
            </label>
          </div>

          {mode === "custom" && (
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                Focus (min)
                <input
                  type="number"
                  min={1}
                  value={customFocusMinutes}
                  onChange={(e) =>
                    setCustomFocusMinutes(Number(e.target.value) || 1)
                  }
                  className="w-16 rounded border border-gray-300 bg-white px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-2">
                Break (min)
                <input
                  type="number"
                  min={1}
                  value={customBreakMinutes}
                  onChange={(e) =>
                    setCustomBreakMinutes(Number(e.target.value) || 1)
                  }
                  className="w-16 rounded border border-gray-300 bg-white px-2 py-1"
                />
              </label>
            </div>
          )}

          <button
            onClick={start}
            className="w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Start
          </button>
        </div>
      )}

      {phase !== "idle" && (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium uppercase text-gray-500">
            {phase === "focus" ? "Focus" : "Break"}
            {mode === "default" && ` · Cycle ${currentCycle} of 4`}
          </div>
          <div className="text-4xl font-bold tabular-nums">
            {formatTime(remainingMs)}
          </div>
          <button
            onClick={stop}
            className="w-fit rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
