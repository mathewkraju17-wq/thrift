import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  Heart, 
  Palette, 
  ShieldCheck, 
  Recycle, 
  PlusCircle, 
  ChevronDown, 
  ArrowRight,
  X,
  Tag,
  Check
} from 'lucide-react';
import { MarketplaceItem, QualityGrade, Category } from '../types';

interface FeedViewProps {
  items: MarketplaceItem[];
  onSelectItem: (item: MarketplaceItem) => void;
  onNavigateToSell: () => void;
  onNavigateToArtsClub: () => void;
  onToggleFavorite: (itemId: string) => void;
  favoriteIds: Set<string>;
}

const CATEGORY_OPTIONS: { id: Category; label: string; shortLabel: string }[] = [
  { id: 'all', label: 'All Categories', shortLabel: 'All' },
  { id: 'apparel', label: '👗 Dresses & Apparel', shortLabel: 'Apparel' },
  { id: 'electronics', label: '⚡ Electronics & Dorm', shortLabel: 'Electronics' },
  { id: 'textbooks', label: '📚 Textbooks & Notes', shortLabel: 'Textbooks' },
  { id: 'arts_club', label: '🎨 Arts Club & Handmade', shortLabel: 'Arts Club' },
  { id: 'dorm_furniture', label: '🛋 Furniture & Misc', shortLabel: 'Furniture' },
];

const POPULAR_SEARCHES = [
  'Denim',
  'Calculator',
  'Ceramic',
  'Dress',
  'Desk Lamp',
  'Textbook',
  'Handmade',
];

export const FeedView: React.FC<FeedViewProps> = ({
  items,
  onSelectItem,
  onNavigateToSell,
  onNavigateToArtsClub,
  onToggleFavorite,
  favoriteIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade | 'all'>('all');
  const [pickupZone, setPickupZone] = useState('Central Campus Quad & Dorms');
  const [isPickupDropdownOpen, setIsPickupDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Filter items by title and category (and description/dorm)
  const filteredItems = items.filter(item => {
    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'arts_club') {
        if (!item.isArtsClub && item.category !== 'arts_club') return false;
      } else if (item.category !== selectedCategory) {
        return false;
      }
    }

    // Condition grade filter
    if (selectedGrade !== 'all' && item.condition !== selectedGrade) {
      return false;
    }

    // Search query: filters by title OR category OR description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q) || item.categoryLabel.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchDorm = item.sellerDorm.toLowerCase().includes(q);
      const matchSeller = item.sellerName.toLowerCase().includes(q);

      if (!matchTitle && !matchCategory && !matchDesc && !matchDorm && !matchSeller) {
        return false;
      }
    }

    return true;
  });

  const getGradeBadge = (condition: QualityGrade) => {
    switch (condition) {
      case 'excellent':
        return {
          bg: 'bg-emerald-600 text-white',
          text: '✨ Grade: Excellent'
        };
      case 'good':
        return {
          bg: 'bg-teal-700 text-white',
          text: '👍 Grade: Good'
        };
      case 'bad':
        return {
          bg: 'bg-amber-600 text-white',
          text: '⚠️ Grade: Bad'
        };
      case 'horrible':
        return {
          bg: 'bg-rose-700 text-white',
          text: '🗑 Horrible (DIY/Parts)'
        };
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGrade('all');
  };

  const currentCategoryLabel = CATEGORY_OPTIONS.find(c => c.id === selectedCategory)?.shortLabel || 'All';

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Search Bar at the Top of FeedView */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 pt-3 pb-2.5 shadow-xs border-b border-slate-200/80 space-y-2.5">
        {/* Main Search Bar with integrated Category Dropdown & Clear */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-slate-100 rounded-2xl px-3 py-2 border border-slate-200 focus-within:bg-white focus-within:border-[#b0000b] focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-2xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            
            <input 
              id="feed-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings by title or category..."
              className="w-full bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />

            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center mr-1 transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            )}

            {/* Quick Category Selector inside the Search Bar */}
            <div className="relative shrink-0 border-l border-slate-200 pl-2 ml-1">
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-display font-bold text-slate-700 hover:text-[#b0000b] py-0.5 px-1 rounded-md transition-colors"
              >
                <Tag className="w-3 h-3 text-[#b0000b]" />
                <span className="truncate max-w-[70px]">{currentCategoryLabel}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute right-0 top-8 z-50 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 flex flex-col gap-0.5 animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-display font-bold text-slate-400 uppercase tracking-wider">
                    Filter by Category
                  </div>
                  {CATEGORY_OPTIONS.map(cat => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`text-left px-3 py-2 text-xs flex items-center justify-between font-medium transition-colors ${
                          isSelected
                            ? 'bg-red-50 text-[#b0000b] font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{cat.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#b0000b] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Reset Filters / Sliders Button */}
          <button 
            type="button"
            onClick={handleClearFilters}
            className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all shrink-0 shadow-2xs relative ${
              selectedCategory !== 'all' || selectedGrade !== 'all' || searchQuery
                ? 'bg-red-50 text-[#b0000b] border-red-200 hover:bg-red-100'
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
            }`}
            title="Reset Search & Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {(selectedCategory !== 'all' || selectedGrade !== 'all' || searchQuery) && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#b0000b] ring-2 ring-white"></span>
            )}
          </button>
        </div>

        {/* Popular Quick Search Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <span className="text-[10px] text-slate-400 font-display font-bold uppercase tracking-wider shrink-0 mr-0.5">
            Quick:
          </span>
          {POPULAR_SEARCHES.map(term => {
            const isMatching = searchQuery.toLowerCase() === term.toLowerCase();
            return (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(isMatching ? '' : term)}
                className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  isMatching
                    ? 'bg-[#b0000b] text-white shadow-2xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {term}
              </button>
            );
          })}
        </div>

        {/* Live Search & Filter Feedback Bar */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedGrade !== 'all') && (
              <span className="text-[#b0000b] font-medium">• Filtered</span>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedGrade !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="text-[11px] font-display font-bold text-[#b0000b] hover:underline"
            >
              Reset All
            </button>
          )}
        </div>
      </section>

      {/* Pickup Radius Selector */}
      <section className="px-4 pt-2.5 pb-1">
        <div className="relative">
          <div 
            onClick={() => setIsPickupDropdownOpen(!isPickupDropdownOpen)}
            className="flex items-center justify-between gap-1 bg-slate-200/70 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[#b0000b] shrink-0 fill-current" />
              <span className="text-[12px] text-slate-600">Pickup Radius:</span>
              <span className="text-[12px] text-slate-900 font-bold truncate">{pickupZone}</span>
            </div>
            <div className="shrink-0 flex items-center gap-0.5 text-slate-500 hover:text-slate-800 text-[11px] font-semibold">
              <span>Change</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {isPickupDropdownOpen && (
            <div className="absolute top-9 left-0 right-0 z-30 bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex flex-col gap-1 animate-in fade-in">
              {['Central Campus Quad & Dorms', 'North Quad & Engineering Foyer', 'Student Union Safe Zone (24/7)', 'All Campus Dorms (1 Mile)'].map(zone => (
                <button
                  key={zone}
                  onClick={() => {
                    setPickupZone(zone);
                    setIsPickupDropdownOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    pickupZone === zone ? 'bg-red-50 text-[#b0000b] font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Arts Club Showcase Spotlight Banner */}
      <section className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e4334] via-[#042d1f] to-[#142f24] text-white p-4 shadow-md">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffddb6] text-[#2a1800] text-[11px] font-display font-bold shadow-xs">
                <Palette className="w-3 h-3 fill-current" />
                <span>Official Arts Club Partner</span>
              </span>
              <span className="text-[11px] font-display font-semibold text-[#c3ecd6] bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                Drop #04
              </span>
            </div>
            <div className="pr-12">
              <h2 className="font-display font-extrabold text-xl text-white tracking-tight leading-tight">
                Arts Club Showcase
              </h2>
              <p className="text-[12px] text-[#a7cfbb] line-clamp-2 mt-0.5 leading-relaxed">
                Hand-thrown stoneware, screenprinted campus gig tees & linocut art prints crafted by university peers.
              </p>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#ffb95a] text-[#2a1800] flex items-center justify-center text-[10px] font-bold shadow-xs">MR</div>
                <div className="w-6 h-6 rounded-full bg-[#fc6f5a] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">AL</div>
                <div className="w-6 h-6 rounded-full bg-[#a7cfbb] text-[#002115] flex items-center justify-center text-[10px] font-bold shadow-xs">+9</div>
                <span className="text-[11px] font-medium text-[#c3ecd6] ml-3">18 exclusive items live</span>
              </div>
              <button 
                onClick={onNavigateToArtsClub}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-[#042d1f] font-display font-bold text-[11px] hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
              >
                <span>Shop Creations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {/* Subtle decorative glow */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#ffb95a]/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -right-2 top-2 opacity-10 pointer-events-none">
            <Palette className="w-24 h-24 text-white" />
          </div>
        </div>
      </section>

      {/* Category Pills (Horizontal Scroll) */}
      <section className="py-2">
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar py-0.5">
          {CATEGORY_OPTIONS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full font-display text-[12px] font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#b0000b] text-white shadow-xs'
                  : 'bg-slate-200/80 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Admin Verified Quality Grade Bar */}
      <section className="px-4 py-1.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#b0000b]" />
            <span className="text-[11px] font-display uppercase tracking-wider font-extrabold text-slate-900">
              Admin Verified Quality
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Campus Audited</span>
        </div>
        {/* Quality Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Grades', activeClass: 'bg-slate-900 text-white' },
            { id: 'excellent', label: '✨ Excellent', activeClass: 'bg-emerald-700 text-white' },
            { id: 'good', label: '👍 Good', activeClass: 'bg-teal-700 text-white' },
            { id: 'bad', label: '⚠️ Bad', activeClass: 'bg-amber-600 text-white' },
            { id: 'horrible', label: '🗑 Horrible (DIY/Parts)', activeClass: 'bg-rose-700 text-white' },
          ].map(grade => (
            <button
              key={grade.id}
              onClick={() => setSelectedGrade(grade.id as any)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-display font-semibold transition-colors ${
                selectedGrade === grade.id
                  ? grade.activeClass
                  : 'bg-slate-200/80 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product Feed Grid */}
      <section className="px-4 pt-2 pb-4">
        {filteredItems.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-200/80 p-6 my-2 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-red-50 text-[#b0000b] flex items-center justify-center mb-2">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-sm">No items found</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
              No campus listings matched <strong className="text-slate-800 font-semibold">{searchQuery ? `"${searchQuery}"` : currentCategoryLabel}</strong>. Try searching for a different keyword or resetting your category filter.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-3.5 px-4 py-2 rounded-xl bg-[#b0000b] text-white text-xs font-display font-bold shadow-xs hover:bg-[#d91b1b] transition-all"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map(item => {
              const isFav = favoriteIds.has(item.id);
              const badge = getGradeBadge(item.condition);

              return (
                <article
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-slate-200/70 transition-all cursor-pointer group"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />

                    {/* Arts Club badge if applicable */}
                    {item.isArtsClub && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ffddb6] text-[#2a1800] text-[9px] font-display font-bold shadow-xs">
                        🎨 Arts Club
                      </span>
                    )}

                    {/* Favorite button */}
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

                    {/* Grade pill badge on image bottom */}
                    <div className="absolute bottom-2 left-2">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-display font-bold shadow-xs ${badge.bg}`}>
                        {badge.text}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-2.5 flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider truncate max-w-[90px]">
                          {item.categoryLabel.split('•')[0]}
                        </span>
                        <span className="font-display font-extrabold text-[17px] text-[#b0000b]">
                          ${item.price}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-slate-900 text-[13px] leading-snug line-clamp-1 mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.flawsNote || item.description}
                      </p>
                    </div>

                    {/* Seller meta foot */}
                    <div className="pt-1 flex items-center justify-between bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-4 h-4 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center text-[9px] font-bold shrink-0">
                          {item.sellerName[0]}
                        </div>
                        <span className="text-[11px] text-slate-800 font-medium truncate">
                          {item.sellerName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 truncate shrink-0">
                        {item.sellerDorm.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Campus Safe Meetup Reminder Micro-Card */}
      <section className="px-4 py-1">
        <div className="flex items-center gap-3 p-3 bg-red-50/70 border border-red-100 rounded-2xl shadow-xs">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-[#b0000b] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-bold text-slate-900 text-xs">Campus Quad Meetup Zones</h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">
              Recommended spot: Student Union North Lobby (24/7 monitored, blue-light box #14).
            </p>
          </div>
        </div>
      </section>

      {/* Sell CTA Bottom Callout Banner */}
      <section className="px-4 pt-3 pb-2">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center shrink-0 shadow-xs">
              <Recycle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-slate-900 text-sm">
                Got preloved dorm stuff?
              </h3>
              <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">
                Sell freely to your campus peers! Listings go live as soon as student moderators verify quality.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToSell}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#b0000b] hover:bg-[#d91b1b] text-white font-display font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Item for Free</span>
          </button>
        </div>
      </section>
    </div>
  );
};
