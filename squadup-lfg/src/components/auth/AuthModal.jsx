import React, { useState } from 'react';
import { Gamepad2, User, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function AuthModal({ 
  games, 
  platforms, 
  languages, 
  allUsers, 
  onRegister, 
  onSelectUser 
}) {
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  
  // Registration form states
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['pc']);
  const [platformTags, setPlatformTags] = useState({ pc: '' });
  const [selectedLanguages, setSelectedLanguages] = useState(['Français']);
  const [selectedGames, setSelectedGames] = useState([{ gameId: 'fortnite', rank: 'Casual / Normal' }]);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80');

  const avatarsList = [
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'
  ];

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

  const handlePlatformTagChange = (pId, value) => {
    setPlatformTags({ ...platformTags, [pId]: value });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    // Check that pseudos for selected platforms are entered
    for (const pId of selectedPlatforms) {
      if (!platformTags[pId] || !platformTags[pId].trim()) {
        alert(`Veuillez renseigner votre pseudo/ID pour la plateforme ${platforms.find(p => p.id === pId)?.name}.`);
        return;
      }
    }

    onRegister({
      username: username.trim(),
      bio: bio.trim() || 'Nouveau joueur sur SquadUp !',
      platforms: selectedPlatforms,
      platformTags,
      languages: selectedLanguages,
      games: selectedGames,
      avatar
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-gaming-card border border-gaming-border rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-6 border-b border-gaming-border bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-glow-purple mx-auto mb-3">
            <div className="w-full h-full bg-[#0b0e14] rounded-[14px] flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h2 className="font-display font-black text-2xl text-white tracking-wide">
            Bienvenue sur <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">SquadUp</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Créez votre profil gamer en renseignant vos plateformes et vos identifiants pour trouver des coéquipiers instantanément.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mt-4 bg-slate-950/60 p-1 rounded-xl w-fit mx-auto border border-gaming-border">
            <button
              onClick={() => setMode('register')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'register' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Créer un compte
            </button>
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'login' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Se Connecter (Démo)
            </button>
          </div>
        </div>

        {/* Form Registration */}
        {mode === 'register' ? (
          <form onSubmit={handleSubmitRegister} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            
            {/* Gamertag */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Gamertag / Pseudo Principal *
              </label>
              <input
                type="text"
                required
                placeholder="ex: ShadowPlayer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Avatar selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Choisir un Avatar
              </label>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {avatarsList.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Avatar ${idx}`}
                    onClick={() => setAvatar(url)}
                    className={`w-11 h-11 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                      avatar === url ? 'border-purple-500 scale-105 shadow-glow-purple' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Platforms selection & Platform-specific pseudos */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-gaming-border">
              <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider">
                1. Sélectionnez vos Plateformes de jeu *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {platforms.map(p => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-glow-purple'
                          : 'bg-slate-900 border-gaming-border text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Platform Pseudos Input Fields */}
              <div className="pt-2 space-y-3 border-t border-gaming-border/60">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. Entrez votre Pseudo pour chaque plateforme *
                </label>

                {selectedPlatforms.map(pId => {
                  const platObj = platforms.find(p => p.id === pId);
                  return (
                    <div key={pId} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-gaming-border">
                      <span className="text-xs font-bold text-purple-400 flex items-center gap-1 shrink-0 w-28">
                        <span>{platObj?.icon}</span>
                        <span>{platObj?.name}:</span>
                      </span>
                      <input
                        type="text"
                        required
                        placeholder={platObj?.placeholder || 'Votre pseudo sur cette plateforme'}
                        value={platformTags[pId] || ''}
                        onChange={(e) => handlePlatformTagChange(pId, e.target.value)}
                        className="w-full flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-gaming-border text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Biographie / Présentation rapide
              </label>
              <textarea
                rows={2}
                placeholder="Quel est votre style de jeu ? Vos disponibilités ?"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-glow-purple transition-all"
            >
              Rejoindre SquadUp & Découvrir les Joueurs 🚀
            </button>

          </form>
        ) : (
          /* Login Mode / Quick Account Chooser */
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-400 text-center">
              Sélectionnez un compte démo pré-configuré pour explorer immédiatement l'application :
            </p>
            <div className="space-y-2">
              {allUsers.map(u => (
                <button
                  key={u.id}
                  onClick={() => onSelectUser(u.id)}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-purple-950/40 border border-gaming-border hover:border-purple-500 transition-all flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-100">{u.username} <span className="text-slate-400 font-mono">{u.tag}</span></h4>
                      <p className="text-[10px] text-cyan-400">
                        {u.platforms.map(p => p.toUpperCase()).join(' • ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-purple-400 px-3 py-1 rounded-lg bg-slate-800">
                    Se Connecter
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
