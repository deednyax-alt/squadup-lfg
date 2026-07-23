import React from 'react';
import { Shield, UserPlus, MessageSquare, Award, Mic, Globe, Check, Gamepad2 } from 'lucide-react';

export default function PlayerCard({ 
  player, 
  currentUser, 
  games, 
  platforms, 
  isFriend, 
  isPending, 
  onSendFriendRequest, 
  onOpenChat, 
  onRateUser 
}) {
  const isSelf = player.id === currentUser.id;

  // Calculate compatibility score with current user
  const calculateCompatibility = () => {
    let score = 50;
    const myGames = currentUser.games?.map(g => g.gameId) || [];
    const playerGames = player.games?.map(g => g.gameId) || [];
    const commonGames = playerGames.filter(g => myGames.includes(g));
    score += commonGames.length * 20;

    const myPlatforms = currentUser.platforms || [];
    const playerPlatforms = player.platforms || [];
    if (playerPlatforms.some(p => myPlatforms.includes(p))) {
      score += 15;
    }

    const myLangs = currentUser.languages || [];
    const playerLangs = player.languages || [];
    if (playerLangs.some(l => myLangs.includes(l))) {
      score += 15;
    }

    return Math.min(99, score);
  };

  const compatibility = calculateCompatibility();

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-gaming-border flex flex-col justify-between">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={player.avatar}
                alt={player.username}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-500/60 shadow-glow-purple"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0b0e14]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-slate-100">{player.username}</h3>
                <span className="text-xs font-mono text-slate-400">{player.tag}</span>
              </div>
              <p className="text-xs text-green-400 font-medium">
                {player.repScore || 100}% Réputation 🛡️
              </p>
            </div>
          </div>

          {/* Compatibility badge */}
          <div className="text-right">
            <span className="inline-block text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-gradient-to-r from-purple-900/80 to-cyan-900/80 border border-cyan-500/40 text-cyan-300">
              {compatibility}% Match
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-gaming-border/60 mb-3 leading-relaxed">
          {player.bio || 'Aucune biographie rédigée pour le moment.'}
        </p>

        {/* Platform Pseudos Section */}
        <div className="space-y-1.5 mb-3 bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/30">
          <span className="text-[10px] text-cyan-400 uppercase font-bold block">
            Pseudos & Tags Plateformes :
          </span>
          <div className="grid grid-cols-1 gap-1">
            {player.platforms?.map(pId => {
              const plat = platforms.find(p => p.id === pId);
              const pTag = player.platformTags?.[pId] || player.username;
              return (
                <div key={pId} className="flex items-center justify-between text-xs px-2 py-1 rounded-lg bg-slate-900/80 border border-gaming-border">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <span>{plat?.icon}</span>
                    <span>{plat?.name}:</span>
                  </span>
                  <span className="font-mono text-xs text-cyan-300 font-semibold">{pTag}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Games & Ranks */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Jeux principaux & Rangs:</span>
          <div className="grid grid-cols-1 gap-1">
            {player.games?.map(g => {
              const gameObj = games.find(item => item.id === g.gameId);
              return (
                <div key={g.gameId} className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-gaming-border/50">
                  <span className="font-semibold text-slate-200">{gameObj?.icon} {gameObj?.name}</span>
                  <span className="text-purple-400 text-[11px] font-medium">{g.rank}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges preview */}
        {player.badges && player.badges.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {player.badges.map(b => (
              <span key={b.id} className="text-[10px] px-2 py-0.5 rounded-md badge-reputation text-slate-200 flex items-center gap-1">
                <span>{b.icon}</span>
                <span>{b.label}</span>
                <span className="text-cyan-400 font-bold">({b.count})</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-3 border-t border-gaming-border">
        
        {isSelf ? (
          <span className="w-full text-center py-2 text-xs font-medium text-slate-500 bg-slate-900 rounded-xl">
            C'est votre profil
          </span>
        ) : (
          <>
            <button
              onClick={() => onRateUser(player)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-400 text-xs font-semibold border border-gaming-border transition-colors flex items-center gap-1"
              title="Evaluer la réputation de ce joueur"
            >
              <Award className="w-3.5 h-3.5" />
              Noter
            </button>

            <button
              onClick={() => onOpenChat(player.id)}
              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-gaming-border transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Message
            </button>

            {isFriend ? (
              <span className="px-3 py-2 rounded-xl bg-green-950/60 border border-green-500/40 text-green-400 text-xs font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Ami
              </span>
            ) : isPending ? (
              <span className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold">
                En attente
              </span>
            ) : (
              <button
                onClick={() => onSendFriendRequest(player.id)}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-glow-purple transition-all flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Ajouter
              </button>
            )}
          </>
        )}

      </div>

    </div>
  );
}
