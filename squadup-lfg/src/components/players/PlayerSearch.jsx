import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, Users, Gamepad2, Sparkles } from 'lucide-react';
import PlayerCard from './PlayerCard';

export default function PlayerSearch({ 
  users, 
  currentUser, 
  games, 
  platforms, 
  friends, 
  onSendFriendRequest, 
  onOpenChat, 
  onRateUser 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Filter players
  const filteredUsers = users.filter(user => {
    // Exclude current user from regular list (optional, but keep so they can see all gamers)
    if (user.id === currentUser.id) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = user.username.toLowerCase().includes(q);
      const matchBio = user.bio?.toLowerCase().includes(q);
      if (!matchName && !matchBio) return false;
    }

    // Game filter
    if (selectedGame !== 'all') {
      const playsGame = user.games?.some(g => g.gameId === selectedGame);
      if (!playsGame) return false;
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      if (!user.platforms?.includes(selectedPlatform)) return false;
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      if (!user.languages?.includes(selectedLanguage)) return false;
    }

    return true;
  });

  // Check friendship status
  const getFriendshipStatus = (otherUserId) => {
    const friendObj = friends.find(f => 
      (f.userId === currentUser.id && f.friendId === otherUserId) ||
      (f.userId === otherUserId && f.friendId === currentUser.id)
    );
    if (!friendObj) return { isFriend: false, isPending: false };
    return {
      isFriend: friendObj.status === 'accepted',
      isPending: friendObj.status === 'pending'
    };
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Title */}
      <div className="glass-panel p-6 rounded-2xl border border-gaming-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-slate-100">Trouver des Joueurs & Coéquipiers</h2>
            <p className="text-xs text-slate-400">
              Recherchez des gamers selon vos jeux, vos plateformes, votre niveau et votre langue.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Text Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pseudo ou mot clé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-gaming-border text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Game Filter */}
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gaming-border text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">🎮 Tous les jeux</option>
            {games.map(g => (
              <option key={g.id} value={g.id}>{g.icon} {g.name}</option>
            ))}
          </select>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gaming-border text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">🌐 Toutes les plateformes</option>
            {platforms.map(p => (
              <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gaming-border text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">🗣️ Toutes les langues</option>
            <option value="Français">Français</option>
            <option value="Anglais">Anglais</option>
            <option value="Espagnol">Espagnol</option>
          </select>

        </div>

      </div>

      {/* Players List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(player => {
          const { isFriend, isPending } = getFriendshipStatus(player.id);
          return (
            <PlayerCard
              key={player.id}
              player={player}
              currentUser={currentUser}
              games={games}
              platforms={platforms}
              isFriend={isFriend}
              isPending={isPending}
              onSendFriendRequest={onSendFriendRequest}
              onOpenChat={onOpenChat}
              onRateUser={onRateUser}
            />
          );
        })}
      </div>

    </div>
  );
}
