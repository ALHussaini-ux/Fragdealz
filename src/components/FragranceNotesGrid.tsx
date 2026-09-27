import React from 'react';
import { FRAGRANCE_NOTES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { FragranceFamily } from '../types';

export const FragranceNotesGrid: React.FC = () => {
  const { navigateToShop } = useStore();

  const handleNoteClick = (familyName: FragranceFamily) => {
    navigateToShop({ fragranceFamily: [familyName] });
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F7F3EA] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 border-b border-[#E5DFD5] pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 
              className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0B0B0B] font-semibold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Explore by Olfactory Profile
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#8B877F] font-sans">
              Browse fragrances crafted around signature accords and primary raw materials.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FRAGRANCE_NOTES.map((note) => (
            <button
              key={note.name}
              id={`note-card-${note.name.toLowerCase()}`}
              onClick={() => handleNoteClick(note.name)}
              className="group p-4 sm:p-5 bg-white border border-[#E5DFD5] hover:border-[#BF8F4A] rounded-[2px] text-left transition-colors flex flex-col justify-between min-h-[110px]"
            >
              <div>
                <span 
                  className="font-serif text-sm sm:text-base text-[#0B0B0B] font-bold block mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {note.name}
                </span>
                <span className="text-[11px] text-[#8B877F] line-clamp-2 leading-relaxed font-sans">
                  {note.vibe}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#0B0B0B] group-hover:text-[#BF8F4A] font-semibold pt-3 mt-2 border-t border-[#F0EBE1] block font-sans transition-colors">
                View scents →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
