import { Tag, Calendar, Repeat, Bell, Users } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Tags & Labels",
      description:
        "Organize tasks with custom tags and labels for easy filtering and prioritization.",
      icon: Tag,
    },
    {
      title: "Deadlines & Scheduling",
      description:
        "Set due dates and reminders to stay on top of your tasks and goals.",
      icon: Calendar,
    },
    {
      title: "Recurring Tasks",
      description:
        "Automate daily, weekly or monthly tasks with recurring schedules.",
      icon: Repeat,
    },
    {
      title: "Reminders & Notifications",
      description:
        "Get timely notifications so nothing slips through the cracks.",
      icon: Bell,
    },
    {
      title: "Collaboration",
      description:
        "Share projects and tasks with team members for seamless collaboration.",
      icon: Users,
    },
  ];

  return (
    <section className="py-20" aria-label="Features">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-lg border border-white/20 bg-white/10 p-6 text-center"
            >
              <Icon className="text-primary mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
