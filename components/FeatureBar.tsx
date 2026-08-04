import {
  Glasses,
  Eye,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default function FeatureBar() {
  const features = [
    {
      icon: <Eye size={34} />,
      title: "Computerised Eye Testing",
      desc: "Advanced eye examination with modern equipment.",
    },
    {
      icon: <Glasses size={34} />,
      title: "Premium Frames",
      desc: "Large collection of stylish & branded eyewear.",
    },
    {
      icon: <BadgeCheck size={34} />,
      title: "Quality Assurance",
      desc: "High-quality lenses and trusted optical products.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Expert Consultation",
      desc: "Professional guidance from experienced doctors.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex rounded-full bg-blue-100 p-4 text-[#0A2E73]">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#0A2E73]">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}