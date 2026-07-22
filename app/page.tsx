import TodoApp from "@/components/TodoApp";
import FocusTimer from "@/components/FocusTimer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <Hero />
      <TodoApp />
      <FocusTimer />
    </main>
  );
}
