import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import LfgFeed from './components/lfg/LfgFeed';
import PlayerSearch from './components/players/PlayerSearch';
import ChatWindow from './components/social/ChatWindow';
import CreatePostModal from './components/lfg/CreatePostModal';
import ProfileModal from './components/profile/ProfileModal';
import ReputationModal from './components/profile/ReputationModal';
import AuthModal from './components/auth/AuthModal';

import { storageService } from './services/storageService';
import { Sparkles, Gamepad2, ShieldCheck, CheckCircle2, ShieldAlert, KeyRound, AlertTriangle, Clock, Lock } from 'lucide-react';

export default function App() {
  // Check if initial registration modal should be shown
  const [showAuthModal, setShowAuthModal] = useState(() => {
    return !localStorage.getItem('squadup_has_onboarded');
  });

  // DevTools / F12 Protection & Admin Mode State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Application Data States
  const [currentUser, setCurrentUser] = useState(() => storageService.getCurrentUser());
  const [users, setUsers] = useState(() => storageService.getUsers());
  const [posts, setPosts] = useState(() => storageService.getPosts());
  const [friends, setFriends] = useState(() => storageService.getFriends(currentUser.id));
  const [messages, setMessages] = useState(() => storageService.getMessagesBetween(currentUser.id, ''));
  const [notifications, setNotifications] = useState(() => storageService.getNotifications(currentUser.id));

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'players' | 'chat'
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [chatRecipientId, setChatRecipientId] = useState(null);

  // Modals
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [reputationTarget, setReputationTarget] = useState(null);

  // Toast alert
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- F12 & RIGHT-CLICK PROTECTION LISTENER ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) || 
          (e.ctrlKey && e.altKey && e.shiftKey && e.key === 'F12')) {
        setIsAdminUnlocked(prev => {
          const nextState = !prev;
          showToast(nextState ? '🔑 Mode Administrateur Activé ! Touche F12 déverrouillée.' : '🔒 Protection F12 Réactivée.');
          return nextState;
        });
        return;
      }

      if (!isAdminUnlocked) {
        const isF12 = e.key === 'F12' || e.keyCode === 123;
        const isInspect = e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key);
        const isViewSource = e.ctrlKey && ['u','U'].includes(e.key);

        if (isF12 || isInspect || isViewSource) {
          e.preventDefault();
          e.stopPropagation();
          showToast('🛑 Touche F12 & Outils de développement désactivés.', true);
        }
      }
    };

    const handleContextMenu = (e) => {
      if (!isAdminUnlocked) {
        e.preventDefault();
        showToast('🛑 Clic droit et Inspecter désactivés pour la sécurité du site.', true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isAdminUnlocked]);

  // Reload data when current user changes or actions are taken
  const refreshState = () => {
    const curr = storageService.getCurrentUser();
    setCurrentUser(curr);
    setUsers(storageService.getUsers());
    setPosts(storageService.getPosts());
    setFriends(storageService.getFriends(curr.id));
    setNotifications(storageService.getNotifications(curr.id));
  };

  // Helper metadata
  const games = storageService.getGames();
  const platforms = storageService.getPlatforms();
  const languages = storageService.getLanguages();
  const regions = storageService.getRegions();

  // Suspension status check
  const suspensionInfo = storageService.isUserSuspended(currentUser.id);

  // Handlers
  const handleRegisterNewUser = (newUserData) => {
    const createdUser = storageService.createUser(newUserData);
    localStorage.setItem('squadup_has_onboarded', 'true');
    setShowAuthModal(false);
    refreshState();
    showToast(`🎮 Bienvenue sur SquadUp ${createdUser.username} ! Vos pseudos de plateformes sont configurés.`);
  };

  const handleSelectDemoUser = (userId) => {
    storageService.setCurrentUserId(userId);
    localStorage.setItem('squadup_has_onboarded', 'true');
    setShowAuthModal(false);
    refreshState();
    const u = storageService.getUserById(userId);
    showToast(`Connecté en tant que ${u?.username}`);
  };

  const handleSwitchUser = (userId) => {
    storageService.setCurrentUserId(userId);
    refreshState();
    const newUser = storageService.getUserById(userId);
    showToast(`Compte démo basculé vers ${newUser?.username}`);
  };

  const handleCreatePost = (postData) => {
    try {
      storageService.createPost(postData);
      refreshState();
      setActiveTab('feed');
      showToast('🎉 Votre annonce LFG a été publiée avec succès !');
    } catch (err) {
      if (err.message === 'CONTENT_BLOCKED_SUSPENDED') {
        refreshState();
        showToast('🛑 Propos insultants détectés ! Votre compte a été suspendu pour 24h.', true);
      } else if (err.message === 'USER_SUSPENDED') {
        showToast('🛑 Votre compte est suspendu. Impossible de publier une annonce.', true);
      }
    }
  };

  const handleJoinPost = (postId) => {
    try {
      storageService.joinPost(postId, currentUser.id);
      refreshState();
      showToast('🎮 Vous avez rejoint l\'escouade !');
    } catch (err) {
      if (err.message === 'USER_SUSPENDED') {
        showToast('🛑 Compte suspendu pour 24h. Actions sociales désactivées.', true);
      }
    }
  };

  const handleSendFriendRequest = (targetUserId) => {
    try {
      storageService.sendFriendRequest(currentUser.id, targetUserId);
      refreshState();
      showToast('✉️ Demande d\'ami envoyée !');
    } catch (err) {
      if (err.message === 'USER_SUSPENDED') {
        showToast('🛑 Compte suspendu pour 24h.', true);
      }
    }
  };

  const handleSendMessage = (senderId, receiverId, text) => {
    try {
      storageService.sendMessage(senderId, receiverId, text);
      setMessages(storageService.getMessagesBetween(currentUser.id, receiverId));
      refreshState();
    } catch (err) {
      if (err.message === 'CONTENT_BLOCKED_SUSPENDED') {
        refreshState();
        showToast('🛑 Insulte ou terme haineux détecté ! Votre compte a été suspendu pour 24 heures.', true);
      } else if (err.message === 'USER_SUSPENDED') {
        showToast('🛑 Votre compte est suspendu pour 24h.', true);
      }
    }
  };

  const handleGiveReputation = (targetUserId, badgeId, badgeLabel, icon) => {
    storageService.addReputation(targetUserId, badgeId, badgeLabel, icon);
    refreshState();
    showToast(`🛡️ Badge "${badgeLabel}" ${icon} attribué avec succès !`);
  };

  const handleSaveProfile = (updatedProfile) => {
    storageService.updateUser(updatedProfile);
    refreshState();
    showToast('✨ Votre profil gaming a été mis à jour.');
  };

  const handleMarkNotifsRead = () => {
    storageService.markNotificationsAsRead(currentUser.id);
    setNotifications(storageService.getNotifications(currentUser.id));
  };

  const handleOpenChatWithUser = (targetUserId) => {
    setChatRecipientId(targetUserId);
    setActiveTab('chat');
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] selection:bg-purple-600 selection:text-white">
      
      {/* Onboarding / Auth Gate Modal */}
      {showAuthModal && (
        <AuthModal
          games={games}
          platforms={platforms}
          languages={languages}
          allUsers={users}
          onRegister={handleRegisterNewUser}
          onSelectUser={handleSelectDemoUser}
        />
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 ${
          toastMessage.isError 
            ? 'bg-red-950/95 border-red-500 text-red-100 shadow-glow-pink' 
            : 'bg-slate-900 border-purple-500 text-slate-100 shadow-glow-purple'
        }`}>
          {toastMessage.isError ? (
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          )}
          <span className="text-xs font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        allUsers={users}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreatePost={() => {
          if (suspensionInfo) {
            showToast('🛑 Votre compte est suspendu. Impossible de créer une annonce.', true);
          } else {
            setShowCreatePost(true);
          }
        }}
        onOpenProfile={() => setShowProfile(true)}
        onSwitchUser={handleSwitchUser}
        notifications={notifications}
        onMarkNotifsRead={handleMarkNotifsRead}
        unreadCount={unreadNotifsCount}
      />

      {/* 🛑 24-HOUR SUSPENSION WARNING BANNER (If active user is suspended) */}
      {suspensionInfo && (
        <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-b border-red-500/80 p-4 text-red-100">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-900/80 border border-red-400 text-white animate-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2 text-white">
                  <span>COMPTE SUSPENDU POUR 24 HEURES</span>
                  <span className="px-2 py-0.5 rounded bg-red-900 border border-red-500 text-[10px] uppercase font-mono">Anti-Toxicité</span>
                </h2>
                <p className="text-xs text-red-200 mt-0.5">
                  Votre compte a été suspendu automatiquement suite à l'envoi de propos ou insultes non-conforme à notre charte.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-red-500/50 text-xs font-mono font-bold text-red-300 shrink-0">
              <Clock className="w-4 h-4 text-red-400" />
              <span>Fin de suspension : {new Date(suspensionInfo.suspendedUntil).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero / Banner Sub-Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950 border-b border-gaming-border/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-wide text-white flex items-center gap-2">
              Trouvez votre <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">Squad de Rêve</span>
              {isAdminUnlocked && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-yellow-950 border border-yellow-500/60 text-yellow-400 flex items-center gap-1">
                  <KeyRound className="w-3 h-3" /> Admin F12 Débloqué
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Fini de jouer en Solo Que. Rejoignez des joueurs passionnés et respectueux. Système anti-toxicité automatique actif.
            </p>
          </div>

          {/* Banner Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (suspensionInfo) {
                  showToast('🛑 Compte suspendu pour 24h.', true);
                } else {
                  setShowCreatePost(true);
                }
              }}
              disabled={!!suspensionInfo}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-glow-purple flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4" /> Publier une annonce
            </button>

            <button 
              onClick={() => setShowAuthModal(true)}
              className="text-xs px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold border border-gaming-border transition-colors"
            >
              + Nouveau Compte
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        {activeTab !== 'chat' && (
          <Sidebar
            games={games}
            platforms={platforms}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            friends={friends}
            allUsers={users}
            currentUser={currentUser}
            onOpenChat={handleOpenChatWithUser}
            onOpenProfile={() => setShowProfile(true)}
            onRateUser={(user) => setReputationTarget(user)}
          />
        )}

        {/* Dynamic Center View */}
        <section className="flex-1 min-w-0">
          
          {activeTab === 'feed' && (
            <LfgFeed
              posts={posts}
              games={games}
              platforms={platforms}
              users={users}
              currentUser={currentUser}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              onJoinPost={handleJoinPost}
              onOpenChat={handleOpenChatWithUser}
              onSendFriendRequest={handleSendFriendRequest}
              onOpenCreatePost={() => {
                if (suspensionInfo) {
                  showToast('🛑 Votre compte est suspendu.', true);
                } else {
                  setShowCreatePost(true);
                }
              }}
              onRateUser={(user) => setReputationTarget(user)}
            />
          )}

          {activeTab === 'players' && (
            <PlayerSearch
              users={users}
              currentUser={currentUser}
              games={games}
              platforms={platforms}
              friends={friends}
              onSendFriendRequest={handleSendFriendRequest}
              onOpenChat={handleOpenChatWithUser}
              onRateUser={(user) => setReputationTarget(user)}
            />
          )}

          {activeTab === 'chat' && (
            <ChatWindow
              currentUser={currentUser}
              allUsers={users}
              initialRecipientId={chatRecipientId}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gaming-border bg-slate-950 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-purple-500" />
            <span className="font-bold text-slate-300">SquadUp Gaming Platform</span>
            <span>— Filtre anti-insultes & modération automatique 24h actifs.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>F12 Protégé 🔒</span>
            <span>•</span>
            <span className="text-green-400 font-semibold">Serveurs En Ligne 🟢</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal
          games={games}
          platforms={platforms}
          regions={regions}
          currentUser={currentUser}
          onClose={() => setShowCreatePost(false)}
          onCreate={handleCreatePost}
        />
      )}

      {showProfile && (
        <ProfileModal
          currentUser={currentUser}
          games={games}
          platforms={platforms}
          languages={languages}
          onClose={() => setShowProfile(false)}
          onSave={handleSaveProfile}
        />
      )}

      {reputationTarget && (
        <ReputationModal
          targetUser={reputationTarget}
          onClose={() => setReputationTarget(null)}
          onGiveReputation={handleGiveReputation}
        />
      )}

    </div>
  );
}
