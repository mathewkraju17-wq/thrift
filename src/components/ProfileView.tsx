import React, { useState } from 'react';
import { 
  Building, 
  Share2, 
  Edit2, 
  Star, 
  DollarSign, 
  Leaf, 
  ShieldCheck, 
  Eye, 
  Heart, 
  MessageSquare, 
  Plus, 
  MapPin, 
  Clock, 
  BookOpen,
  TrendingDown,
  Zap,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { MarketplaceItem } from '../types';

interface ProfileViewProps {
  onNavigateToSell: () => void;
  onOpenSubmissionStatus: () => void;
  onSelectItem: (item: MarketplaceItem) => void;
  items: MarketplaceItem[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigateToSell,
  onOpenSubmissionStatus,
  onSelectItem,
  items,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'in_review' | 'sold' | 'drafts'>('active');
  const [examMode, setExamMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-3 space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-display font-semibold flex items-center justify-between animate-in slide-in-from-top">
          <span>{toastMessage}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Profile & Campus Credentials Hero Card */}
      <div className="relative bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-red-100/50 blur-2xl pointer-events-none"></div>

        <div className="flex items-start gap-3.5 relative z-10">
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="Sarah M." 
              className="w-16 h-16 rounded-full object-cover shadow-xs border-2 border-white"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#b0000b] text-white flex items-center justify-center shadow-xs" title="Verified Campus Student">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-display font-extrabold text-base text-slate-900 leading-tight">Sarah M.</h1>
              <span className="text-xs text-slate-500">@sarah_m</span>
            </div>
            <p className="text-xs text-slate-600 font-medium truncate mt-0.5">Sophomore • Architecture Dept</p>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[11px] font-medium">
                <Building className="w-3 h-3 text-[#b0000b]" />
                North Quad 4B
              </span>
              <span className="inline-flex items-center gap-0.5 bg-red-100 text-[#b0000b] px-2 py-0.5 rounded-full text-[10px] font-bold">
                @state.edu
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 relative z-10">
          <button 
            onClick={() => showToast("Profile settings: Quad address & .edu verified.")}
            className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-slate-800 font-display text-xs font-bold transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Profile</span>
          </button>
          <button 
            onClick={() => showToast("Quad closet link copied to clipboard!")}
            className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-[#b0000b] px-3 py-2 rounded-xl font-display text-xs font-bold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Quad Closet</span>
          </button>
        </div>

        {/* Campus Seller Metrics Bento Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Reputation</span>
              <span className="flex items-center text-amber-600 text-xs font-bold gap-0.5">
                <Star className="w-3.5 h-3.5 fill-current" /> 4.9
              </span>
            </div>
            <div className="mt-1.5">
              <div className="font-display font-black text-base text-slate-900">18 Trades</div>
              <span className="text-[10px] text-slate-500">100% On-Campus Handover</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Quad Earnings</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="mt-1.5">
              <div className="font-display font-black text-base text-slate-900">$284.00</div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Student ID Connected
              </span>
            </div>
          </div>
        </div>

        {/* Sustainability Impact Banner */}
        <div className="mt-2 bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-display font-bold text-xs text-slate-900">Campus Eco Impact</span>
              <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                Recirculated
              </span>
            </div>
            <p className="text-[11px] text-slate-600 truncate mt-0.5">
              Saved ~32kg CO₂ • 8 campus thrift items passed on
            </p>
          </div>
        </div>
      </div>

      {/* Moderation Queue Status Toast / Alert */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-3 shadow-2xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#b0000b] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Clock className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#b0000b]">
              In Review
            </span>
            <span className="text-[11px] text-slate-500">• Ticket #TIC-8843</span>
          </div>
          <p className="text-xs text-slate-700 font-medium truncate">Campus peer safety check (~1h 20m left)</p>
        </div>
        <button 
          onClick={onOpenSubmissionStatus}
          className="shrink-0 bg-[#b0000b] hover:bg-[#d91b1b] text-white text-xs font-display font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
        >
          Track
        </button>
      </div>

      {/* Closet Inventory Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-display font-bold text-sm text-slate-900">Closet Inventory</h2>
          <span className="text-[11px] text-slate-400">Updated 5m ago</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'active', label: 'Active', count: 4 },
            { id: 'in_review', label: 'In Review', count: 1 },
            { id: 'sold', label: 'Sold', count: 12 },
            { id: 'drafts', label: 'Drafts', count: 2 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full font-display text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#b0000b] text-white shadow-xs'
                  : 'bg-slate-200/80 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id ? 'bg-white text-[#b0000b]' : 'bg-slate-300 text-slate-800'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Closet Items Stream */}
      <div className="space-y-3">
        {/* Item 1 */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 space-y-3">
          <div className="flex gap-3">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80" 
                alt="Vintage Denim Jacket" 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] font-display font-bold px-1.5 py-0.5 rounded shadow-2xs">
                Verified
              </span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-display font-bold text-xs text-slate-900 leading-snug truncate">
                    Vintage Denim Jacket
                  </h3>
                  <span className="font-display font-black text-sm text-[#b0000b] shrink-0">$18.00</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">Distressed 90s wash • Size Unisex L</p>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span className="inline-flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> 142
                </span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> 8
                </span>
                <span className="inline-flex items-center gap-1 text-[#b0000b] font-bold">
                  2 offers
                </span>
              </div>

              <div className="flex items-center gap-1 mt-1">
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3 text-[#b0000b]" />
                  Grade: Excellent
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] truncate">
                  Student Union North
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <button 
              onClick={() => showToast("Opening 2 pending student offers ($16 & $18)...")}
              className="flex-1 bg-[#b0000b] text-white py-2 px-3 rounded-xl font-display text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#d91b1b] transition-colors"
            >
              <span>View Offers (2)</span>
            </button>
            <button 
              onClick={() => showToast("Listing promoted to Quad Top Feed for 24 hours!")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-2.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Promote</span>
            </button>
            <button 
              onClick={() => showToast("Edit listing opened.")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 space-y-3">
          <div className="flex gap-3">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80" 
                alt="Silk Floral Midi Dress" 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] font-display font-bold px-1.5 py-0.5 rounded shadow-2xs">
                TIC Passed
              </span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-display font-bold text-xs text-slate-900 leading-snug truncate">
                    Silk Floral Midi Dress
                  </h3>
                  <span className="font-display font-black text-sm text-[#b0000b] shrink-0">$22.00</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">Silk Blend • Size Small</p>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span className="inline-flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> 89
                </span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> 3
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <MessageSquare className="w-3 h-3" /> 0 open
                </span>
              </div>

              <div className="flex items-center gap-1 mt-1">
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                  Grade: Good
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] truncate">
                  Library Cafe Zone
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <button 
              onClick={() => showToast("Listing settings managed.")}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl font-display text-xs font-semibold"
            >
              Manage Listing
            </button>
            <button 
              onClick={() => showToast("Price dropped by $3! Push notification sent to 3 likers.")}
              className="bg-red-50 hover:bg-red-100 text-[#b0000b] py-2 px-3 rounded-xl font-display text-xs font-bold flex items-center gap-1"
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Drop Price $3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seller Meetup Settings & Safety Zone */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-[#b0000b]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-xs text-slate-900">Campus Handover Safe Zones</h3>
          </div>
          <span 
            onClick={() => showToast("Safe zone settings opened.")}
            className="text-xs font-display font-bold text-[#b0000b] cursor-pointer hover:underline"
          >
            Change
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 space-y-1 border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#b0000b]" />
              <span className="font-display font-bold text-xs text-slate-900">Student Union North Lobby</span>
            </div>
            <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
              24/7 Monitored
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Equipped with campus emergency intercoms & security cameras
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <div className="font-display font-bold text-xs text-slate-900">Today's Quad Window</div>
              <p className="text-[11px] text-slate-500">Available after 4:30 PM (Post-studio)</p>
            </div>
          </div>
        </div>

        {/* Exam Mode Toggle */}
        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-xs text-slate-900">Exam & Midterms Mode</span>
              <p className="text-[11px] text-slate-500">Pause buyer DM notifications temporarily</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={examMode}
              onChange={(e) => {
                setExamMode(e.target.checked);
                showToast(e.target.checked ? "Exam Mode Enabled: Buyer DMs muted." : "Exam Mode Disabled: Notifications active.");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b0000b]"></div>
          </label>
        </div>
      </div>

      {/* Floating Action Button for Posting New Item */}
      <div className="fixed bottom-20 right-4 left-4 max-w-lg mx-auto z-40">
        <button
          onClick={onNavigateToSell}
          className="w-full bg-[#b0000b] hover:bg-[#d91b1b] text-white py-3.5 px-4 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(176,0,11,0.35)] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Post New Item to Quad</span>
        </button>
      </div>
    </div>
  );
};
