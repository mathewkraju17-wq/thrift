import React, { useState } from 'react';
import { AppTab, ScreenView, MarketplaceItem, ModerationItem } from './types';
import { 
  INITIAL_MARKETPLACE_ITEMS, 
  INITIAL_MODERATION_ITEMS 
} from './data/mockData';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AppHeader } from './components/AppHeader';
import { AndroidNavBar } from './components/AndroidNavBar';
import { FeedView } from './components/FeedView';
import { ArtsClubView } from './components/ArtsClubView';
import { SellView } from './components/SellView';
import { AdminModerationView } from './components/AdminModerationView';
import { ProductDetailView } from './components/ProductDetailView';
import { ChatView } from './components/ChatView';
import { ListingSubmittedView } from './components/ListingSubmittedView';
import { ProfileView } from './components/ProfileView';
import { RubricModal } from './components/RubricModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('feed');
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('tab_view');
  
  // Data state
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(INITIAL_MARKETPLACE_ITEMS);
  const [moderationQueue, setModerationQueue] = useState<ModerationItem[]>(INITIAL_MODERATION_ITEMS);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem>(INITIAL_MARKETPLACE_ITEMS[0]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['item-8842']));
  const [lastSubmittedItem, setLastSubmittedItem] = useState<Partial<MarketplaceItem>>({});

  // Modals & Frame Settings
  const [isRubricOpen, setIsRubricOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);

  // Global Toast
  const [toast, setToast] = useState<{ message: string; isError?: boolean } | null>(null);

  const showGlobalToast = (message: string, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleSelectItem = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setCurrentScreen('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (itemId: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
        showGlobalToast('Removed from favorites');
      } else {
        next.add(itemId);
        showGlobalToast('Saved to your Quad favorites!');
      }
      return next;
    });
  };

  // Submit new item flow
  const handleSubmitListing = (newItem: Partial<MarketplaceItem>, newModItem: Partial<ModerationItem>) => {
    const fullModItem: ModerationItem = {
      id: `mod-${Date.now()}`,
      ticketId: `#TIC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newItem.title || 'Untitled Item',
      price: newItem.price || 15,
      categoryLabel: newItem.categoryLabel || 'Apparel',
      sellerName: 'Sarah M.',
      sellerHandle: '@sarah_m',
      sellerDorm: 'North Quad 4B',
      sellerAvatarText: 'SM',
      sellerAvatarColor: 'bg-primary-fixed text-primary',
      sellerVerified: true,
      imageUrl: newItem.imageUrl || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
      extraPhotosCount: 1,
      userDescription: newItem.description || '',
      pickupLocation: newItem.pickupZone || 'Student Union North Lobby',
      suggestedGrade: newItem.condition || 'good',
      selectedGrade: newItem.condition || 'good',
      isArtsClubChecked: !!newItem.isArtsClub,
      status: 'pending',
    };

    setModerationQueue(prev => [fullModItem, ...prev]);
    setLastSubmittedItem({ ...newItem, ticketId: fullModItem.ticketId });
    setCurrentScreen('submission_success');
    showGlobalToast('Listing sent to campus moderation desk!');
  };

  // Admin moderation actions
  const handleApproveItem = (id: string, title: string, isArtsClub = false) => {
    const itemToApprove = moderationQueue.find(q => q.id === id);

    setModerationQueue(prev => prev.filter(q => q.id !== id));

    if (itemToApprove) {
      const approvedMarketItem: MarketplaceItem = {
        id: `item-${Date.now()}`,
        ticketId: itemToApprove.ticketId,
        title: itemToApprove.title,
        price: itemToApprove.price,
        category: itemToApprove.isArtsClubChecked ? 'arts_club' : 'apparel',
        categoryLabel: itemToApprove.categoryLabel,
        condition: itemToApprove.selectedGrade || 'good',
        conditionLabel: `Grade: ${itemToApprove.selectedGrade}`,
        sellerName: itemToApprove.sellerName,
        sellerHandle: itemToApprove.sellerHandle,
        sellerDorm: itemToApprove.sellerDorm,
        sellerRating: 4.9,
        sellerVerified: true,
        pickupZone: itemToApprove.pickupLocation,
        imageUrl: itemToApprove.imageUrl,
        description: itemToApprove.userDescription,
        isArtsClub: isArtsClub || itemToApprove.isArtsClubChecked,
        status: 'active',
        likesCount: 0,
        viewsCount: 1,
        offersCount: 0,
        createdAt: 'Just now',
      };
      setMarketplaceItems(prev => [approvedMarketItem, ...prev]);
    }

    showGlobalToast(
      isArtsClub 
        ? `Featured in Arts Club: ${title}` 
        : `Published to Live Quad Feed: ${title}`
    );
  };

  const handleRejectItem = (id: string, title: string, reason: string) => {
    setModerationQueue(prev => prev.filter(q => q.id !== id));
    showGlobalToast(`Item rejected: ${title} (${reason})`, true);
  };

  const handleResetQueue = () => {
    setModerationQueue(INITIAL_MODERATION_ITEMS);
    showGlobalToast('Demo submissions restored!');
  };

  const pendingAdminCount = moderationQueue.filter(q => q.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-0 sm:py-6 selection:bg-red-500 selection:text-white">
      {/* Frame Switcher Bar on Desktop */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-3 px-3 py-1 bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-700 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-display font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>TIC Android App Environment</span>
        </div>
        <button
          onClick={() => setUseDeviceFrame(!useDeviceFrame)}
          className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-700/80 px-2 py-0.5 rounded-full"
        >
          {useDeviceFrame ? (
            <>
              <Monitor className="w-3 h-3" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3 h-3" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: Mobile phone viewport simulator or native mobile layout */}
      <div 
        className={`w-full bg-[#f7f9fb] text-[#191c1e] flex flex-col relative transition-all ${
          useDeviceFrame 
            ? 'sm:max-w-[430px] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:border-[8px] sm:border-slate-800 sm:overflow-hidden sm:min-h-[880px]' 
            : 'max-w-2xl min-h-screen'
        }`}
      >
        {/* Android Punch Hole Camera on device frame mode */}
        {useDeviceFrame && (
          <div className="hidden sm:flex absolute top-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-black border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80"></div>
            </div>
          </div>
        )}

        {/* Global Toast Notification */}
        {toast && (
          <div className="fixed top-20 right-4 left-4 z-50 max-w-[400px] mx-auto animate-in slide-in-from-top duration-300 pointer-events-none">
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-xl text-xs font-display font-bold text-white ${
              toast.isError ? 'bg-[#b0000b]' : 'bg-[#042d1f]'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{toast.message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Android Status Bar */}
        <AndroidStatusBar />

        {/* Unified App Header */}
        <AppHeader
          currentTab={currentTab}
          currentScreen={currentScreen}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            setCurrentScreen('tab_view');
          }}
          onBack={() => setCurrentScreen('tab_view')}
          onOpenProfile={() => {
            setCurrentTab('profile');
            setCurrentScreen('tab_view');
          }}
          onOpenNotifications={() => setIsAuthOpen(true)}
          unreadCount={pendingAdminCount}
          itemTitle={selectedItem.title}
          isItemFavorited={favoriteIds.has(selectedItem.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedItem.id)}
          onShare={() => {
            if (navigator.share) {
              navigator.share({ title: selectedItem.title, url: window.location.href });
            } else {
              showGlobalToast('Link copied to clipboard!');
            }
          }}
        />

        {/* Main Dynamic View Body */}
        <main className="flex-1 flex flex-col relative w-full overflow-y-auto">
          {currentScreen === 'product_detail' ? (
            <ProductDetailView 
              item={selectedItem}
              onNavigateToChat={() => setCurrentScreen('chat')}
              onTradeCompleted={() => {
                showGlobalToast('Trade verified! Payout released to seller.');
                setCurrentScreen('tab_view');
                setCurrentTab('profile');
              }}
            />
          ) : currentScreen === 'chat' ? (
            <ChatView
              item={selectedItem}
              onNavigateToTicket={() => setCurrentScreen('product_detail')}
              onBack={() => setCurrentScreen('product_detail')}
            />
          ) : currentScreen === 'submission_success' ? (
            <ListingSubmittedView
              item={lastSubmittedItem}
              onBackToFeed={() => {
                setCurrentTab('feed');
                setCurrentScreen('tab_view');
              }}
              onEditListing={() => {
                setCurrentTab('sell');
                setCurrentScreen('tab_view');
              }}
              onOpenRubric={() => setIsRubricOpen(true)}
            />
          ) : (
            <>
              {currentTab === 'feed' && (
                <FeedView 
                  items={marketplaceItems}
                  onSelectItem={handleSelectItem}
                  onNavigateToSell={() => setCurrentTab('sell')}
                  onNavigateToArtsClub={() => setCurrentTab('arts_club')}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteIds={favoriteIds}
                />
              )}

              {currentTab === 'arts_club' && (
                <ArtsClubView
                  items={marketplaceItems}
                  onSelectItem={handleSelectItem}
                  onNavigateToSell={() => setCurrentTab('sell')}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteIds={favoriteIds}
                />
              )}

              {currentTab === 'sell' && (
                <SellView
                  onSubmitListing={handleSubmitListing}
                  onSaveDraft={() => showGlobalToast('Draft saved to Quad inventory.')}
                />
              )}

              {currentTab === 'admin' && (
                <AdminModerationView
                  queue={moderationQueue}
                  onApproveItem={handleApproveItem}
                  onRejectItem={handleRejectItem}
                  onOpenRubric={() => setIsRubricOpen(true)}
                  onResetQueue={handleResetQueue}
                />
              )}

              {currentTab === 'profile' && (
                <ProfileView
                  items={marketplaceItems}
                  onNavigateToSell={() => setCurrentTab('sell')}
                  onOpenSubmissionStatus={() => setCurrentScreen('submission_success')}
                  onSelectItem={handleSelectItem}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Android Navigation Bar (Only in main tab view) */}
        {currentScreen === 'tab_view' && (
          <AndroidNavBar
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              setCurrentScreen('tab_view');
            }}
            pendingAdminCount={pendingAdminCount}
          />
        )}

        {/* Android Gesture Pill Navigation Handle */}
        {useDeviceFrame && (
          <div className="hidden sm:flex justify-center pb-2 pt-1 bg-[#f7f9fb] z-50">
            <div className="w-28 h-1 rounded-full bg-slate-400/80"></div>
          </div>
        )}

        {/* Rubric Standards Modal */}
        <RubricModal 
          isOpen={isRubricOpen}
          onClose={() => setIsRubricOpen(false)}
        />

        {/* Auth / Campus Login Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginAsAdmin={() => {
            setCurrentTab('admin');
            setCurrentScreen('tab_view');
            showGlobalToast('Logged in as Campus Moderator (Prof. Miller & Student Desk)');
          }}
          onLoginAsStudent={(email) => {
            showGlobalToast(`Welcome back, ${email}!`);
          }}
        />
      </div>
    </div>
  );
}
