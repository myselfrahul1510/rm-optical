import { Eye, Monitor, Glasses } from "lucide-react";

const tips = [
  {
    icon: Eye,
    title: "Regular Eye Checkup",
    description:
      "Regular eye examinations help detect vision problems early and keep your eyes healthy.",
  },
  {
    icon: Monitor,
    title: "Protect Your Eyes",
    description:
      "Follow the 20-20-20 rule while using digital screens to reduce eye strain.",
  },
  {
    icon: Glasses,
    title: "Choose Right Glasses",
    description:
      "Use quality lenses and frames that match your vision needs and lifestyle.",
  },
];

export default function EyeCareTips() {
  return (
    <section className="bg-gray-50 py-20">

      <div className="container mx-auto px-6">


        {/* Heading */}

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-[#0A2E73] font-semibold uppercase tracking-wide">
            Eye Care Tips
          </p>


          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Take Better Care Of Your Eyes
          </h2>


          <p className="mt-4 text-gray-600">
            Simple habits that help maintain healthy vision and protect your eyes.
          </p>

        </div>



        {/* Cards */}

        <div className="mt-12 grid md:grid-cols-3 gap-8">


          {tips.map((tip, index) => {

            const Icon = tip.icon;

            return (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
              >

                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#0A2E73]/10">
                  <Icon
                    size={28}
                    className="text-[#0A2E73]"
                  />
                </div>


                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {tip.title}
                </h3>


                <p className="mt-3 text-gray-600 leading-relaxed">
                  {tip.description}
                </p>


                <button className="mt-5 text-[#0A2E73] font-semibold">
                  Read More →
                </button>


              </div>

            );

          })}


        </div>


      </div>

    </section>
  );
}