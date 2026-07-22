\# Project: Sensei

A single-user productivity web app that pairs a priority-ranked to-do list  
with a Pomodoro-style focus timer. The core bet: to-do apps fail because  
they don't help people \*stick with\* the list, not because listing is hard.

\#\# Stack  
\- Next.js (App Router) \+ React  
\- Tailwind CSS for styling  
\- No backend, no database, no auth for v1 — all state lives in the  
  browser via localStorage. Do not add a server, API routes for data  
  persistence, or a database unless explicitly asked.
  
\#\# Core features
1. **To-do list**: each item has a `task` (the to-do text, e.g. "create a
   content plan for LinkedIn"), a `goal` (the overarching goal this task
   serves, e.g. "be consistent on LinkedIn" — set by the user when
   creating the task, displayed as a smaller footnote beneath the task
   text), and a `priority` level. Items for "today" can be reordered by
   drag-and-drop (use `@dnd-kit/core` — don't hand-roll drag logic).
2. **Completion**: marking a to-do done shows a confirmation state using
   the `goal` field (NOT the task text): "Goal smashed: <goal>".
3\. \*\*Focus timer\*\*: a state machine with three states — \`idle\`, \`focus\`,  
   \`break\`. An explicit "Start" button transitions idle → focus.  
   \- Default (Pomodoro) mode: 40 min focus → 20 min break, repeating.  
   \- Custom mode: user sets their own focus duration and break duration.  
   \- On focus reaching 0: auto-transition to break, play "take a break  
     now" via the SpeechSynthesis API.  
   \- On break reaching 0: auto-transition to focus, play "break is over,  
     start next focus" via the SpeechSynthesis API.

## Visual design
- Page background: warm mustard yellow (#F2C14E), with a subtle grid-line
  texture overlay (thin lines, low-opacity brown, ~32px spacing)
- Hero section at top: small "Sensei" wordmark (top-left), centered large
  bold headline "Welcome, Sensei", a coffee cup icon with a few subtle
  steam wisps beneath the headline, and sub-hero copy beneath that:
  "Turn tasks into focused work sessions with clear goals, priorities,
  and timers that keep you on track."
- To-do list cards: DO NOT redesign — keep the existing style exactly as
  built (white background, bordered rounded cards, drag handle, checkbox,
  colored priority pill — light bg/dark text per level, task title bold
  with goal as a smaller gray footnote beneath, Edit/Delete text links
  on the right)
- Timer section: white bordered card matching the to-do list card style,
  with an info icon next to the "Focus timer" label that opens a tooltip
  on click containing: "Default mode uses the traditional Pomodoro
  technique: 25-minute focus sessions with 5-minute breaks, and a longer
  15-minute break every 4 sessions. Custom mode lets you set your own
  focus and break durations."

\#\# Conventions  
\- Timer countdowns MUST be computed from a stored end-timestamp  
  (\`endTime \- Date.now()\`) checked on each render/tick, never from a  
  decrementing counter — setInterval is throttled on background tabs and  
  a counter will drift.  
\- The audio/voice alert only works after a user gesture (browser  
  autoplay policy). The initial "Start" click is that gesture; don't  
  add a workaround for the very first sound — it's expected to require  
  the click.  
\- Keep components small and single-purpose. Prefer plain React state  
  (useState/useReducer) over any state management library — this app's  
  state is small enough not to need one.

\#\# Off-limits (for v1)  
\- No backend, no API routes, no database, no user accounts.  
\- No third-party timer/notification libraries — the state machine above  
  is simple enough to write directly.  
