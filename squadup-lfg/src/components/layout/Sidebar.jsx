import React from 'react';
import { Gamepad2, Shield, Users, Radio, MessageSquare, Plus, Award } from 'lucide-react';

export default function Sidebar({ 
  games, 
  platforms, 
  selectedGame, 
  setSelectedGame, 
  selectedPlatform, 
  setSelectedPlatform,
  friends,
  allUsers,
  currentUser,
  onOpenChat,
  onOpenProfile,
  onRateUser
}) {
  // Find friend users
  const userFriends = friends.filter(f => f.status === 'accepted').map(f => {
    const friendId = f.userId === currentUser.id ? f.friendId : f.userId;
    return allUsers.find(u => u.id === friendId);
  }).filter(Boolean);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      
      {/* User Quick Card */}
      <div className="glass-panel rounded-2xl p-4 border border-gaming-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl -z-10" />
        
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-12 h-12 rounded-xl object-cover border-2 border-purple-500 shadow-glow-purple"
          />
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
              {currentUser.username}
            </h3>
            <p className="text-xs text-purple-400 font-mono">{currentUser.tag}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-gaming-border">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Réputation</span>
            <span className="text-sm font-extrabold text-green-400">{currentUser.repScore}% 🛡️</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-gaming-border">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Badges</span>
            <span className="text-sm font-extrabold text-cyan-400">
              {currentUser.badges.reduce((acc, b) => acc + b.count, 0)} 🔥
            </span>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="mt-3 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-gaming-border transition-colors flex items-center justify-center gap-1.5"
        >
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          Modifier mon Profil
        </button>
      </div>

      {/* Filter by Platform */}
      <div className="glass-panel rounded-2xl p-4 border border-gaming-border">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-purple-400" />
          Plateformes
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedPlatform === 'all'
                ? 'bg-purple-600/30 border-purple-500 text-white shadow-glow-purple'
                : 'bg-slate-900/50 border-gaming-border text-slate-400 hover:text-slate-200'
            }`}
          >
            🌐 Toutes
          </button>
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                selectedPlatform === p.id
                  ? 'bg-purple-600/30 border-purple-500 text-white shadow-glow-purple'
                  : 'bg-slate-900/50 border-gaming-border text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{p.icon}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Top Games */}
      <div className="glass-panel rounded-2xl p-4 border border-gaming-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            Jeux Populaires
          </h4>
          {selectedGame !== 'all' && (
            <button 
              onClick={() => setSelectedGame('all')}
              className="text-[11px] text-purple-400 hover:underline"
            >
              Réinitialiser
            </button>
          )}
        </div>
        
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedGame('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              selectedGame === 'all'
                ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500 text-white'
                : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>Tous les jeux</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800">ALL</span>
          </button>
          
          {games.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                selectedGame === g.id
                  ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500 text-white'
                  : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{g.icon}</span>
                <span className="truncate max-w-[120px]">{g.name}</span>
              </div>
              <span className="text-[10px] text-slate-500">{g.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Online Friends */}
      <div className="glass-panel rounded-2xl p-4 border border-gaming-border">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-green-400" />
          Liste d'Amis ({userFriends.length})
        </h4>

        {userFriends.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-3">
            Aucun ami pour le moment. Utilisez "Trouver Joueurs" pour ajouter des coéquipiers !
          </p>
        ) : (
          <div className="space-y-2">
            {userFriends.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-gaming-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.username} className="w-7 h-7 rounded-lg" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0b0e14]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{friend.username}</p>
                    <p className="text-[10px] text-green-400">En Ligne</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => onRateUser(friend)}
                    className="p-1 text-slate-400 hover:text-gold-400 hover:bg-slate-800 rounded transition-colors"
                    title="Noter la réputation"
                  >
                    <Award className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                  <button
                    onClick={() => onOpenChat(friend.id)}
                    className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                    title="Envoyer un message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </aside>
  );
}
