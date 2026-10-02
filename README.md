# Sensei

A productivity web app that combines a goal-based to-do list with a Pomodoro-style focus timer.

## Why I built it

I created Sensei around a simple idea: writing a to-do list is easy; following through is harder. The app brings goals, priorities, and timed work sessions into one place to help users turn their plans into focused work.

## Features

- **Tasks with purpose:** Add a task and the broader goal it supports.
- **Priority levels:** Set each task to low, medium, or high priority.
- **Flexible ordering:** Drag and drop unfinished tasks to arrange the list.
- **Task management:** Edit, delete, complete, or undo completion. Completed tasks show a confirmation using their associated goal.
- **Focus timer:** Run 25-minute focus sessions with 5-minute breaks and a 15-minute break after every four focus sessions.
- **Custom sessions:** Choose your own focus and break durations.
- **Spoken reminders:** Receive browser voice alerts when it is time to take a break or start the next focus session.
- **Saved tasks:** Tasks persist in the same browser using localStorage.

## Tools and implementation

| Tool | Use |
| --- | --- |
| Next.js 15 with App Router | Application framework and page structure |
| React 19 and TypeScript | Interactive components, state, and typed task data |
| Tailwind CSS | Styling |
| dnd-kit | Drag-and-drop task ordering |
| Lucide React | Icons |
| Browser localStorage | Task persistence |
| Browser SpeechSynthesis API | Spoken timer reminders |

The app runs without a backend, database, or user accounts. React hooks manage the task list and timer. The countdown uses an end timestamp rather than a decrementing counter to reduce drift when browser tabs are inactive.
