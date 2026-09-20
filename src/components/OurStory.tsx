import React from 'react';
import { Sprout, Bug, HeartHandshake, ShieldCheck, Flower2, Droplets, Sun, CheckCircle2 } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#F5EFEB] border-y border-[#E6D7BD] relative overflow-hidden" id="our-story-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EFE4] text-[#1B4332] text-xs font-bold uppercase tracking-wider border border-[#C6DEC9]">
            <Sprout className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Regenerative Agriculture in Odisha</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4332]">
            Our Story: Homemade Compost & Ancient Neem Care
          </h2>
          <p className="text-[#4E5D52] text-sm sm:text-base leading-relaxed">
            In 1998, on the lush banks of Odisha’s river basins, we refused to introduce industrial synthetic chemical inputs to our heirloom soils. Here is how true chemical-free nourishment thrives.
          </p>
        </div>

        {/* Pillars: Compost, Neem, Farmers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Homemade Compost & Jeevamrut */}
          <div className="bg-white rounded-3xl p-7 border border-[#E3D2BA] shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5ED] flex items-center justify-center text-[#2D6A4F] border border-[#CFE7D6]">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1B4332]">
              1. Vedic Homemade Compost
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5D52] leading-relaxed">
              Every crop cycle begins 45 days before sowing. Our farmers prepare rich <strong>Jeevamrut</strong>—a traditional fermented bio-inoculant crafted from desi cow dung, cow urine, organic jaggery, gram flour, and living soil scooped from beneath ancient banyan trees.
            </p>
            <ul className="space-y-2 text-xs text-[#3C4A40] pt-2 border-t border-[#EFE5D4]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>Restores millions of beneficial soil microbes per gram</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>Zero urea, diammonium phosphate, or synthetic nitrates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>Deep moisture retention requiring 35% less irrigation</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Neem Pest Control */}
          <div className="bg-white rounded-3xl p-7 border border-[#E3D2BA] shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F6ECE0] flex items-center justify-center text-[#B85D34] border border-[#E9D2BC]">
              <Bug className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1B4332]">
              2. Ancient Neem Decoction
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5D52] leading-relaxed">
              Instead of chemical insecticides that wipe out pollinators and poison aquifers, we employ nature’s greatest organic guardian: the indigenous <strong>Neem (Azadirachta indica)</strong> tree found across every village in Odisha.
            </p>
            <ul className="space-y-2 text-xs text-[#3C4A40] pt-2 border-t border-[#EFE5D4]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B85D34] shrink-0" />
                <span>Cold-pressed neem seed cake mixed into the soil root zone</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B85D34] shrink-0" />
                <span>Boiled neem leaf & Karanja oil sprays naturally deter pests</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B85D34] shrink-0" />
                <span>100% harmless to honeybees, ladybugs, and friendly earthworms</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Smallholder Odia Farmers */}
          <div className="bg-white rounded-3xl p-7 border border-[#E3D2BA] shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5ED] flex items-center justify-center text-[#2D6A4F] border border-[#CFE7D6]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1B4332]">
              3. Preserving Odisha Heritage
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5D52] leading-relaxed">
              Odisha is the biological birthplace of thousands of indigenous rice landraces. Utkal Roots works directly with 48 rural farmer families, providing pre-harvest funding, fair premium pricing, and seed saving support.
            </p>
            <ul className="space-y-2 text-xs text-[#3C4A40] pt-2 border-t border-[#EFE5D4]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>Guaranteed 40% above standard MSP direct to farm families</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>Heirloom non-GMO open-pollinated seed preservation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>Solar-dried on village mats to preserve grain vitality</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Farmer Quote Banner */}
        <div className="mt-12 bg-[#1B4332] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#2D6A4F] shrink-0 flex items-center justify-center border-2 border-[#52B788]/40">
            <Flower2 className="w-12 h-12 text-[#D8F3DC]" />
          </div>
          <div className="space-y-2 flex-1">
            <p className="font-serif italic text-lg sm:text-xl text-[#FBF8F3] leading-relaxed">
              "When you feed the soil with love and cow compost, the soil feeds you food with medicine. Chemical rice fills the stomach, but Utkal Roots rice nourishes the soul."
            </p>
            <div className="text-xs text-[#74C69D] font-semibold tracking-wider uppercase">
              — Balaram Sahu, Lead Farmer & Seed Guardian, Bargarh, Odisha
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
