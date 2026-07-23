import React, { useState } from 'react';
import { X, User, Shield, Gamepad2, Plus, Trash2, Check, Award } from 'lucide-react';

export default function ProfileModal({ 
  currentUser, 
  games, 
  platforms, 
  languages, 
  onClose, 
  onSave 
}) {
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState(currentUser.platforms || ['pc']);
  const [platformTags, setPlatformTags] = useState(currentUser.platformTags || {});
  const [selectedLanguages, setSelectedLanguages] = useState(currentUser.languages || ['Français']);
  const [userGames, setUserGames] = useState(currentUser.games || []);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  // New game selection states
  const [addGameId, setAddGameId] = useState(games[0]?.id || 'fortnite');
  const [addGameRank, setAddGameRank] = useState('Competitive / Champion');
  const [addGameRole, setAddGameRole] = useState('Rusher');

  const togglePlatform = (pId) => {
    if (selectedPlatforms.includes(pId)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(id => id !== pId));
        const newTags = { ...platformTags };
        delete newTags[pId];
        setPlatformTags(newTags);
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, pId]);
      setPlatformTags({ ...platformTags, [pId]: '' });
    }
  };

  const handlePlatformTagChange = (pId, val) => {
    setPlatformTags({ ...platformTags, [pId]: val });
  };

  const handleAddGame = () => {
    if (userGames.some(g => g.gameId === addGameId)) return;
    setUserGames([...userGames, { gameId: addGameId, rank: addGameRank, role: addGameRole }]);
  };

  const handleRemoveGame = (gId) => {
    setUserGames(userGames.filter(g => g.gameId !== gId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...currentUser,
      username: username.trim(),
      bio: bio.trim(),
      platforms: selectedPlatforms,
      platformTags,
      languages: selectedLanguages,
      games: userGames,
      avatar
    });
    onClose();
  };

  const avatarsList = [
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-gaming-card border border-gaming-border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gaming-border bg-slate-900/80">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            <h2 className="font-bold text-lg text-slate-100 font-display">Mon Profil Gaming</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Choisir un Avatar
            </label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {avatarsList.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Avatar ${idx}`}
                  onClick={() => setAvatar(url)}
                  className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                    avatar === url ? 'border-purple-500 scale-105 shadow-glow-purple' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Gamertag */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Gamertag / Pseudo Principal *
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Biographie & Style de jeu
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Présentez-vous aux autres joueurs..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Platforms & Platform-specific pseudos */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-gaming-border">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Plateformes et Pseudos associés
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {platforms.map(p => {
                const isSelected = selectedPlatforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                        : 'bg-slate-900 border-gaming-border text-slate-400'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 ml-auto" />}
                  </button>
                );
              })}
            </div>

            {/* Input per platform */}
            <div className="pt-2 space-y-2.5 border-t border-gaming-border/60">
              {selectedPlatforms.map(pId => {
                const platObj = platforms.find(p => p.id === pId);
                return (
                  <div key={pId} className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-gaming-border">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1 shrink-0 w-28">
                      <span>{platObj?.icon}</span>
                      <span>{platObj?.name}:</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={platObj?.placeholder}
                      value={platformTags[pId] || ''}
                      onChange={(e) => handlePlatformTagChange(pId, e.target.value)}
                      className="w-full flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-gaming-border text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Langues Parlées
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {languages.map(lang => {
                const isSelected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (selectedLanguages.length > 1) setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                      } else {
                        setSelectedLanguages([...selectedLanguages, lang]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-gaming-border text-slate-400'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Games list & add game */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Jeux Favoris & Rangs
            </label>

            <div className="space-y-2 mb-3">
              {userGames.map(g => {
                const gameObj = games.find(item => item.id === g.gameId);
                return (
                  <div key={g.gameId} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-gaming-border text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{gameObj?.icon}</span>
                      <span className="font-bold text-slate-200">{gameObj?.name}</span>
                      <span className="text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                        {g.rank}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGame(g.gameId)}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add new game inline inputs */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-gaming-border/80 flex flex-col sm:flex-row gap-2 items-center">
              <select
                value={addGameId}
                onChange={(e) => setAddGameId(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-slate-900 border border-gaming-border text-xs text-slate-100"
              >
                {games.map(g => (
                  <option key={g.id} value={g.id}>{g.icon} {g.name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Rang (ex: Diamond III / Gold)"
                value={addGameRank}
                onChange={(e) => setAddGameRank(e.target.value)}
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-gaming-border text-xs text-slate-100"
              />

              <button
                type="button"
                onClick={handleAddGame}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" /> Ajouter Jeu
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gaming-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-glow-purple"
            >
              Enregistrer mon Profil
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
