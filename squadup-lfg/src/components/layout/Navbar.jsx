import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  PlusCircle, 
  Bell, 
  MessageSquare, 
  User, 
  Users, 
  LogOut, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import NotificationCenter from '../social/NotificationCenter';

export default function Navbar({ 
  currentUser, 
  allUsers, 
  activeTab, 
  setActiveTab, 
  onOpenCreatePost, 
  onOpenProfile, 
  onSwitchUser, 
  notifications,
  onMarkNotifsRead,
  unreadCount
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gaming-border bg-[#0b0e14]/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-glow-purple">
            <div className="w-full h-full bg-[#0b0e14] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-display text-xl font-extrabold tracking-wider bg-gradient-to-r from-purple-400 via-cyan-400 to-white bg-clip-text text-transparent">
              SQUAD<span className="text-purple-500">UP</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-cyan-400 uppercase tracking-widest ml-2 px-1.5 py-0.5 bg-cyan-950/60 border border-cyan-500/30 rounded">
              LFG Matchmaking
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-gaming-card/80 border border-gaming-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'feed'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Annonces LFG
          </button>

          <button
            onClick={() => setActiveTab('players')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'players'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Search className="w-4 h-4" />
            Trouver Joueurs
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messagerie
          </button>
        </nav>

        {/* Action Buttons & User Menu */}
        <div className="flex items-center gap-3">
          
          {/* Create Post Button */}
          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-glow-purple active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Créer une annonce</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifs(!showNotifs);
                if (!showNotifs) onMarkNotifsRead();
              }}
              className="relative p-2.5 rounded-xl bg-gaming-card hover:bg-slate-800 border border-gaming-border text-slate-300 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Menu */}
            {showNotifs && (
              <NotificationCenter 
                notifications={notifications}
                onClose={() => setShowNotifs(false)}
              />
            )}
          </div>

          {/* Current Profile / Demo Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gaming-card hover:bg-slate-800 border border-gaming-border transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-8 h-8 rounded-lg object-cover border border-purple-500/50"
              />
              <span className="hidden md:inline font-semibold text-sm text-slate-200">
                {currentUser.username}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-gaming-card border border-gaming-border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-gaming-border mb-2">
                  <p className="text-xs text-slate-400 font-medium">Connecté en tant que</p>
                  <p className="text-sm font-bold text-cyan-400">{currentUser.username} <span className="text-slate-500 font-normal">{currentUser.tag}</span></p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-semibold">
                      Réputation {currentUser.repScore}% 🛡️
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    onOpenProfile();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  Mon Profil Gaming
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setActiveTab('chat');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  Mes Messages
                </button>

                {/* Demo User Switcher */}
                <div className="mt-2 pt-2 border-t border-gaming-border">
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Changer de compte (Démo)
                  </p>
                  {allUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => {
                        onSwitchUser(user.id);
                        setShowUserDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        user.id === currentUser.id
                          ? 'bg-purple-900/40 text-purple-300 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={user.avatar} className="w-5 h-5 rounded-full" alt="" />
                        <span>{user.username}</span>
                      </div>
                      {user.id === currentUser.id && <span className="text-[10px] text-green-400">Actif</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
