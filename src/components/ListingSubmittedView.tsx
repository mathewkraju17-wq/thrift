import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Eye, 
  MapPin, 
  Home, 
  Edit3, 
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { MarketplaceItem } from '../types';

interface ListingSubmittedViewProps {
  item?: Partial<MarketplaceItem>;
  onBackToFeed: () => void;
  onEditListing: () => void;
  onOpenRubric: () => void;
}

export const ListingSubmittedView: React.FC<ListingSubmittedViewProps> = ({
  item,
  onBackToFeed,
  onEditListing,
  onOpenRubric,
}) => {
  const itemTitle = item?.title || "Vintage Levi's Distressed Denim Jacket";
  const itemPrice = item?.price ? `$${item.price.toFixed(2)}` : "$18.00";
  const itemImage = item?.imageUrl || "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80";
  const conditionLabel = item?.condition ? item.condition.toUpperCase() : "GOOD (MINOR WEAR)";

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-3 space-y-4">
      {/* Top Success Hero */}
      <div className="flex flex-col items-center text-center pt-2 pb-1">
        <div className="relative flex items-center justify-center mb-3">
          <div className="absolute w-16 h-16 rounded-full bg-red-100 animate-ping opacity-60"></div>
          <div className="w-14 h-14 rounded-full bg-[#b0000b] flex items-center justify-center shadow-lg shadow-red-900/20 relative z-10">
            <CheckCircle2 className="w-8 h-8 text-white stroke-[2.5]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-xs z-20">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
        </div>

        <h2 className="font-display font-extrabold text-xl text-slate-900 tracking-tight">
          Listing Sent to Moderation!
        </h2>
        <p className="text-xs text-slate-500 mt-1">Ticket #TIC-8843 • Submitted just now</p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-[#b0000b]" />
            <span>Est. Review: ~1 hr 45 min</span>
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Campus Approval Rate: 94%</span>
          </div>
        </div>
      </div>

      {/* Live Queue Position Tracker Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#b0000b] animate-pulse"></div>
            <h3 className="font-display font-bold text-slate-900 text-sm">Live Moderation Status</h3>
          </div>
          <span className="text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-[#b0000b]">
            Priority Queue
          </span>
        </div>

        {/* Stepper Pipeline */}
        <div className="relative pl-7 space-y-5">
          {/* Continuous vertical progress line */}
          <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-slate-200"></div>
          <div className="absolute left-3 top-3 h-14 w-0.5 bg-[#b0000b]"></div>

          {/* Step 1: Completed */}
          <div className="relative flex flex-col">
            <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#b0000b] text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-bold text-xs text-slate-900">Listing Submitted</span>
              <span className="text-[11px] text-slate-500">4:18 PM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Campus integrity filter cleared (@state.edu active token verified).</p>
          </div>

          {/* Step 2: Active */}
          <div className="relative flex flex-col">
            <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-red-100 border-2 border-[#b0000b] text-[#b0000b] flex items-center justify-center shadow-xs">
              <Clock className="w-3 h-3 animate-spin" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xs text-[#b0000b]">In Moderator Queue</span>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#b0000b] text-[10px] font-bold">
                #3 of 8 pending
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Assigned: Arts & Textile Peer Desk (Prof. Miller & Student Leads)
            </p>
          </div>

          {/* Step 3: Up Next */}
          <div className="relative flex flex-col opacity-75">
            <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
              <span className="text-[10px] font-bold font-display">3</span>
            </div>
            <span className="font-display font-bold text-xs text-slate-800">Rubric Quality Audit</span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Evaluating photos against declared condition: <span className="font-semibold text-slate-800">{conditionLabel}</span>
            </p>
          </div>

          {/* Step 4: Final */}
          <div className="relative flex flex-col opacity-50">
            <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
              <span className="text-[10px] font-bold font-display">4</span>
            </div>
            <span className="font-display font-bold text-xs text-slate-800">Live on Campus Marketplace</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Discoverable to verified quad and commuter students.</p>
          </div>
        </div>
      </div>

      {/* Moderator Review Desk Preview Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Eye className="w-4 h-4 text-[#b0000b]" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">
              Moderator Review Desk Preview
            </span>
          </div>
          <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Inspection View
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 space-y-3 border border-slate-100">
          <div className="flex gap-3">
            <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-200">
              <img src={itemImage} alt={itemTitle} className="w-full h-full object-cover" />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[8px] font-bold uppercase tracking-wide">
                Cover
              </span>
            </div>
            <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
              <div>
                <h4 className="font-display font-bold text-xs text-slate-900 line-clamp-1 leading-snug">
                  {itemTitle}
                </h4>
                <p className="font-display font-extrabold text-base text-[#b0000b] mt-0.5">
                  {itemPrice}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-semibold">
                  Apparel • Unisex M
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  🟡 Good (Minor Wear)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
            <MapPin className="w-4 h-4 text-[#b0000b] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-display font-semibold text-xs text-slate-900 truncate">
                Student Union North Lobby
              </p>
              <p className="text-[10px] text-slate-500">Designated Campus Safe Handover Zone</p>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <h3 className="font-display font-bold text-slate-900 text-sm">What Happens Next</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center font-display font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-xs text-slate-900">Peer Quality Verification</h4>
              <p className="text-[12px] text-slate-600 mt-0.5">
                Campus moderators review jacket specs and attach the official <strong className="text-slate-900">TIC Inspected Badge</strong> to boost buyer trust.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center font-display font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-xs text-slate-900">Instant Push Notification</h4>
              <p className="text-[12px] text-slate-600 mt-0.5">
                You'll receive an instant campus alert as soon as your listing goes live or if any quick photo tweaks are advised.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center font-display font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-xs text-slate-900">Safe Quad Pickup</h4>
              <p className="text-[12px] text-slate-600 mt-0.5">
                Once approved, campus peers can reserve instantly and meet at Student Union North Lobby for convenient exchange.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onBackToFeed}
          className="w-full h-12 bg-gradient-to-r from-[#b0000b] to-[#d91b1b] hover:opacity-95 text-white font-display font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <Home className="w-4 h-4" />
          <span>Back to Campus Marketplace</span>
        </button>

        <button
          onClick={onEditListing}
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>Edit Submission Details</span>
        </button>

        <div className="text-center pt-1">
          <button
            onClick={onOpenRubric}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#b0000b] transition-colors font-display font-semibold text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>View TIC Quality Rubric & Honor Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
