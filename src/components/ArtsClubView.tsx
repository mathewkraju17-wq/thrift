import React, { useState } from 'react';
import { Palette, Sparkles, Heart, Award, ArrowRight, ShieldCheck, Brush } from 'lucide-react';
import { MarketplaceItem } from '../types';

interface ArtsClubViewProps {
  items: MarketplaceItem[];
  onSelectItem: (item: MarketplaceItem) => void;
  onNavigateToSell: () => void;
  onToggleFavorite: (itemId: string) => void;
  favoriteIds: Set<string>;
}

export const ArtsClubView: React.FC<ArtsClubViewProps> = ({
  items,
  onSelectItem,
  onNavigateToSell,
  onToggleFavorite,
  favoriteIds,
}) => {
  const [selectedSubfilter, setSelectedSubfilter] = useState<'all' | 'pottery' | 'prints' | 'wearables'>('all');

  // Filter for Arts Club items or related handcrafted student art
  const artsItems = items.filter(item => item.isArtsClub || item.category === 'arts_club');

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Arts Guild Hero Spotlight */}
      <section className="px-4 pt-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#392100] via-[#563500] to-[#1e4334] text-white p-5 shadow-md">
          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffddb6] text-[#2a1800] text-[11px] font-display font-bold shadow-xs">
                <Palette className="w-3.5 h-3.5 fill-current" />
                <span>Fine Arts Guild Drop #04</span>
              </span>
              <span className="text-[11px] bg-white/15 px-2.5 py-0.5 rounded-full font-display font-medium text-[#ffddb6] backdrop-blur-sm">
                Spring Showcase
              </span>
            </div>

            <div>
              <h1 className="font-display font-extrabold text-2xl text-white tracking-tight leading-tight">
                Student Makers & Guild Drops
              </h1>
              <p className="text-[13px] text-[#ffddb6]/90 mt-1 leading-relaxed">
                Direct peer-to-peer support for university painters, ceramicists, and garment customizers.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 flex items-center gap-2.5 text-[12px] text-white">
              <Award className="w-4 h-4 text-[#ffb95a] shrink-0" />
              <span>
                <strong>Honor Code Royalty:</strong> 70% goes directly to the student artisan, 30% funds community ceramics glaze & print supplies.
              </span>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#ffddb6]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authentic campus origin verified</span>
              </div>
              <button 
                onClick={onNavigateToSell}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ffddb6] text-[#2a1800] font-display font-bold text-xs hover:bg-[#ffb95a] transition-all shadow-sm"
              >
                <span>Submit Art</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
            <Brush className="w-36 h-36 text-white" />
          </div>
        </div>
      </section>

      {/* Subcategory Pills */}
      <section className="px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Creations (18)' },
            { id: 'pottery', label: '🏺 Studio Stoneware' },
            { id: 'prints', label: '🖼️ Linocut & Canvas' },
            { id: 'wearables', label: '👕 Screenprinted Tees' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubfilter(tab.id as any)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full font-display text-xs font-semibold transition-all ${
                selectedSubfilter === tab.id
                  ? 'bg-[#563500] text-white shadow-xs'
                  : 'bg-slate-200/80 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Arts Showcase Items Grid */}
      <section className="px-4 pt-1 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {artsItems.map(item => {
            const isFav = favoriteIds.has(item.id);

            return (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-amber-900/10 transition-all cursor-pointer group"
              >
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffddb6] text-[#2a1800] text-[9px] font-display font-bold shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" /> Handmade
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-[#d91b1b] transition-colors shadow-xs"
                    aria-label="Favorite"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#d91b1b] text-[#d91b1b]' : ''}`} />
                  </button>

                  <div className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-display font-bold bg-[#1e4334] text-[#c3ecd6] shadow-xs">
                      ✨ Grade: Excellent
                    </span>
                  </div>
                </div>

                <div className="p-2.5 flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">
                        Fine Arts Guild
                      </span>
                      <span className="font-display font-extrabold text-[16px] text-[#042d1f]">
                        ${item.price}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-[13px] leading-snug line-clamp-1 mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between bg-amber-50/60 px-2 py-1.5 rounded-lg border border-amber-100/60">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[9px] font-bold shrink-0">
                        {item.sellerName[0]}
                      </div>
                      <span className="text-[11px] text-slate-800 font-medium truncate">
                        {item.sellerName}
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-900 font-semibold truncate shrink-0">
                      Fine Arts
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
