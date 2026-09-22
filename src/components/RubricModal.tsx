import React from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, ThumbsUp, AlertTriangle, Trash2 } from 'lucide-react';
import { GRADING_RUBRIC_DATA } from '../data/mockData';

interface RubricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RubricModal: React.FC<RubricModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 flex flex-col gap-3 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900 text-lg leading-tight">
                TIC Campus Grading Rubric
              </h2>
              <span className="text-[12px] text-slate-500">Official State Univ Student Peer Standard</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[13px] text-slate-600 leading-relaxed">
          Standardized physical appraisal ensures honest peer expectations across campus dorms, prevents surprise flaws at quad meetups, and protects escrow transactions.
        </p>

        <div className="grid grid-cols-1 gap-2.5 my-1">
          {/* Excellent */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-display font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Excellent
            </span>
            <div className="text-[13px] text-slate-800">
              <strong className="font-semibold text-emerald-950 block">Zero flaws or like-new:</strong>
              Unopened packaging, crisp tag attached, spotless collar/hems, or worn at most once.
            </div>
          </div>

          {/* Good */}
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/70 flex items-start gap-2.5">
            <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-[11px] font-display font-bold shrink-0 flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> Good
            </span>
            <div className="text-[13px] text-slate-800">
              <strong className="font-semibold text-teal-950 block">Minor normal wear:</strong>
              Clean, slight cosmetic scuffs, textbook notes/highlighter under 20%, all zippers/hardware 100% intact.
            </div>
          </div>

          {/* Bad */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-display font-bold shrink-0 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Bad / Fair
            </span>
            <div className="text-[13px] text-slate-800">
              <strong className="font-semibold text-amber-950 block">Noticeable cosmetic flaws:</strong>
              Heavier wear, visible small tear, chipped paint/case, but 100% functional for campus use.
            </div>
          </div>

          {/* Horrible */}
          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/70 flex items-start gap-2.5">
            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 text-[11px] font-display font-bold shrink-0 flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Horrible
            </span>
            <div className="text-[13px] text-slate-800">
              <strong className="font-semibold text-rose-950 block">Salvage / Parts Only:</strong>
              Heavy stains, torn fabrics, non-working compressor or battery. <span className="text-red-700 font-semibold underline">Note:</span> Used unwashed bedding is banned under Campus Rule #4.
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-[12px] text-slate-600 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Every listing passes through student moderators (lead: Prof. Miller & Alex) before appearing live on the Quad Feed.
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-semibold text-sm transition-colors mt-1"
        >
          Got it, Close Rubric
        </button>
      </div>
    </div>
  );
};
