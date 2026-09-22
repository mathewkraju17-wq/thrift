import React from 'react';
import { Store, Palette, Plus, ShieldCheck, User } from 'lucide-react';
import { AppTab } from '../types';

interface AndroidNavBarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  pendingAdminCount: number;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  currentTab,
  onSelectTab,
  pendingAdminCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#f7f9fb]/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_16px_rgba(176,0,11,0.06)] pb-safe">
      <div className="flex items-center justify-around h-16 px-3 max-w-lg mx-auto">
        {/* Feed Tab */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all ${
            currentTab === 'feed'
              ? 'text-[#b0000b] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className={`w-5 h-5 ${currentTab === 'feed' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] font-display mt-0.5">Feed</span>
        </button>

        {/* Arts Club Tab */}
        <button
          onClick={() => onSelectTab('arts_club')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all ${
            currentTab === 'arts_club'
              ? 'text-[#b0000b] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className={`w-5 h-5 ${currentTab === 'arts_club' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] font-display mt-0.5">Arts Club</span>
        </button>

        {/* Sell Post Item Central CTA */}
        <button
          onClick={() => onSelectTab('sell')}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] group"
          aria-label="Post an Item"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#b0000b] to-[#d91b1b] text-white flex items-center justify-center shadow-[0_3px_10px_rgba(217,27,27,0.35)] group-active:scale-95 transition-transform">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className={`text-[11px] font-display mt-0.5 ${currentTab === 'sell' ? 'text-[#b0000b] font-bold' : 'text-slate-600'}`}>
            Sell
          </span>
        </button>

        {/* Admin Review Tab with pending count */}
        <button
          onClick={() => onSelectTab('admin')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all ${
            currentTab === 'admin'
              ? 'text-[#b0000b] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <ShieldCheck className={`w-5 h-5 ${currentTab === 'admin' ? 'stroke-[2.5]' : ''}`} />
            {pendingAdminCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 rounded-full bg-[#d91b1b] text-white text-[9px] font-bold leading-tight min-w-[14px] text-center shadow-xs">
                {pendingAdminCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-display mt-0.5">Admin</span>
        </button>

        {/* User Profile Tab */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all ${
            currentTab === 'profile'
              ? 'text-[#b0000b] font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] font-display mt-0.5">Closet</span>
        </button>
      </div>
    </nav>
  );
};
