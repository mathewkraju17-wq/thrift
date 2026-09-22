import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  Store, 
  Palette, 
  RotateCcw,
  Check,
  Building,
  Pin
} from 'lucide-react';
import { ModerationItem, QualityGrade } from '../types';

interface AdminModerationViewProps {
  queue: ModerationItem[];
  onApproveItem: (id: string, title: string, isArtsClub?: boolean) => void;
  onRejectItem: (id: string, title: string, reason: string, note?: string) => void;
  onOpenRubric: () => void;
  onResetQueue: () => void;
}

export const AdminModerationView: React.FC<AdminModerationViewProps> = ({
  queue,
  onApproveItem,
  onRejectItem,
  onOpenRubric,
  onResetQueue,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'flagged' | 'approved_log'>('pending');
  const [rejectionModalItem, setRejectionModalItem] = useState<ModerationItem | null>(null);
  const [selectedReason, setSelectedReason] = useState('Low Quality: Dark or Blurry Photos');
  const [customNote, setCustomNote] = useState('');
  const [selectedGrades, setSelectedGrades] = useState<Record<string, QualityGrade>>({});
  const [artsClubToggles, setArtsClubToggles] = useState<Record<string, boolean>>({});

  // Filter based on tab
  const displayedItems = queue.filter(item => {
    if (activeTab === 'pending') return item.status === 'pending';
    if (activeTab === 'flagged') return item.healthFlag !== undefined || item.status === 'flagged';
    if (activeTab === 'approved_log') return item.status === 'approved';
    return true;
  });

  const handleGradeSelect = (itemId: string, grade: QualityGrade) => {
    setSelectedGrades(prev => ({ ...prev, [itemId]: grade }));
  };

  const handleArtsToggle = (itemId: string) => {
    setArtsClubToggles(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const openRejectionDialog = (item: ModerationItem) => {
    setRejectionModalItem(item);
    if (item.healthFlag) {
      setSelectedReason('Health Code: Used Bedding / Hygiene Rule Violation');
      setCustomNote('Campus Health Code #4: Used bedding requires proof of commercial sanitization before approval.');
    } else {
      setSelectedReason('Low Quality: Dark or Blurry Photos');
      setCustomNote('Hi there! Please re-upload with clear photos in good natural daylight to confirm item condition.');
    }
  };

  const confirmRejection = () => {
    if (!rejectionModalItem) return;
    onRejectItem(rejectionModalItem.id, rejectionModalItem.title, selectedReason, customNote);
    setRejectionModalItem(null);
  };

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-3 space-y-4">
      {/* Moderation Desk Header Card */}
      <section className="bg-slate-100/90 rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#b0000b] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-extrabold text-base text-slate-900 leading-tight truncate">
                  Moderation Desk
                </h1>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-[#b0000b] text-white text-[9px] font-display font-extrabold uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-600 truncate mt-0.5">
                Admin: <strong className="text-[#b0000b] font-semibold">Prof. Miller</strong> · Student Lead Alex
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRubric}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-1 text-xs font-display font-semibold shrink-0 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b0000b]" />
            <span>Rubric</span>
          </button>
        </div>

        {/* Quick Metrics Counters */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-white p-2.5 rounded-xl shadow-2xs border border-slate-200/70 flex flex-col items-center text-center">
            <span className="font-display font-black text-xl text-[#b0000b] leading-tight">
              {queue.filter(q => q.status === 'pending').length}
            </span>
            <span className="text-[10px] font-display font-semibold text-slate-500 leading-tight mt-0.5">
              Pending
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl shadow-2xs border border-slate-200/70 flex flex-col items-center text-center">
            <span className="font-display font-black text-xl text-emerald-700 leading-tight">
              34
            </span>
            <span className="text-[10px] font-display font-semibold text-slate-500 leading-tight mt-0.5">
              Approved Today
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl shadow-2xs border border-slate-200/70 flex flex-col items-center text-center">
            <span className="font-display font-black text-xl text-rose-700 leading-tight">
              4
            </span>
            <span className="text-[10px] font-display font-semibold text-slate-500 leading-tight mt-0.5">
              Rejected
            </span>
          </div>
        </div>
      </section>

      {/* Workflow Tabs */}
      <section>
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs text-center font-bold truncate transition-all ${
              activeTab === 'pending'
                ? 'bg-[#b0000b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending ({queue.filter(q => q.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs text-center font-bold truncate transition-all ${
              activeTab === 'flagged'
                ? 'bg-[#b0000b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Flagged ({queue.filter(q => q.healthFlag !== undefined).length})
          </button>
          <button
            onClick={() => setActiveTab('approved_log')}
            className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs text-center font-bold truncate transition-all ${
              activeTab === 'approved_log'
                ? 'bg-[#b0000b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Approved Log
          </button>
        </div>
      </section>

      {/* Queue Cards Stream */}
      <section className="space-y-4">
        {displayedItems.length === 0 ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-display font-extrabold text-base text-slate-900">Moderation Queue Cleared!</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
              All submitted campus listings have been reviewed. High five to Alex and Prof. Miller!
            </p>
            <button
              onClick={onResetQueue}
              className="mt-4 px-4 py-2 rounded-xl bg-[#b0000b] text-white font-display font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Demo Submissions</span>
            </button>
          </div>
        ) : (
          displayedItems.map(item => {
            const currentGrade = selectedGrades[item.id] || item.suggestedGrade;
            const isArtsChecked = artsClubToggles[item.id] !== undefined ? artsClubToggles[item.id] : item.isArtsClubChecked;

            return (
              <article 
                key={item.id}
                className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 flex flex-col gap-3 transition-all"
              >
                {/* Card Top Meta */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${item.sellerAvatarColor} flex items-center justify-center font-display text-xs font-bold shrink-0 shadow-2xs`}>
                      {item.sellerAvatarText}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-display font-bold text-xs text-slate-900 truncate">
                          {item.sellerHandle}
                        </span>
                        {item.sellerVerified && (
                          <span title="Student ID Verified">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#b0000b] shrink-0" />
                          </span>
                        )}
                        {item.isFirstPost && (
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] font-bold text-slate-600">
                            1st Post
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {item.sellerDorm} • <span className="font-mono text-[10px]">{item.ticketId}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display font-black text-lg text-[#b0000b] block leading-none">
                      ${item.price}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Photos & Title */}
                <div className="flex gap-3">
                  <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0 relative shadow-2xs border border-slate-200/60">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    {item.extraPhotosCount > 0 && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold">
                        +{item.extraPhotosCount} pics
                      </span>
                    )}
                    {item.isArtsClubChecked && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#563500] text-white text-[8px] font-bold">
                        Handmade
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col justify-between min-w-0 flex-1">
                    <div>
                      <h3 className="font-display font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-2 leading-relaxed">
                        “{item.userDescription}”
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <Pin className="w-3.5 h-3.5 text-[#b0000b] shrink-0" />
                      <span className="truncate">{item.pickupLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Health Warning Banner if applicable */}
                {item.healthFlag && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-display font-bold text-xs text-rose-900">{item.healthFlag.warningTitle}</p>
                      <p className="text-[11px] text-rose-800 leading-tight mt-0.5">{item.healthFlag.warningDesc}</p>
                    </div>
                  </div>
                )}

                {/* Arts Club Partner Banner if applicable */}
                {item.verifiedStudentSeller && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2 text-xs">
                    <Palette className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="font-semibold">{item.verifiedStudentSeller}</span>
                  </div>
                )}

                {/* Moderation Quality Assessment Pills */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-[10px] text-slate-800 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#b0000b]" />
                      Admin Quality Assessment
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Suggested: <strong className="capitalize">{item.suggestedGrade}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5" role="radiogroup">
                    {[
                      { id: 'excellent', label: 'Excellent (Like-new)', activeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' },
                      { id: 'good', label: 'Good (Minor wear)', activeClass: 'bg-teal-50 text-teal-800 border-teal-300 font-bold' },
                      { id: 'bad', label: 'Bad (Visible flaws)', activeClass: 'bg-amber-50 text-amber-900 border-amber-300 font-bold' },
                      { id: 'horrible', label: 'Horrible (Parts/Scrap)', activeClass: 'bg-rose-50 text-rose-900 border-rose-300 font-bold' },
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleGradeSelect(item.id, g.id as QualityGrade)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs border transition-all ${
                          currentGrade === g.id
                            ? `${g.activeClass} shadow-2xs`
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">
                          {currentGrade === g.id ? '●' : '○'} {g.label}
                        </span>
                        {currentGrade === g.id && <Check className="w-3 h-3 ml-1 shrink-0 stroke-[2.5]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Arts Guild Checkbox Toggle */}
                <label className="flex items-center gap-2 px-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isArtsChecked}
                    onChange={() => handleArtsToggle(item.id)}
                    className="w-4 h-4 rounded text-[#b0000b] accent-[#b0000b] cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 flex items-center gap-1 font-medium">
                    <Palette className="w-3.5 h-3.5 text-[#563500]" />
                    <span>Mark as Arts Club Official Collection</span>
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {item.healthFlag ? (
                    <>
                      <button
                        type="button"
                        onClick={() => openRejectionDialog(item)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-display font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject: Health Code Violation</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onApproveItem(item.id, item.title, isArtsChecked)}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs border border-slate-200"
                      >
                        Overrule
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => openRejectionDialog(item)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-rose-200/60"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject / Fix</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onApproveItem(item.id, item.title, isArtsChecked)}
                        className={`flex-1 py-2.5 px-3 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] ${
                          isArtsChecked
                            ? 'bg-gradient-to-r from-[#563500] to-[#1e4334] text-white hover:opacity-95'
                            : 'bg-gradient-to-r from-[#042d1f] to-[#1e4334] text-white hover:opacity-95'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        <span>{isArtsChecked ? 'Approve & Feature in Arts' : 'Approve & Publish'}</span>
                      </button>
                    </>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Rejection Modal Dialog */}
      {rejectionModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 flex flex-col gap-3.5 animate-in fade-in">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="font-display font-bold text-slate-900 text-sm">
                  Moderator Rejection Notice
                </h3>
              </div>
              <button 
                onClick={() => setRejectionModalItem(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Target: <strong className="text-slate-800">{rejectionModalItem.title}</strong>. The student will receive this notification along with a 1-tap re-upload link.
            </p>

            <div className="flex flex-col gap-1">
              <label className="font-display font-bold text-xs text-slate-800">
                Select Standard Reason
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Health Code / Unsanitized Bedding Item">Health Code: Used Bedding / Hygiene Rule Violation</option>
                <option value="Low Quality: Dark or Blurry Photos">Low Quality: Dark or Blurry Photos</option>
                <option value="Price Ceilings Exceeded">Price Check: Dorm pricing exceeds campus cap</option>
                <option value="Prohibited Substance / Paraphernalia">Campus Policy: Prohibited Material</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-display font-bold text-xs text-slate-800">
                Custom Peer Guidance Note
              </label>
              <textarea
                rows={2}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Hi Chloe, please add a close-up photo of the hem..."
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectionModalItem(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRejection}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-display font-bold text-xs shadow-xs"
              >
                Send Notice & Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
