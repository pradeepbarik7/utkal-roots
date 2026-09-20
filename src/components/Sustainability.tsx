import React from 'react';
import { Leaf, Droplets, Recycle, Sun, Shield, Award } from 'lucide-react';

export const Sustainability: React.FC = () => {
  const initiatives = [
    {
      icon: <Droplets className="w-5 h-5 text-[#2D6A4F]" />,
      title: 'Water-Smart SRI Cultivation',
      desc: 'We adopt the System of Rice Intensification (SRI), planting young seedlings spaced wide. This reduces irrigation water consumption by 35% compared to flooded fields.'
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#2D6A4F]" />,
      title: 'Protecting the Mahanadi River Basin',
      desc: 'Because zero synthetic chemical fertilizers or pesticides touch our fields, zero toxic nitrates wash into Odisha’s groundwater, sacred rivers, or the Chilika wetland sanctuary.'
    },
    {
      icon: <Recycle className="w-5 h-5 text-[#2D6A4F]" />,
      title: 'Eco-Conscious Packaging',
      desc: 'Our stand-up pouches and outer dispatch cartons use recyclable food-grade barrier films, natural jute twines, and zero unnecessary plastic wrap.'
    },
    {
      icon: <Sun className="w-5 h-5 text-[#2D6A4F]" />,
      title: '100% Solar-Aided Processing',
      desc: 'Harvested paddy is sun-cured naturally on clean community threshing yards under the golden Odisha sunshine, preserving the grain’s essential volatile aromatic oils.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FBF8F3]" id="sustainability-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5ED] text-[#1B4332] text-xs font-bold uppercase tracking-wider border border-[#CDE5D3]">
            <Leaf className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Earth First Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4332]">
            Farming in Harmony with Odisha’s Ecology
          </h2>
          <p className="text-[#516155] text-sm sm:text-base leading-relaxed">
            Every grain of Utkal Roots rice is harvested with reverent respect for nature, ensuring the soil remains fertile for the next seven generations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E6D7BD] shadow-2xs hover:shadow-md transition-all text-left space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EBF5ED] flex items-center justify-center border border-[#CFE7D6]">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1B4332]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#546458] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EFE5D4] flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F]">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Clean Cycle</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
