import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Plus, 
  X, 
  Lightbulb, 
  Check, 
  Palette, 
  MapPin, 
  Bookmark, 
  ArrowRight,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { QualityGrade, Category, MarketplaceItem, ModerationItem } from '../types';

interface SellViewProps {
  onSubmitListing: (newItem: Partial<MarketplaceItem>, modItem: Partial<ModerationItem>) => void;
  onSaveDraft?: () => void;
}

export const SellView: React.FC<SellViewProps> = ({ onSubmitListing, onSaveDraft }) => {
  const [title, setTitle] = useState("Vintage Levi's Distressed Denim Jacket (Medium)");
  const [category, setCategory] = useState<Category>('apparel');
  const [sellingPrice, setSellingPrice] = useState('18.00');
  const [originalPrice, setOriginalPrice] = useState('85.00');
  const [acceptOffers, setAcceptOffers] = useState(true);
  const [condition, setCondition] = useState<QualityGrade>('good');
  const [flawsDisclosure, setFlawsDisclosure] = useState(
    'Minor sleeve distress near left cuff, laundered in dormitory dryers with hypoallergenic tide pods. All buttons and seams sturdy.'
  );
  const [isArtsGuildDrop, setIsArtsGuildDrop] = useState(false);
  const [handoverSpot, setHandoverSpot] = useState('Student Union North Lobby');
  const [selectedTimeslot, setSelectedTimeslot] = useState('Today after 4 PM');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80',
  ]);

  const handleAddDemoPhoto = () => {
    if (photos.length >= 6) {
      alert("Maximum 6 photos allowed per campus listing.");
      return;
    }
    const sampleExtras = [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    ];
    setPhotos([...photos, sampleExtras[photos.length % sampleExtras.length]]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide an item title.");
      return;
    }
    const priceNum = parseFloat(sellingPrice) || 15;

    const newItem: Partial<MarketplaceItem> = {
      title,
      price: priceNum,
      originalPrice: parseFloat(originalPrice) || 60,
      category,
      categoryLabel: category === 'apparel' ? 'Apparel • Unisex L' : 'Campus Item',
      condition,
      conditionLabel: `Grade: ${condition.charAt(0).toUpperCase() + condition.slice(1)}`,
      sellerName: 'Sarah M.',
      sellerHandle: '@sarah_m',
      sellerDorm: 'North Quad 4B',
      sellerRating: 4.9,
      sellerVerified: true,
      pickupZone: handoverSpot,
      imageUrl: photos[0] || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
      description: flawsDisclosure || title,
      flawsNote: flawsDisclosure,
      isArtsClub: isArtsGuildDrop,
      status: 'in_review',
    };

    const newModItem: Partial<ModerationItem> = {
      title,
      price: priceNum,
      categoryLabel: category === 'apparel' ? 'Apparel' : 'Campus Goods',
      sellerName: 'Sarah M.',
      sellerHandle: '@sarah_m',
      sellerDorm: 'North Quad 4B',
      sellerAvatarText: 'SM',
      sellerAvatarColor: 'bg-primary-fixed text-primary',
      sellerVerified: true,
      imageUrl: photos[0] || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
      extraPhotosCount: Math.max(0, photos.length - 1),
      userDescription: flawsDisclosure,
      pickupLocation: handoverSpot,
      suggestedGrade: condition,
      selectedGrade: condition,
      isArtsClubChecked: isArtsGuildDrop,
      status: 'pending',
    };

    onSubmitListing(newItem, newModItem);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full pb-28">
      <div className="flex flex-col w-full gap-4 px-4 pt-3">
        {/* Brand Sub-Header & Status Header */}
        <div className="flex items-center justify-between bg-slate-100/80 px-3.5 py-2.5 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#b0000b] text-white flex items-center justify-center font-display font-black text-xs shadow-xs">
              TIC
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-900 text-xs">TIC Lister Studio</span>
              <span className="text-[11px] text-slate-500">Step 1 of 2: Listing Details</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-600 bg-white px-2.5 py-1 rounded-full shadow-xs border border-slate-100 text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#b0000b]" />
            <span>Saved just now</span>
          </div>
        </div>

        {/* Admin Verification Warning Banner */}
        <div className="bg-red-50/90 border border-red-200/80 rounded-2xl p-3.5 flex gap-3 items-start shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#b0000b] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display font-bold text-[#b0000b] text-[13px]">
                Admin Review Required
              </span>
              <span className="bg-[#b0000b] text-white text-[9px] font-display font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                ~2 HR Turnaround
              </span>
            </div>
            <p className="text-[12px] text-slate-700 leading-snug">
              Student moderators physically verify condition grade & security specs prior to public campus feed display.
            </p>
          </div>
        </div>

        {/* Photo Upload Matrix */}
        <section className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-bold text-slate-900 text-sm">Item Photos</h2>
              <span className="text-xs font-semibold text-slate-500">({photos.length}/6)</span>
            </div>
            <span className="text-xs font-display font-bold text-[#b0000b]">Photos Grade Your Item</span>
          </div>
          <p className="text-[12px] text-slate-500">
            Add crisp natural shots showing label tags and any visible wear for speedy moderator sign-off.
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {photos.map((url, idx) => (
              <div 
                key={idx} 
                className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs"
              >
                <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-1.5 left-1.5 bg-[#b0000b] text-white font-display text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {idx === 0 ? 'Cover' : 'Tag Detail'}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {photos.length < 6 && (
              <button
                type="button"
                onClick={handleAddDemoPhoto}
                className="aspect-square rounded-2xl bg-white hover:bg-red-50/40 border-2 border-dashed border-slate-300 hover:border-red-400 transition-colors flex flex-col items-center justify-center gap-1 text-center p-2 cursor-pointer shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center shadow-xs">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-[11px] text-slate-900">+ Add Photo</span>
                <span className="text-[10px] text-slate-400">Up to 15MB</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-2 rounded-xl text-xs text-slate-600">
            <Camera className="w-4 h-4 text-[#b0000b] shrink-0" />
            <span>
              Include fabric tags & seam closeups to unlock an <strong className="text-slate-900">"Excellent"</strong> or <strong className="text-slate-900">"Good"</strong> badge.
            </span>
          </div>
        </section>

        {/* Core Listing Details */}
        <section className="flex flex-col gap-3.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Title Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-display font-bold text-xs text-slate-900 flex items-center justify-between" htmlFor="item-title">
              <span>Listing Title</span>
              <span className="text-[11px] text-slate-400 font-normal">{title.length}/80</span>
            </label>
            <div className="bg-slate-100/80 rounded-xl px-3.5 py-2.5 flex items-center border border-slate-200/60 focus-within:border-[#b0000b] focus-within:bg-white transition-colors">
              <input 
                id="item-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brand, item name, dorm fit, edition..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Campus Category */}
          <div className="flex flex-col gap-2">
            <label className="font-display font-bold text-xs text-slate-900">Campus Category</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'apparel', label: '👗 Dresses & Apparel' },
                { id: 'electronics', label: '⚡ Tech & Chargers' },
                { id: 'textbooks', label: '📚 Course Textbooks' },
                { id: 'dorm_furniture', label: '🛋️ Dorm & Living' },
                { id: 'arts_club', label: '🎨 Arts Student Guild Drop' },
              ].map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id as Category)}
                  className={`font-display text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all ${
                    category === cat.id
                      ? 'bg-[#b0000b] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  {category === cat.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Structure */}
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display font-semibold text-xs text-slate-800" htmlFor="campus-price">Selling Price</label>
                <div className="bg-slate-100/80 rounded-xl px-3 py-2 flex items-center gap-1 border border-slate-200/60 focus-within:border-[#b0000b] focus-within:bg-white">
                  <span className="font-display font-black text-lg text-[#b0000b]">$</span>
                  <input 
                    id="campus-price"
                    type="number"
                    step="0.5"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full bg-transparent font-display font-extrabold text-base text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-display font-semibold text-xs text-slate-500" htmlFor="original-price">Est. Bought For</label>
                <div className="bg-slate-100/80 rounded-xl px-3 py-2 flex items-center gap-1 border border-slate-200/60">
                  <span className="font-display font-semibold text-base text-slate-400">$</span>
                  <input 
                    id="original-price"
                    type="number"
                    step="1"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-transparent font-display font-medium text-base text-slate-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/60 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Suggested campus fair price for dorm outerwear: <strong>$15 – $24</strong></span>
            </div>

            {/* Accept Offers Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col">
                <span className="font-display font-semibold text-xs text-slate-900">Accept In-App Offers</span>
                <span className="text-[11px] text-slate-500">Peers can propose safe campus counters</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={acceptOffers}
                  onChange={(e) => setAcceptOffers(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b0000b]"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Self-Reported Condition Matrix (TIC Rubric) */}
        <section className="flex flex-col gap-2.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display font-bold text-slate-900 text-sm">Self-Reported Condition</h2>
              <p className="text-[12px] text-slate-500">Student mods review against the official campus peer standard:</p>
            </div>
            <Sparkles className="w-4 h-4 text-[#b0000b]" />
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {[
              {
                id: 'excellent',
                title: 'Excellent (Like-New)',
                color: 'bg-emerald-500',
                desc: 'Zero snags or tears, spotless collar, freshly washed or sealed tags.',
              },
              {
                id: 'good',
                title: 'Good (Minor Wear)',
                color: 'bg-teal-500',
                desc: 'Gently worn, light fading on denim cuffs, all buttons functional, 100% wearable.',
              },
              {
                id: 'bad',
                title: 'Bad (Visible Flaws)',
                color: 'bg-amber-500',
                desc: 'Noticeable staining, frayed hem, stuck zipper pocket, or loose lining.',
              },
              {
                id: 'horrible',
                title: 'Horrible (DIY / Parts Only)',
                color: 'bg-rose-600',
                desc: 'Heavy damage, salvage fabric, patches, or student art repurposing scrap.',
              },
            ].map(item => (
              <label 
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                  condition === item.id 
                    ? 'bg-red-50/70 border-red-300 shadow-xs' 
                    : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100/70'
                }`}
              >
                <input 
                  type="radio" 
                  name="condition"
                  value={item.id}
                  checked={condition === item.id}
                  onChange={() => setCondition(item.id as QualityGrade)}
                  className="mt-1 accent-[#b0000b]"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                      <span className="font-display font-bold text-xs text-slate-900">{item.title}</span>
                    </div>
                    {condition === item.id && (
                      <span className="text-[10px] font-display font-bold bg-[#b0000b] text-white px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Mandatory Transparency Disclosure Textarea */}
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="font-display font-bold text-xs text-slate-900 flex items-center justify-between" htmlFor="flaws-disclosure">
              <span>Disclose Any Flaws or Dorm History</span>
              <span className="text-[#b0000b] text-[10px] font-bold uppercase tracking-wider">Required</span>
            </label>
            <textarea
              id="flaws-disclosure"
              rows={3}
              value={flawsDisclosure}
              onChange={(e) => setFlawsDisclosure(e.target.value)}
              placeholder="Be honest! E.g. minor sleeve distress near cuff, laundered in dormitory dryers with hypoallergenic tide pods..."
              className="w-full bg-slate-100/80 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none border border-slate-200/60 focus:bg-white focus:border-[#b0000b] transition-colors resize-none leading-relaxed"
            />
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <Info className="w-3.5 h-3.5 text-[#b0000b] shrink-0" />
              <span>Moderators grant faster approvals and buyer trust badges for detailed honesty.</span>
            </div>
          </div>
        </section>

        {/* Arts Club Student Drop Feature Banner */}
        <div className="bg-[#ffddb6]/30 border border-[#ffddb6] rounded-2xl p-4 flex flex-col gap-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#563500] text-white flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-slate-900 text-xs">Arts Guild Student Drop</span>
                <span className="text-[11px] text-amber-900 font-medium">Curated campus creator spotlight</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                checked={isArtsGuildDrop}
                onChange={(e) => setIsArtsGuildDrop(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#563500]"></div>
            </label>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed">
            Is this custom reworked denim, hand screen-print, ceramic, or zine? Checking this routes 30% royalty to the Fine Arts Guild fund and tags your post with an exclusive campus verified creator banner.
          </p>
        </div>

        {/* Campus Handover Hub */}
        <section className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-slate-900 text-sm">Campus Handover Hub</h2>
              <p className="text-[12px] text-slate-500">Pick safe, well-lit verified peer exchange spots</p>
            </div>
            <MapPin className="w-4 h-4 text-[#b0000b]" />
          </div>

          <div className="flex flex-col gap-2">
            {[
              {
                name: 'Student Union North Lobby',
                desc: '24/7 Monitored Safe Swap Desk • Front of Info Counter',
                isSafeBadge: true
              },
              {
                name: 'Central Quad Clocktower Benches',
                desc: 'Open air daytime exchanges between lectures',
                isSafeBadge: false
              },
              {
                name: 'Main Library South Atrium',
                desc: 'Quiet lounge lockers & cafe foyer',
                isSafeBadge: false
              }
            ].map(spot => (
              <label 
                key={spot.name}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  handoverSpot === spot.name 
                    ? 'bg-red-50/70 border-red-300' 
                    : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="handover-spot" 
                    checked={handoverSpot === spot.name}
                    onChange={() => setHandoverSpot(spot.name)}
                    className="accent-[#b0000b]"
                  />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-xs text-slate-900">{spot.name}</span>
                    <span className="text-[11px] text-slate-500 leading-tight">{spot.desc}</span>
                  </div>
                </div>
                {spot.isSafeBadge && (
                  <span className="text-[9px] font-display font-bold bg-[#b0000b] text-white px-1.5 py-0.5 rounded uppercase">
                    Safe Zone
                  </span>
                )}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <span className="font-display font-bold text-xs text-slate-900">Typical Meetup Availability</span>
            <div className="flex flex-wrap gap-2">
              {[
                'Today after 4 PM',
                'Lunch Hour (12 – 2 PM)',
                'Evenings (Post-Lab)',
                'Flexible Weekends',
              ].map(slot => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTimeslot(slot)}
                  className={`font-display text-xs px-3 py-1.5 rounded-full transition-all ${
                    selectedTimeslot === slot
                      ? 'bg-[#b0000b] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Draft button & Honor Code */}
        <div className="flex flex-col gap-2 items-center text-center pt-1">
          <button
            type="button"
            onClick={onSaveDraft}
            className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Save as Draft</span>
          </button>
          <p className="text-[11px] text-slate-500 leading-relaxed px-2">
            By tapping submit, you affirm this item is in your physical possession on campus and matches the <span className="text-[#b0000b] font-semibold">TIC Honor Code & Student Safety Standard</span>.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Post Button */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 p-3 shadow-lg pb-safe">
        <div className="max-w-lg mx-auto">
          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#b0000b] to-[#d91b1b] hover:opacity-95 text-white font-display font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <span>Review & Post to Quad</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </form>
  );
};
