export default function AdminDashboard() {
  const cards = [
    {
      title: "Total Products",
      value: "0",
    },
    {
      title: "Categories",
      value: "0",
    },
    {
      title: "Total Stock",
      value: "0",
    },
    {
      title: "Featured",
      value: "0",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#0A2E73]">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow"
          >
            <h3 className="text-gray-500">
              {card.title}
            </h3>

            <h2 className="mt-3 text-4xl font-bold text-[#0A2E73]">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}