import React, { useState } from 'react';
import { Search, Filter, Mic, Sparkles, PlusCircle, Gamepad2 } from 'lucide-react';
import LfgCard from './LfgCard';

export default function LfgFeed({ 
  posts, 
  games, 
  platforms, 
  users, 
  currentUser, 
  selectedGame, 
  setSelectedGame, 
  selectedPlatform, 
  setSelectedPlatform,
  onJoinPost,
  onOpenChat,
  onSendFriendRequest,
  onOpenCreatePost,
  onRateUser
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [micOnly, setMicOnly] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    // Game filter
    if (selectedGame !== 'all' && post.gameId !== selectedGame) return false;
    // Platform filter
    if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
    // Mic filter
    if (micOnly && !post.microRequired) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const gameObj = games.find(g => g.id === post.gameId);
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchDesc = post.description.toLowerCase().includes(q);
      const matchGame = gameObj?.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchGame) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-gaming-border flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une annonce par jeu, mode ou mot clé..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-gaming-border text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Quick Filter Toggles */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          
          <button
            onClick={() => setMicOnly(!micOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
              micOnly
                ? 'bg-green-950/60 border-green-500/60 text-green-400'
                : 'bg-slate-900 border-gaming-border text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            Micro Obligatoire
          </button>

          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-glow-purple whitespace-nowrap ml-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Publier
          </button>

        </div>

      </div>

      {/* Posts Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          <strong className="text-cyan-400">{filteredPosts.length}</strong> annonce{filteredPosts.length > 1 ? 's' : ''} disponible{filteredPosts.length > 1 ? 's' : ''}
        </span>
        {(selectedGame !== 'all' || selectedPlatform !== 'all' || micOnly || searchQuery) && (
          <button
            onClick={() => {
              setSelectedGame('all');
              setSelectedPlatform('all');
              setMicOnly(false);
              setSearchQuery('');
            }}
            className="text-purple-400 hover:underline"
          >
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-gaming-border">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="font-bold text-lg text-slate-200">Aucune annonce ne correspond à votre recherche</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Essayez de modifier vos filtres ou soyez le premier à publier une annonce pour trouver des coéquipiers !
          </p>
          <button
            onClick={onOpenCreatePost}
            className="mt-6 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-glow-purple"
          >
            Créer une annonce maintenant
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map(post => {
            const author = users.find(u => u.id === post.authorId);
            const game = games.find(g => g.id === post.gameId);
            const platform = platforms.find(p => p.id === post.platform);
            return (
              <LfgCard
                key={post.id}
                post={post}
                author={author}
                game={game}
                platform={platform}
                currentUser={currentUser}
                onJoinPost={onJoinPost}
                onOpenChat={onOpenChat}
                onSendFriendRequest={onSendFriendRequest}
                onRateUser={onRateUser}
              />
            );
          })}
        </div>
      )}

    </div>
  );
}
