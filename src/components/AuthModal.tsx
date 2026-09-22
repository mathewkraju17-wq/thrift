import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Key, 
  Zap, 
  UserCheck, 
  Building,
  BadgeAlert
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsAdmin: () => void;
  onLoginAsStudent: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginAsAdmin,
  onLoginAsStudent,
}) => {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Student inputs
  const [studentEmail, setStudentEmail] = useState('student@state.edu');
  const [studentPassword, setStudentPassword] = useState('password123');
  const [studentDorm, setStudentDorm] = useState('West Quad Tower B, Room 304');

  // Admin inputs
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  if (!isOpen) return null;

  const handlePopulateAdmin = () => {
    setAdminEmail('admin.review@tic.state.edu');
    setAdminPassword('CampusMod2026!');
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginAsStudent(studentEmail);
    onClose();
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginAsAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <span className="font-display font-bold text-slate-900 text-sm">Campus Authentication</span>
              <span className="text-[11px] text-[#b0000b] flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3" /> State Univ Campus Access
              </span>
            </div>
          </div>
        </div>

        {/* Hero Branding */}
        <div className="flex flex-col items-center text-center pt-1">
          <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#b0000b] to-[#d91b1b] flex items-center justify-center text-white shadow-md">
              <span className="font-display font-black text-xl tracking-tighter">TIC</span>
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-xs">
              <GraduationCap className="w-3 h-3" />
            </span>
          </div>

          <div className="flex items-center gap-1.5 justify-center">
            <h2 className="font-display font-black text-xl text-[#b0000b] tracking-tight">TIC</h2>
            <span className="bg-red-100 text-[#b0000b] text-[10px] font-display font-bold px-2 py-0.5 rounded-full uppercase">
              Campus P2P
            </span>
          </div>
          <p className="font-display font-bold text-sm text-slate-900 mt-0.5">Thrift in Campus</p>
          <p className="text-xs text-slate-500 max-w-[280px] mt-0.5">
            Sustainable student marketplace • Buy, sell, & support campus creatives
          </p>
        </div>

        {/* Role Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center">
          <button
            onClick={() => setRole('student')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-display text-xs font-bold transition-all ${
              role === 'student'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Student Portal</span>
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-display text-xs font-bold transition-all ${
              role === 'admin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Campus Admin</span>
          </button>
        </div>

        {role === 'student' ? (
          <div className="space-y-3.5">
            {/* Sub-tab: Sign In vs Sign Up */}
            <div className="flex items-center justify-between pb-0.5">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`px-3 py-1 rounded-md text-xs font-display font-bold transition-all ${
                    authMode === 'signin' ? 'bg-[#b0000b] text-white shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`px-3 py-1 rounded-md text-xs font-display font-bold transition-all ${
                    authMode === 'signup' ? 'bg-[#b0000b] text-white shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <span className="text-[11px] text-[#b0000b] flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> @edu Only
              </span>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-display font-semibold text-xs text-slate-800 flex items-center justify-between">
                  <span>Campus Email or Student ID</span>
                  <span className="text-[10px] text-slate-400 font-normal">.edu verified</span>
                </label>
                <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200/60 focus-within:bg-white focus-within:border-[#b0000b]">
                  <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@state.edu"
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="font-display font-semibold text-xs text-slate-800">
                    Student Hall / Dorm Room
                  </label>
                  <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200/60 focus-within:bg-white focus-within:border-[#b0000b]">
                    <Building className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={studentDorm}
                      onChange={(e) => setStudentDorm(e.target.value)}
                      placeholder="e.g. West Quad Tower B, Room 304"
                      className="w-full bg-transparent text-xs text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-display font-semibold text-xs text-slate-800">Password</label>
                <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200/60 focus-within:bg-white focus-within:border-[#b0000b]">
                  <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5 text-xs text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#b0000b] rounded" />
                  <span>Remember device</span>
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to student @state.edu address."); }} className="text-[#b0000b] font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b0000b] hover:bg-[#d91b1b] text-white py-2.5 px-4 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
              >
                <span>{authMode === 'signin' ? 'Sign In to Campus Market' : 'Create Verified Student Account'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>

            <button
              onClick={() => {
                onLoginAsStudent('alex.k@state.edu');
                onClose();
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-xl text-xs font-display font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-200/80"
            >
              <UserCheck className="w-4 h-4 text-[#b0000b]" />
              <span>Fast-Pass: Continue with Campus SSO</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* Moderator Pre-fill Card */}
            <div className="bg-slate-100/90 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-[11px] text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-[#b0000b]" />
                  Pre-Configured Reviewer Login
                </span>
                <span className="text-[10px] bg-red-100 text-[#b0000b] font-bold px-2 py-0.5 rounded-full">
                  Staff Tier
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Admin Username:</span>
                  <span className="font-mono font-semibold text-slate-900">admin.review@tic.state.edu</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Reviewer Keycode:</span>
                  <span className="font-mono font-semibold text-slate-900">••••••••••</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePopulateAdmin}
                className="w-full py-1.5 px-3 rounded-lg bg-red-100 hover:bg-red-200 text-[#b0000b] font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Use Pre-filled Admin Credentials</span>
              </button>
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-display font-semibold text-xs text-slate-800">Moderator ID</label>
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin.review@tic.state.edu"
                  className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#b0000b]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-display font-semibold text-xs text-slate-800">Security Token / Password</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#b0000b]"
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">
                Moderator clearance grants inspection rights for grading items: <strong>Excellent, Good, Bad, Horrible</strong> and curating Arts Club collections.
              </p>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-black text-white py-2.5 px-4 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Login to Quality Control Console</span>
              </button>
            </form>
          </div>
        )}

        <div className="pt-1 text-center text-[10px] text-slate-400">
          Secured with State Univ 2FA & Student Directory • © 2026 TIC
        </div>
      </div>
    </div>
  );
};
