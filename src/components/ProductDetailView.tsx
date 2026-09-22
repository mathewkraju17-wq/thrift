import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Copy, 
  Camera, 
  Check, 
  PhoneCall, 
  ArrowRight, 
  MessageSquare, 
  ShoppingBag, 
  ExternalLink,
  QrCode,
  ScanLine,
  Lock,
  Star
} from 'lucide-react';
import { MarketplaceItem } from '../types';

interface ProductDetailViewProps {
  item: MarketplaceItem;
  onNavigateToChat: () => void;
  onTradeCompleted: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  item,
  onNavigateToChat,
  onTradeCompleted,
}) => {
  const [activeQrTab, setActiveQrTab] = useState<'show' | 'scan'>('show');
  const [countdownSeconds, setCountdownSeconds] = useState(1104); // ~18m 24s
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [checklist, setChecklist] = useState({
    conditionMatched: true,
    hardwareFitChecked: true,
    safeZoneMeeting: true,
  });
  const [isScanning, setIsScanning] = useState(false);
  const [tradeDone, setTradeDone] = useState(false);

  // Dynamic countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s left`;
  };

  const copyBackupCode = () => {
    navigator.clipboard?.writeText?.('849-210');
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleConfirmTrade = () => {
    if (!checklist.conditionMatched || !checklist.hardwareFitChecked || !checklist.safeZoneMeeting) {
      alert("Please complete the physical inspection checklist before releasing funds.");
      return;
    }
    setTradeDone(true);
    setTimeout(() => {
      onTradeCompleted();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-3 space-y-4">
      {/* Order Identity & Status */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-xs border border-slate-200/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b0000b]"></span>
          </span>
          <span className="font-display font-bold text-xs text-[#b0000b] uppercase tracking-wider">
            {tradeDone ? 'Trade Completed' : 'Meetup Confirmed • In Progress'}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500">TICKET</span>
          <span className="font-mono font-bold text-[11px] text-slate-900">{item.ticketId}</span>
        </div>
      </div>

      {/* Verified Safe Zone Location Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 relative overflow-hidden space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-[#b0000b] shrink-0 shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-slate-900 leading-snug">
                Student Union North Lobby
              </h2>
              <p className="text-[11px] text-[#b0000b] font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Designated Campus Safe Zone • 24/7 Monitored</span>
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-[#b0000b] text-[10px] font-black border border-red-200/60">
            TIC
          </div>
        </div>

        {/* Countdown Timer Pill */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Clock className="w-4 h-4 text-[#b0000b]" />
            <span>Slot: Today 4:30 PM - 5:00 PM</span>
          </div>
          <span className="text-[11px] font-display font-extrabold text-[#b0000b] bg-red-100/80 px-2.5 py-0.5 rounded-full">
            {formatCountdown(countdownSeconds)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Near Commuter Lounge Desk B</span>
          </div>
          <button 
            onClick={() => alert("Campus Map: Student Union Lobby has security camera coverage, public desks, and automatic blue-light escort access.")}
            className="flex items-center gap-1 text-[#b0000b] font-display font-bold text-xs hover:underline"
          >
            <span>Campus Safety Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Item Verification Snapshot */}
      <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex items-center gap-3">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="bg-red-100 text-[#b0000b] text-[10px] font-display font-bold px-2 py-0.5 rounded-full">
              TIC PASSED
            </span>
            <span className="font-display font-extrabold text-base text-slate-900">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="font-display font-bold text-xs text-slate-900 truncate mt-0.5">
            {item.title}
          </p>
          <div className="flex items-center gap-1 mt-0.5 text-slate-500 text-[11px]">
            <Lock className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">Campus Escrow: Funds hold active</span>
          </div>
        </div>
      </div>

      {/* Buyer & Seller Matched Profiles */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Seller Card */}
        <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-display font-bold text-slate-400 uppercase tracking-wider">
                Seller
              </span>
              <span className="flex items-center text-amber-600 text-xs font-bold gap-0.5">
                <Star className="w-3 h-3 fill-current" /> 4.9
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                alt="Seller" 
                className="w-7 h-7 rounded-full object-cover shrink-0" 
              />
              <div className="min-w-0">
                <p className="font-display font-bold text-xs text-slate-900 truncate">Sarah M.</p>
                <p className="text-[10px] text-slate-500 truncate">Sophomore • Arch</p>
              </div>
            </div>
          </div>
          <div className="pt-1.5 flex items-center justify-between text-slate-500 text-[10px] border-t border-slate-100">
            <span className="truncate">North Quad 4B</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#b0000b]" />
          </div>
        </div>

        {/* Buyer Card */}
        <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-display font-bold text-[#b0000b] uppercase tracking-wider">
                Buyer (You)
              </span>
              <span className="flex items-center text-amber-600 text-xs font-bold gap-0.5">
                <Star className="w-3 h-3 fill-current" /> 4.8
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" 
                alt="Buyer" 
                className="w-7 h-7 rounded-full object-cover shrink-0" 
              />
              <div className="min-w-0">
                <p className="font-display font-bold text-xs text-slate-900 truncate">Alex K.</p>
                <p className="text-[10px] text-slate-500 truncate">Junior • Eng</p>
              </div>
            </div>
          </div>
          <div className="pt-1.5 flex items-center justify-between text-slate-500 text-[10px] border-t border-slate-100">
            <span className="truncate">East Tower 2A</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#b0000b]" />
          </div>
        </div>
      </div>

      {/* QR Handover Verification Section */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        {/* View Switcher Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveQrTab('show')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeQrTab === 'show'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My Handover QR</span>
          </button>
          <button
            onClick={() => setActiveQrTab('scan')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeQrTab === 'scan'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ScanLine className="w-4 h-4" />
            <span>Scan Seller's QR</span>
          </button>
        </div>

        {activeQrTab === 'show' ? (
          <div className="flex flex-col items-center py-2">
            <div className="relative p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center">
              {/* Corner Viewfinder Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#b0000b] rounded-tl"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#b0000b] rounded-tr"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#b0000b] rounded-bl"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#b0000b] rounded-br"></div>

              {/* Dynamic QR SVG */}
              <svg className="w-44 h-44 text-slate-900" fill="currentColor" viewBox="0 0 100 100">
                <rect fill="none" height="26" rx="4" stroke="currentColor" strokeWidth="4" width="26" x="5" y="5" />
                <rect fill="currentColor" height="14" rx="2" width="14" x="11" y="11" />
                <rect fill="none" height="26" rx="4" stroke="currentColor" strokeWidth="4" width="26" x="69" y="5" />
                <rect fill="currentColor" height="14" rx="2" width="14" x="75" y="11" />
                <rect fill="none" height="26" rx="4" stroke="currentColor" strokeWidth="4" width="26" x="5" y="69" />
                <rect fill="currentColor" height="14" rx="2" width="14" x="11" y="75" />
                
                <rect height="5" rx="1" width="5" x="36" y="8" />
                <rect height="5" rx="1" width="5" x="46" y="8" />
                <rect height="5" rx="1" width="5" x="56" y="8" />
                <rect height="5" rx="1" width="5" x="36" y="18" />
                <rect height="5" rx="1" width="5" x="56" y="18" />
                <rect height="5" rx="1" width="5" x="46" y="28" />
                <rect height="5" rx="1" width="5" x="8" y="36" />
                <rect height="5" rx="1" width="5" x="18" y="46" />
                <rect height="5" rx="1" width="5" x="28" y="36" />
                <rect height="5" rx="1" width="5" x="68" y="36" />
                <rect height="5" rx="1" width="5" x="86" y="36" />
                <rect height="5" rx="1" width="5" x="68" y="46" />
                <rect height="5" rx="1" width="5" x="78" y="56" />
                <rect height="5" rx="1" width="5" x="36" y="68" />
                <rect height="5" rx="1" width="5" x="46" y="78" />
                <rect height="5" rx="1" width="5" x="56" y="86" />
                <rect height="5" rx="1" width="5" x="78" y="78" />
                <rect height="5" rx="1" width="5" x="86" y="86" />

                <circle cx="50" cy="50" fill="#b0000b" r="13" />
                <path d="M45 50L48 53L55 46" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </div>

            {/* OTP Code */}
            <div className="mt-3 text-center">
              <p className="text-[11px] text-slate-500">Manual Backup Code</p>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className="font-mono font-bold text-lg text-slate-900 tracking-wider">849-210</span>
                <button
                  type="button"
                  onClick={copyBackupCode}
                  className="text-slate-400 hover:text-[#b0000b] p-1 transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copiedOtp && (
                <span className="text-[10px] font-bold text-emerald-600 block animate-in fade-in">
                  Copied to clipboard!
                </span>
              )}
            </div>

            <div className="w-48 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-[#b0000b] h-full w-3/4 rounded-full transition-all duration-500"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Refreshes dynamically in 42s</p>

            <p className="text-xs text-slate-500 text-center mt-3 max-w-xs leading-relaxed">
              Present this token to <strong className="text-slate-800">Sarah M.</strong> once you inspect the item to safely trigger escrow payout release.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="relative w-44 h-44 rounded-2xl bg-black flex flex-col items-center justify-center text-white overflow-hidden shadow-inner">
              {isScanning ? (
                <div className="flex flex-col items-center gap-2 animate-pulse">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin"></div>
                  <span className="text-xs font-display font-semibold text-emerald-300">Aligning QR code...</span>
                </div>
              ) : (
                <>
                  <Camera className="w-10 h-10 text-white/60 mb-2" />
                  <span className="text-xs text-white/80 font-medium">Ready to scan Sarah's pass</span>
                </>
              )}
              <div className="absolute inset-x-0 top-0 h-1 bg-red-500 animate-bounce"></div>
            </div>

            <button
              onClick={() => {
                setIsScanning(true);
                setTimeout(() => {
                  setIsScanning(false);
                  alert("Simulated QR scan successful! Escrow matched with ticket #TIC-8842.");
                }, 1500);
              }}
              className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-display font-bold flex items-center gap-1.5 shadow-xs"
            >
              <ScanLine className="w-4 h-4" />
              <span>{isScanning ? 'Scanning...' : 'Test QR Camera Scanner'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Physical Inspection Checklist */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-slate-900">Physical Inspection Checklist</h3>
          <span className="text-xs font-display font-bold text-[#b0000b]">Step 2 of 2</span>
        </div>

        <div className="space-y-2 pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-800">
            <input 
              type="checkbox"
              checked={checklist.conditionMatched}
              onChange={(e) => setChecklist(prev => ({ ...prev, conditionMatched: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded accent-[#b0000b]"
            />
            <span>
              Garment matches photos & verified as described <strong className="text-slate-900">'Excellent'</strong> condition
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-800">
            <input 
              type="checkbox"
              checked={checklist.hardwareFitChecked}
              onChange={(e) => setChecklist(prev => ({ ...prev, hardwareFitChecked: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded accent-[#b0000b]"
            />
            <span>Fit, buttons, and wash inspected in-person with seller</span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-800">
            <input 
              type="checkbox"
              checked={checklist.safeZoneMeeting}
              onChange={(e) => setChecklist(prev => ({ ...prev, safeZoneMeeting: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded accent-[#b0000b]"
            />
            <span>Meeting conducted inside authorized campus safe exchange zone</span>
          </label>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-start gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>100% Student Handover Guarantee:</strong> Not as described? Walk away anytime. Your $18.00 remains locked safely in campus escrow.
          </p>
        </div>
      </div>

      {/* Campus Public Safety Speed Dial */}
      <div className="bg-slate-100/90 rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <p className="font-display font-bold text-xs text-slate-900">Campus Blue-Light & Escort</p>
            <p className="text-[11px] text-slate-500">Dispatcher: Ext. 4411 (Public Safety)</p>
          </div>
        </div>
        <button
          onClick={() => alert("Calling Campus Safety Dispatcher (Ext. 4411)... Safe quad escort requested.")}
          className="px-2.5 py-1.5 rounded-lg bg-white text-slate-800 font-display font-bold text-xs border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          Speed Dial
        </button>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleConfirmTrade}
          className="w-full h-12 bg-gradient-to-r from-[#b0000b] to-[#d91b1b] hover:opacity-95 text-white font-display font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <span>{tradeDone ? 'Trade Verified & Released!' : 'Confirm Handover & Complete Trade'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={() => alert("Issue reported to Prof. Miller and student desk. Escrow is paused until peer mediation review.")}
          className="w-full py-2 bg-transparent text-slate-500 hover:text-slate-800 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Having Trouble? Report Issue / Reschedule</span>
        </button>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 p-3 shadow-lg pb-safe">
        <div className="max-w-lg mx-auto flex items-center gap-2.5">
          <button
            onClick={onNavigateToChat}
            className="flex-1 h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span>Chat Seller</span>
          </button>
          <button
            onClick={() => alert("Item is already locked in escrow for Student Union North Lobby pickup!")}
            className="flex-[1.4] h-11 bg-[#b0000b] hover:bg-[#d91b1b] text-white font-display font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Reserved for Pickup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
