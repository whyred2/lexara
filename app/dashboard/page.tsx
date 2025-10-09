import { NavList } from "@/components/home/auth/nav-list";
import { ToDoSection } from "@/components/home/auth/todo-section";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen gap-2 overflow-hidden">
      <NavList />
      <ToDoSection />
    </div>
  );
}
