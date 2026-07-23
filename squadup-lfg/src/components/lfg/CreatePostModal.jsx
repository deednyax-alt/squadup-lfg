import React, { useState } from 'react';
import { X, PlusCircle, Gamepad2, Mic, Globe, Users } from 'lucide-react';

export default function CreatePostModal({ 
  games, 
  platforms, 
  regions, 
  currentUser, 
  onClose, 
  onCreate 
}) {
  const [title, setTitle] = useState('');
  const [gameId, setGameId] = useState(games[0]?.id || 'fortnite');
  const [platform, setPlatform] = useState(currentUser.platforms?.[0] || 'pc');
  const [mode, setMode] = useState('Ranked / Compétitif');
  const [neededPlayers, setNeededPlayers] = useState(2);
  const [microRequired, setMicroRequired] = useState(true);
  const [region, setRegion] = useState(regions[0] || 'Europe (EU West)');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Veuillez remplir le titre et la description de votre annonce.');
      return;
    }

    onCreate({
      authorId: currentUser.id,
      title: title.trim(),
      gameId,
      platform,
      mode,
      neededPlayers: parseInt(neededPlayers) || 2,
      microRequired,
      region,
      description: description.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-gaming-card border border-gaming-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gaming-border bg-slate-900/80">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-purple-400" />
            <h2 className="font-bold text-lg text-slate-100 font-display">Créer une Annonce LFG</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Titre de l'annonce *
            </label>
            <input
              type="text"
              required
              placeholder="ex: Cherche Duo pour push Champion sur Fortnite ce soir !"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Game & Platform selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Jeu *
              </label>
              <select
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.icon} {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Plateforme *
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              >
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.icon} {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode & Needed players */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Mode de jeu / Activité
              </label>
              <input
                type="text"
                placeholder="ex: Ranked / Raid / Casual"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Joueurs Recherchés
              </label>
              <select
                value={neededPlayers}
                onChange={(e) => setNeededPlayers(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    + {num} joueur{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Micro & Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Région
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-200 font-medium">
                <input
                  type="checkbox"
                  checked={microRequired}
                  onChange={(e) => setMicroRequired(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-gaming-border text-purple-600 focus:ring-purple-500"
                />
                <Mic className="w-4 h-4 text-green-400" />
                Micro Obligatoire
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Description & Précisions *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Précisez votre niveau, vos horaires, vos attentes ou votre tag Discord/Epic/PSN..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Footer Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gaming-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-glow-purple transition-all"
            >
              Publier l'Annonce
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
