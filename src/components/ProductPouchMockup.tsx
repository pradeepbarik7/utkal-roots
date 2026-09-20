import React, { useState } from 'react';
import { Leaf, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface ProductPouchMockupProps {
  type: 'black-rice' | 'white-rice' | 'duo';
  className?: string;
  imageSrc?: string;
  productName?: string;
}

export const ProductPouchMockup: React.FC<ProductPouchMockupProps> = ({
  type,
  className = '',
  imageSrc,
  productName
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  // Fallback candidate paths for image lookup
  const candidateUrls = React.useMemo(() => {
    const list: string[] = [];
    if (imageSrc) list.push(imageSrc);
    if (type === 'white-rice') {
      list.push(
        '/White Rice.png',
        '/White%20Rice.png',
        '/assets/White Rice.png',
        '/assets/White%20Rice.png',
        '/white-rice.png',
        '/assets/white-rice.png'
      );
    } else if (type === 'black-rice') {
      list.push(
        '/Black Rice.png',
        '/Black%20Rice.png',
        '/assets/Black Rice.png',
        '/assets/Black%20Rice.png',
        '/black-rice.png',
        '/assets/black-rice.png'
      );
    } else {
      list.push(
        '/Both Rice.png',
        '/Both%20Rice.png',
        '/assets/Both Rice.png',
        '/assets/Both%20Rice.png',
        '/both-rice.png',
        '/assets/both-rice.png'
      );
    }
    return Array.from(new Set(list));
  }, [imageSrc, type]);

  const handleImageError = () => {
    if (srcIndex + 1 < candidateUrls.length) {
      setSrcIndex(srcIndex + 1);
    } else {
      setAllFailed(true);
    }
  };

  const handleImageLoad = () => {
    setHasLoaded(true);
  };

  // If a real photo was found and loaded successfully
  if (!allFailed && candidateUrls.length > 0) {
    return (
      <div
        className={`relative w-full aspect-4/3 flex items-center justify-center overflow-hidden rounded-2xl bg-[#EDE4D5] p-2 transition-all duration-300 group ${className}`}
      >
        {/* Subtle jute burlap woven background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8C411E_1px,transparent_1px)] [background-size:10px_10px]" />

        <img
          src={candidateUrls[srcIndex]}
          alt={productName || (type === 'black-rice' ? 'Utkal Roots Organic Black Rice' : type === 'white-rice' ? 'Utkal Roots Odisha Indrayani-Style Rice' : 'Utkal Roots Heritage Duo Pack')}
          onError={handleImageError}
          onLoad={handleImageLoad}
          referrerPolicy="no-referrer"
          className={`relative z-10 w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* If image hasn't finished loading yet, show graphic placeholder underneath */}
        {!hasLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PouchIllustration type={type} />
          </div>
        )}

        {/* Small badge overlay */}
        <div className="absolute bottom-2 left-3 z-20 bg-[#1B4332]/90 backdrop-blur-xs text-[#D8F3DC] text-[10px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-[#2D6A4F]">
          <Leaf className="w-3 h-3 text-[#52B788]" />
          <span>Odisha Harvest</span>
        </div>
      </div>
    );
  }

  // Fallback high-fidelity rendered illustration matching the exact uploaded packaging
  return (
    <div
      className={`relative w-full aspect-4/3 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#EDE4D5] via-[#E5D7C3] to-[#D8C7B0] p-3 transition-all duration-300 group ${className}`}
    >
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#8C411E_1px,transparent_1px)] [background-size:12px_12px]" />
      <PouchIllustration type={type} />
    </div>
  );
};

interface PouchIllustrationProps {
  type: 'black-rice' | 'white-rice' | 'duo';
}

const PouchIllustration: React.FC<PouchIllustrationProps> = ({ type }) => {
  if (type === 'duo') {
    return (
      <div className="relative z-10 flex items-end justify-center -space-x-8 sm:-space-x-12 w-full max-w-sm transition-transform duration-500 group-hover:scale-105">
        {/* Left: Black Rice Pouch */}
        <div className="w-1/2 -rotate-3 transition-transform duration-300 group-hover:-rotate-6">
          <PouchGraphic isBlack={true} mini />
        </div>
        {/* Right: Indrayani White Rice Pouch */}
        <div className="w-1/2 rotate-3 transition-transform duration-300 group-hover:rotate-6">
          <PouchGraphic isBlack={false} mini />
        </div>

        <div className="absolute -bottom-1 z-30 bg-[#B85D34] text-white text-[9px] font-bold px-3 py-0.5 rounded-full shadow-md border border-white/40">
          1+1 Duo Pack • ₹400 Both
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-[230px] transition-transform duration-500 group-hover:scale-105">
      <PouchGraphic isBlack={type === 'black-rice'} />
    </div>
  );
};

interface PouchGraphicProps {
  isBlack: boolean;
  mini?: boolean;
}

const PouchGraphic: React.FC<PouchGraphicProps> = ({ isBlack, mini = false }) => {
  return (
    <div
      className={`relative mx-auto rounded-t-2xl rounded-b-lg shadow-2xl transition-all border overflow-hidden ${
        isBlack
          ? 'bg-[#1C1D21] text-[#F9F6F0] border-[#2E3038]'
          : 'bg-[#C7B59A] text-[#2C231B] border-[#B5A182]'
      } ${mini ? 'p-2.5 text-center' : 'p-3.5 text-center'}`}
      style={{
        boxShadow:
          '0 14px 30px -6px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255,255,255,0.2)'
      }}
    >
      {/* Top Ziplock heat seal with notches */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-black/25 border-b border-black/15 flex items-center justify-between px-2">
        <div className="w-1.5 h-1.5 bg-black/40 rounded-xs" />
        <div className="text-[6.5px] uppercase tracking-widest font-semibold opacity-60">Resealable Pouch</div>
        <div className="w-1.5 h-1.5 bg-black/40 rounded-xs" />
      </div>

      {/* Top Black Header Ribbon */}
      <div className="mt-2.5 mx-auto bg-[#16171A] text-[#E5D7BE] py-0.5 px-3 rounded text-[8.5px] tracking-widest font-serif font-bold uppercase border border-[#3E4048]/40 shadow-xs inline-block">
        UTKAL ROOTS
      </div>

      {/* Main Arch Framed Label - exact match to packaging */}
      <div
        className={`mt-2 p-2 sm:p-2.5 rounded-xl border relative shadow-xs ${
          isBlack
            ? 'bg-[#F2ECE1] text-[#1E231F] border-[#D1B894]'
            : 'bg-[#FDF9F2] text-[#2B231B] border-[#C7B396]'
        }`}
      >
        {/* Vegetarian food mark in corner */}
        <div className="absolute top-1.5 right-1.5 w-3 h-3 border border-[#2D6A4F] p-[1.5px] flex items-center justify-center bg-white rounded-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
        </div>

        {/* Brand Header inside label */}
        <div className="font-serif font-bold text-xs sm:text-sm text-[#1B4332] tracking-tight leading-none mb-1">
          UTKAL ROOTS
        </div>
        <div className="w-12 h-px bg-[#8C411E]/40 mx-auto mb-1" />

        {/* Product Specific Titles */}
        {isBlack ? (
          <div>
            <div className="font-serif font-bold text-[11px] sm:text-[13px] text-[#16171A] leading-tight tracking-tight uppercase">
              ORGANIC BLACK RICE
            </div>
            <div className="mt-1 bg-[#1A1A1E] text-[#D8F3DC] text-[7px] sm:text-[8px] font-semibold tracking-wider py-0.5 px-2 rounded-full uppercase inline-block">
              HARVESTED FROM ODISHA SOIL
            </div>
          </div>
        ) : (
          <div>
            <div className="font-serif text-[8.5px] font-bold text-[#8C411E] tracking-widest uppercase">
              ODISHA
            </div>
            <div className="font-serif font-bold text-[10.5px] sm:text-[12px] text-[#16171A] leading-tight tracking-tight uppercase">
              INDRAYANI-STYLE RICE
            </div>
            <div className="text-[7.5px] font-semibold text-[#665443] tracking-wide uppercase">
              THICK & AROMATIC GRAINS
            </div>
            <div className="mt-1 bg-[#8C411E] text-white text-[7px] sm:text-[7.5px] font-semibold tracking-wider py-0.5 px-2 rounded-full uppercase inline-block">
              HARVESTED FROM ODISHA SOIL
            </div>
          </div>
        )}

        {/* Circular Stamp Seals on Pouch */}
        <div className="my-1.5 flex items-center justify-center gap-2">
          <div className="flex items-center gap-0.5 text-[6.5px] font-bold text-[#8C411E] border border-[#8C411E]/50 rounded-full px-1.5 py-0.5">
            <Award className="w-2 h-2 text-[#8C411E]" />
            <span>CHEMICAL-FREE</span>
          </div>
          <div className="text-[6.5px] font-bold text-[#2D6A4F] border border-[#2D6A4F]/50 rounded-full px-1.5 py-0.5">
            <span>ODISHA SEED</span>
          </div>
        </div>

        {/* Simulated Bowl of Rice & Farmer Graphic (matching uploaded packaging) */}
        <div className="relative mt-1 mx-auto rounded-lg overflow-hidden border border-[#D5C2A7] bg-[#EBE0CD] p-1">
          <div className="flex items-center justify-center gap-2">
            {/* Rice Bowl */}
            <div className="w-10 h-7 rounded-b-full relative overflow-hidden bg-[#593E2B] border border-[#3E291B] shadow-inner shrink-0">
              <div
                className={`absolute inset-x-0 bottom-0 top-1 rounded-t-full flex items-center justify-center ${
                  isBlack ? 'bg-[#221626]' : 'bg-[#FFFDF7]'
                }`}
              >
                <div
                  className={`w-full h-full opacity-60 ${
                    isBlack
                      ? 'bg-[radial-gradient(#4A2B59_1px,transparent_1px)] [background-size:3px_3px]'
                      : 'bg-[radial-gradient(#D2C0A5_1px,transparent_1px)] [background-size:2px_2px]'
                  }`}
                />
              </div>
            </div>

            {/* Farmer Portrait Indicator */}
            <div className="text-left text-[7px] leading-tight text-[#4A3D31]">
              <span className="font-bold block text-[#1B4332]">
                {isBlack ? 'Farmer Couple' : 'Odia Grandmother'}
              </span>
              <span className="text-[6.5px] text-[#7A6B5D]">
                {isBlack ? 'Bargarh Harvest' : 'Dhenkanal Farm'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pouch Bottom Stamp */}
      <div className="mt-1.5 flex items-center justify-between text-[7.5px] font-medium opacity-80 px-1">
        <span className="flex items-center gap-0.5">
          <Leaf className="w-2.5 h-2.5 text-[#52B788]" />
          Neem Care
        </span>
        <span className="font-bold text-[#52B788]">100% Organic</span>
      </div>
    </div>
  );
};
