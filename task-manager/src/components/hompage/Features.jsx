export default function Features() {
  const features = [
    {
      title: "Create & Manage Tasks",
      description:
        "Easily create, update, and delete tasks with priorities and deadlines.",
      icon: "📝",
    },
    {
      title: "Assign to Users",
      description: "Assign tasks to team members and keep everyone aligned.",
      icon: "👥",
    },
    {
      title: "Track Progress Visually",
      description:
        "Visual indicators, statuses, and dashboards help you stay on top of work.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
