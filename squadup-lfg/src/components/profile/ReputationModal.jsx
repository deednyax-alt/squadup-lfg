import React, { useState } from 'react';
import { X, Award, ShieldCheck, Heart, ThumbsUp, Sparkles } from 'lucide-react';

export default function ReputationModal({ targetUser, onClose, onGiveReputation }) {
  const BADGES = [
    { id: 'comm', label: 'Bonne communication', icon: '🎙️', desc: 'Communique les infos rapidement et clairement' },
    { id: 'nontoxic', label: 'Non-toxique / Fairplay', icon: '💚', desc: 'Reste positif même en cas de défaite' },
    { id: 'clutch', label: 'Clutch God', icon: '🔥', desc: 'Capable de retourner des situations compliquées' },
    { id: 'team', label: 'Esprit d\'équipe', icon: '🛡️', desc: 'Privilégie la victoire d\'équipe au score individuel' },
    { id: 'patient', label: 'Patient & Formateur', icon: '🎓', desc: 'Aide les débutants à progresser avec bienveillance' },
    { id: 'chill', label: 'Ambiance Chill', icon: '☕', desc: 'Super compagnie pour passer un bon moment' },
  ];

  const [selectedBadge, setSelectedBadge] = useState(BADGES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGiveReputation(targetUser.id, selectedBadge.id, selectedBadge.label, selectedBadge.icon);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-gaming-card border border-gaming-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gaming-border bg-slate-900/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-400" />
            <h2 className="font-bold text-lg text-slate-100 font-display">Évaluer le Joueur</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Target player info */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-gaming-border">
            <img src={targetUser.avatar} alt={targetUser.username} className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <h3 className="font-bold text-sm text-slate-100">{targetUser.username} <span className="text-xs text-slate-400">{targetUser.tag}</span></h3>
              <p className="text-xs text-green-400 font-semibold">{targetUser.repScore}% Réputation communautaire</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            Attribuez un badge de réputation positive pour récompenser son bon comportement en jeu :
          </p>

          {/* Badges list */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {BADGES.map(badge => {
              const isSelected = selectedBadge.id === badge.id;
              return (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-500 shadow-glow-purple scale-[1.01]'
                      : 'bg-slate-900/40 border-gaming-border/60 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-200">{badge.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-gaming-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-amber-500 hover:to-gold-600 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <ThumbsUp className="w-4 h-4 fill-slate-950" />
              Attribuer le Badge
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
