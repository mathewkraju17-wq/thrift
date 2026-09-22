import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Check, 
  Send, 
  PlusCircle, 
  QrCode, 
  ExternalLink,
  Lock,
  Building,
  CheckCheck
} from 'lucide-react';
import { MarketplaceItem, CampusSafeZone, ChatMessage } from '../types';
import { CAMPUS_SAFE_ZONES, INITIAL_CHAT_MESSAGES } from '../data/mockData';

interface ChatViewProps {
  item: MarketplaceItem;
  onNavigateToTicket: () => void;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  item,
  onNavigateToTicket,
  onBack,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedSafeZone, setSelectedSafeZone] = useState<CampusSafeZone>(CAMPUS_SAFE_ZONES[0]);
  const [isProposingZone, setIsProposingZone] = useState(false);
  const [escrowAccepted, setEscrowAccepted] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      senderName: 'Alex K.',
      text: inputText.trim(),
      time: 'Just now',
      isDelivered: true,
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate friendly seller reply
    setTimeout(() => {
      const replies = [
        "Sounds good! I'll have the jacket packed in a recycled tote bag ready for you.",
        "Perfect! See you at the Student Union North Lobby safe zone.",
        "Got it, looking forward to meeting up!"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'seller',
          senderName: 'Sarah M.',
          text: randomReply,
          time: 'Just now',
        }
      ]);
    }, 1200);
  };

  const handleProposeZone = (zone: CampusSafeZone) => {
    setSelectedSafeZone(zone);
    setIsProposingZone(true);
    setTimeout(() => {
      setIsProposingZone(false);
      const zoneMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'buyer',
        senderName: 'Alex K.',
        text: `📍 I proposed meeting at: ${zone.name} (${zone.description})`,
        time: 'Just now',
        isDelivered: true,
      };
      setMessages(prev => [...prev, zoneMsg]);
    }, 700);
  };

  const handleFastAction = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col w-full pb-24 bg-[#f7f9fb] min-h-screen">
      {/* Pinned Marketplace Item Context Bar */}
      <aside className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xs border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-[#b0000b] text-white text-[8px] font-display font-bold text-center py-0.2 tracking-wider uppercase">
              Passed
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h2 className="font-display font-bold text-xs text-slate-900 truncate">{item.title}</h2>
              <span className="font-display font-extrabold text-sm text-[#b0000b] shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-slate-100 text-slate-800 text-[10px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-[#b0000b]" />
                Grade: Excellent
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Pending Meetup Agreement
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-xs">
          <span className="text-slate-500 text-[11px]">Ticket {item.ticketId}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onNavigateToTicket}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
            >
              View Pass
            </button>
            <button
              onClick={() => alert("Item is reserved for your meetup with Sarah!")}
              className="px-2.5 py-1 rounded-lg bg-[#b0000b] text-white text-[11px] font-display font-bold shadow-xs hover:bg-[#d91b1b] transition-colors"
            >
              Reserve Item
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Stream Container */}
      <div className="flex flex-col px-4 py-3 space-y-3.5 flex-1">
        {/* Safe Campus Escrow Banner */}
        <section className="bg-red-50/70 border border-red-200/70 rounded-2xl p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="w-7 h-7 rounded-full bg-red-100 text-[#b0000b] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-xs text-slate-900">
                Safe Campus Exchange Enabled
              </h3>
              <span className="px-1.5 py-0.2 bg-[#b0000b] text-white text-[8px] font-display font-bold rounded uppercase">
                TIC Zero-Fee
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Always meet in monitored campus zones. Funds stay locked in <strong>TIC Campus Escrow</strong> until physical QR handover verification.
            </p>
          </div>
        </section>

        {/* Verified Campus Safe Zones Widget */}
        <section className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#b0000b]" />
              <h3 className="font-display font-bold text-xs text-slate-900">Verified Campus Safe Zones</h3>
            </div>
            <span className="text-[10px] font-semibold text-[#b0000b] bg-red-50 px-2 py-0.5 rounded-full">
              Daylight & CCTV
            </span>
          </div>

          <div className="space-y-1.5">
            {CAMPUS_SAFE_ZONES.map(zone => {
              const isSelected = selectedSafeZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedSafeZone(zone)}
                  className={`p-2.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-red-50/70 border-red-300 shadow-2xs'
                      : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{zone.emoji}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-xs text-slate-900">{zone.name}</span>
                          {isSelected && (
                            <span className="px-1.5 py-0.2 rounded bg-[#b0000b] text-white text-[9px] font-bold">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{zone.description}</p>
                      </div>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#b0000b] shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{selectedSafeZone.distance}</span>
            </span>
            <button
              onClick={() => handleProposeZone(selectedSafeZone)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs flex items-center gap-1 shadow-2xs transition-all active:scale-95"
            >
              <span>{isProposingZone ? 'Proposing...' : `Propose to Sarah`}</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Message Stream */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col items-center gap-1 my-1">
            <span className="px-3 py-0.5 rounded-full bg-slate-200/80 text-slate-600 text-[10px] font-display font-bold">
              Today 4:02 PM
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Alex K. requested pickup for Vintage Oversized Denim Jacket ($18.00)
            </span>
          </div>

          {messages.map(msg => {
            if (msg.sender === 'buyer') {
              return (
                <div key={msg.id} className="flex flex-col items-end self-end max-w-[85%] ml-auto">
                  <div className="bg-[#b0000b] text-white rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs">
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 pr-1">
                    <span>{msg.time}</span>
                    <CheckCheck className="w-3 h-3 text-[#b0000b]" />
                    <span className="text-[#b0000b] font-medium">Delivered</span>
                  </div>
                </div>
              );
            }

            if (msg.hasProposalCard) {
              return (
                <div key={msg.id} className="w-full my-2">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-red-200 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#b0000b]">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-display font-bold text-xs text-slate-900 block">
                            Proposed Safe Handover
                          </span>
                          <span className="text-[#b0000b] text-[11px] font-semibold">
                            Today • 4:30 PM - 5:00 PM
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#b0000b] text-[10px] font-display font-bold">
                        {escrowAccepted ? 'Escrow Locked' : 'Awaiting Buyer'}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-2 border border-slate-100">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#b0000b] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-display font-bold text-xs text-slate-900 block">
                            Student Union North Lobby
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Designated 24/7 Verified Campus Zone
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100">
                        <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block">
                            $18.00 Campus Escrow Ready
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Funds release only when you scan QR code at meetup
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          setEscrowAccepted(true);
                          alert("Escrow locked! $18.00 secured in TIC Campus Escrow. Opening QR Handover pass...");
                          onNavigateToTicket();
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#b0000b] hover:bg-[#d91b1b] text-white font-display font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.99] transition-all"
                      >
                        <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                        <span>{escrowAccepted ? 'View QR Handover Pass ($18 Locked)' : 'Accept Meetup & Lock Escrow ($18)'}</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleFastAction("Could we do 5:15 PM instead right after my biology lecture?")}
                          className="py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center"
                        >
                          Suggest Other Time
                        </button>
                        <button
                          onClick={() => handleFastAction("Would you mind meeting near Main Library Atrium instead?")}
                          className="py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center"
                        >
                          Change Safe Zone
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#b0000b]" /> Accepted by Sarah M.
                      </span>
                      <button
                        onClick={onNavigateToTicket}
                        className="text-[#b0000b] font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>View QR Pass</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex items-start gap-2 max-w-[88%]">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-display text-xs font-bold text-[#b0000b] shrink-0 mt-0.5">
                  SM
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[10px] font-bold text-slate-700 pl-1 mb-0.5">Sarah M.</span>
                  <div className="bg-white text-slate-900 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs border border-slate-200/70">
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 pl-1 mt-0.5">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {/* Handover Ticket Sneak-Peek card */}
          <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 shrink-0">
                <QrCode className="w-6 h-6 text-[#b0000b]" />
              </div>
              <div>
                <span className="font-display font-bold text-xs text-slate-900 block">
                  Handover Ticket {item.ticketId}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Ready to scan at Student Union North Lobby
                </span>
              </div>
            </div>
            <button
              onClick={onNavigateToTicket}
              className="px-2.5 py-1.5 rounded-xl bg-white text-slate-800 font-display font-bold text-xs border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs shrink-0"
            >
              Expand Pass
            </button>
          </div>
        </div>

        {/* Fast Campus Action Chips */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-display uppercase tracking-wider text-slate-400 font-bold">
              Fast Campus Actions
            </span>
            <span className="text-[10px] text-[#b0000b] font-semibold">Instant Insertion</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { label: '📍 Share Safe Location', text: 'I am at Student Union North Lobby near the front desk.' },
              { label: '💳 Send $18 Escrow Offer', text: 'I am ready to lock $18.00 in TIC Campus Escrow right now.' },
              { label: '⏰ Propose Time Slot', text: 'Does 4:45 PM today work for a 2-minute quick handover?' },
              { label: '🛡️ Safety Guidelines', text: 'Always remember to inspect zipper and seams before giving code!' },
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleFastAction(chip.text)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs text-slate-700 hover:bg-red-50 text-[11px] font-medium transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Message Input Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 p-2.5 shadow-lg pb-safe">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <button 
            onClick={() => alert("Photo attachment: Take or upload a campus verification photo.")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Attach photo"
          >
            <PlusCircle className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center bg-slate-100 rounded-full px-3.5 py-1.5 border border-slate-200/60 focus-within:bg-white focus-within:border-[#b0000b] transition-colors">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Message Sarah M...."
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={() => handleFastAction("Would you accept $16 if I pick it up within 15 minutes?")}
              className="text-[#b0000b] font-display font-bold text-[11px] px-1 hover:underline shrink-0"
            >
              Offer
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
              inputText.trim() 
                ? 'bg-[#b0000b] text-white shadow-xs active:scale-95' 
                : 'bg-slate-200 text-slate-400'
            }`}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
