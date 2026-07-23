import React from 'react';
import { 
  Users, 
  Mic, 
  MicOff, 
  Globe, 
  Clock, 
  ShieldCheck, 
  UserPlus, 
  MessageSquare,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';

export default function LfgCard({ 
  post, 
  author, 
  game, 
  platform, 
  currentUser, 
  onJoinPost, 
  onOpenChat, 
  onSendFriendRequest,
  onRateUser
}) {
  const isJoined = post.joinedUserIds?.includes(currentUser.id);
  const isAuthor = post.authorId === currentUser.id;
  const slotsRemaining = (post.neededPlayers + 1) - post.currentPlayers;
  const isFull = slotsRemaining <= 0;

  // Format creation time
  const timeAgo = (dateStr) => {
    const min = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60));
    if (min < 1) return 'À l\'instant';
    if (min < 60) return `il y a ${min} min`;
    const hours = Math.floor(min / 60);
    return `il y a ${hours}h`;
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-gaming-border relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Banner Accent */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{game?.icon || '🎮'}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {game?.name || 'Jeu Vidéo'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 font-semibold">
                {platform?.icon} {platform?.name}
              </span>
              {post.mode && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-medium">
                  {post.mode}
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-slate-100 mt-1 leading-snug">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Remaining slots badge */}
        <div className="shrink-0 text-right">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl border ${
            isFull 
              ? 'bg-red-950/60 border-red-500/40 text-red-400' 
              : 'bg-green-950/60 border-green-500/40 text-green-400'
          }`}>
            <Users className="w-3.5 h-3.5" />
            {post.currentPlayers} / {post.neededPlayers + 1}
          </span>
          <span className="block text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {timeAgo(post.createdAt)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-gaming-border/60 mb-4 leading-relaxed">
        {post.description}
      </p>

      {/* Meta Indicators (Mic, Region, Lang) */}
      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 border-b border-gaming-border/60 pb-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          {post.microRequired ? (
            <>
              <Mic className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 font-semibold">Micro Requis</span>
            </>
          ) : (
            <>
              <MicOff className="w-3.5 h-3.5 text-slate-500" />
              <span>Micro Facultatif</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{post.region || 'Europe'}</span>
        </div>
      </div>

      {/* Host Player Profile & Action Footer */}
      <div className="flex items-center justify-between gap-3 pt-1">
        
        {/* Host User Details */}
        <div 
          onClick={() => onRateUser(author)}
          className="flex items-center gap-2.5 cursor-pointer group" 
          title="Voir la réputation"
        >
          <img
            src={author?.avatar}
            alt={author?.username}
            className="w-9 h-9 rounded-xl object-cover border border-purple-500/50 group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors">
                {author?.username}
              </span>
              <span className="text-[10px] text-green-400 font-mono">
                {author?.repScore || 100}% 🛡️
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              Hôte de l'escouade
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {!isAuthor && (
            <button
              onClick={() => onOpenChat(author?.id)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-gaming-border transition-colors"
              title="Envoyer un message privé"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          {isAuthor ? (
            <span className="text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-xl">
              Votre Annonce
            </span>
          ) : isJoined ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-950/60 border border-green-500/40 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" /> Inscrit
            </span>
          ) : isFull ? (
            <span className="text-xs font-medium text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              Escouade Complète
            </span>
          ) : (
            <button
              onClick={() => onJoinPost(post.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-glow-purple active:scale-95"
            >
              <Gamepad2 className="w-4 h-4" />
              Rejoindre
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
