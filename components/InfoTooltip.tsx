"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="About the focus timer"
        aria-expanded={isOpen}
        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
      >
        <Info className="h-4 w-4" />
      </button>
      {isOpen && (
        <div
          role="tooltip"
          className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded border border-gray-200 bg-white p-3 text-xs leading-relaxed text-gray-700 shadow-lg"
        >
          {text}
        </div>
      )}
    </div>
  );
}
