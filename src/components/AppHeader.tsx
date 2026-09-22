import React from 'react';
import { 
  GraduationCap, 
  ShieldAlert, 
  Bell, 
  ArrowLeft, 
  Share2, 
  Heart, 
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { AppTab, ScreenView } from '../types';

interface AppHeaderProps {
  currentTab: AppTab;
  currentScreen: ScreenView;
  onNavigateTab: (tab: AppTab) => void;
  onBack?: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  itemTitle?: string;
  isItemFavorited?: boolean;
  onToggleFavorite?: () => void;
  onShare?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentTab,
  currentScreen,
  onNavigateTab,
  onBack,
  onOpenProfile,
  onOpenNotifications,
  unreadCount = 3,
  itemTitle = 'Product Detail View',
  isItemFavorited = false,
  onToggleFavorite,
  onShare
}) => {
  // If we are in Product Detail view, show the specialized product header
  if (currentScreen === 'product_detail') {
    return (
      <header className="sticky top-0 inset-x-0 z-40 bg-[#f7f9fb]/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-14 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-200/60 active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display font-semibold text-slate-900 text-[16px] truncate max-w-[190px]">
              {itemTitle}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={onShare}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
              aria-label="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onToggleFavorite}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isItemFavorited ? 'text-[#d91b1b]' : 'text-slate-600 hover:text-[#d91b1b]'
              }`}
              aria-label="Favorite item"
            >
              <Heart className={`w-4 h-4 ${isItemFavorited ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={onOpenProfile}
              className="relative w-8 h-8 rounded-full overflow-hidden border border-red-600/30 ml-1 active:scale-95 transition-transform"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // If in Chat view
  if (currentScreen === 'chat') {
    return (
      <header className="sticky top-0 inset-x-0 z-40 bg-[#f7f9fb]/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-200/60 active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-primary font-bold text-sm">
                SM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#b0000b] rounded-full flex items-center justify-center text-white text-[8px]">
                <CheckCircle2 className="w-2.5 h-2.5" />
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-slate-900 text-sm truncate">Sarah M.</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <span className="truncate">Sophomore • Arch</span>
                <span>•</span>
                <span className="text-[#b0000b] font-medium">Active now</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              className="h-8 px-2.5 bg-red-100 hover:bg-red-200 text-[#b0000b] font-medium text-[11px] rounded-full flex items-center gap-1 shadow-xs transition-colors"
              onClick={() => alert("Campus Safety: Student Union North Lobby & Quad are equipped with blue-light emergency columns & public safety dispatch.")}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Safety</span>
            </button>
            <button 
              onClick={() => alert("Options: View seller closet, report user, campus integrity honor code.")}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/60"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Standard Main Top Header (Feed, Arts Club, Sell, Admin, Profile)
  const getSubTitle = () => {
    switch (currentTab) {
      case 'feed': return 'Feed';
      case 'arts_club': return 'Arts Guild';
      case 'sell': return 'Lister Studio';
      case 'admin': return 'Admin Review';
      case 'profile': return 'Quad Closet';
      default: return 'Marketplace';
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#f7f9fb]/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(176,0,11,0.05)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2">
        {/* Left: TIC Brand & University affiliation */}
        <div 
          className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
          onClick={() => onNavigateTab('feed')}
        >
          {/* Circular Red Varsity Logo Icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#b0000b] to-[#d91b1b] p-0.5 shadow-sm shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="font-display font-black text-[#b0000b] text-[13px] tracking-tighter">
                TIC
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-[#b0000b] text-[17px] leading-none tracking-tight">
                TIC
              </span>
              <div className="flex items-center gap-1 bg-slate-200/80 px-2 py-0.5 rounded-full text-slate-700 max-w-[130px]">
                <GraduationCap className="w-3 h-3 text-[#b0000b] shrink-0" />
                <span className="font-display font-semibold text-[11px] truncate">State Univ</span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Right Action Icons: Admin Pill, Notifications, Profile */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onNavigateTab('admin')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold transition-colors min-h-[30px] ${
              currentTab === 'admin'
                ? 'bg-[#b0000b] text-white shadow-xs'
                : 'bg-red-100/80 text-[#b0000b] hover:bg-red-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-[#b0000b] hover:bg-slate-200/50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#d91b1b] ring-2 ring-[#f7f9fb]"></span>
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full overflow-hidden border border-red-500/30 hover:ring-2 hover:ring-red-400 active:scale-95 transition-all shadow-xs"
            aria-label="View user profile"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
              alt="Sarah M." 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
