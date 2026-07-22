"use client";

import { useEffect, useState } from "react";

export type TimerPhase = "idle" | "focus" | "break";
export type TimerMode = "default" | "custom";

const FOCUS_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;
const CYCLES_BEFORE_LONG_BREAK = 4;

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

export function useFocusTimer() {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [mode, setMode] = useState<TimerMode>("default");
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [customFocusMinutes, setCustomFocusMinutes] = useState(25);
  const [customBreakMinutes, setCustomBreakMinutes] = useState(5);
  const [now, setNow] = useState(() => Date.now());

  // Re-render every 250ms while running so the displayed countdown stays
  // current; the countdown value itself always comes from endTime - now,
  // never from decrementing a counter, so background-tab throttling of
  // this interval cannot cause drift.
  useEffect(() => {
    if (phase === "idle") return;
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [phase]);

  // Fire the focus<->break transition exactly once when the countdown
  // reaches 0. Each transition pushes endTime back into the future, so
  // this condition naturally stops being true until the next real
  // completion — no separate "already fired" flag needed.
  useEffect(() => {
    if (phase === "idle" || endTime === null) return;
    if (endTime - now > 0) return;

    if (phase === "focus") {
      const breakMinutes =
        mode === "default"
          ? currentCycle === CYCLES_BEFORE_LONG_BREAK
            ? LONG_BREAK_MINUTES
            : SHORT_BREAK_MINUTES
          : customBreakMinutes;
      setPhase("break");
      setEndTime(Date.now() + breakMinutes * 60_000);
      speak("take a break now");
    } else if (phase === "break") {
      if (mode === "default") {
        setCurrentCycle((cycle) =>
          cycle === CYCLES_BEFORE_LONG_BREAK ? 1 : cycle + 1,
        );
      }
      const focusMinutes = mode === "default" ? FOCUS_MINUTES : customFocusMinutes;
      setPhase("focus");
      setEndTime(Date.now() + focusMinutes * 60_000);
      speak("break is over, start next focus");
    }
  }, [now, phase, endTime, mode, currentCycle, customFocusMinutes, customBreakMinutes]);

  function start() {
    const focusMinutes = mode === "default" ? FOCUS_MINUTES : customFocusMinutes;
    setCurrentCycle(1);
    setPhase("focus");
    setEndTime(Date.now() + focusMinutes * 60_000);
  }

  function stop() {
    setPhase("idle");
    setEndTime(null);
    setCurrentCycle(1);
  }

  const remainingMs =
    phase === "idle" || endTime === null ? 0 : Math.max(0, endTime - now);

  return {
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
  };
}
