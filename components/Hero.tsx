import { Coffee } from "lucide-react";

export default function Hero() {
  return (
    <header className="mb-10 flex flex-col items-center">
      <div className="mb-8 w-full text-sm font-semibold tracking-wide text-gray-800">
        Sensei
      </div>

      <h1 className="text-center text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
        Welcome, Sensei
      </h1>

      <div className="relative mt-6 flex h-16 w-16 items-center justify-center">
        <svg
          viewBox="0 0 60 40"
          className="pointer-events-none absolute -top-9 left-1/2 h-10 w-16 -translate-x-1/2 text-gray-700/40"
          fill="none"
        >
          <path
            d="M18 38C14 30 22 26 18 18C14 10 22 6 18 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M30 38C26 30 34 26 30 18C26 10 34 6 30 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M42 38C38 30 46 26 42 18C38 10 46 6 42 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <Coffee className="h-12 w-12 text-gray-900" strokeWidth={1.5} />
      </div>

      <p className="mt-6 max-w-md text-center text-sm text-gray-700">
        Turn tasks into focused work sessions with clear goals, priorities,
        and timers that keep you on track.
      </p>
    </header>
  );
}
