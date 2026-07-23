export const INITIAL_GAMES = [
  // ⚡ Battle Royale & FPS / TPS
  { id: 'fortnite', name: 'Fortnite', category: 'Battle Royale', icon: '⚡' },
  { id: 'valorant', name: 'Valorant', category: 'FPS Tactique', icon: '🎯' },
  { id: 'apex', name: 'Apex Legends', category: 'Battle Royale', icon: '🔥' },
  { id: 'cod_warzone', name: 'Call of Duty: Warzone / MW3', category: 'FPS', icon: '💥' },
  { id: 'cs2', name: 'Counter-Strike 2 (CS2)', category: 'FPS Tactique', icon: '💣' },
  { id: 'r6', name: 'Rainbow Six Siege', category: 'FPS Tactique', icon: '🛡️' },
  { id: 'overwatch2', name: 'Overwatch 2', category: 'Hero Shooter', icon: '🌀' },
  { id: 'pubg', name: 'PUBG: Battlegrounds', category: 'Battle Royale', icon: '🪂' },
  { id: 'tarkov', name: 'Escape from Tarkov', category: 'Extraction Shooter', icon: '🎒' },
  { id: 'the_finals', name: 'The Finals', category: 'FPS Arena', icon: '🏆' },
  { id: 'xdefiant', name: 'XDefiant', category: 'FPS Arcade', icon: '⚡' },
  { id: 'battlefield', name: 'Battlefield 2042 / 1 / V', category: 'FPS Guerre', icon: '🪖' },
  { id: 'rust', name: 'Rust', category: 'Survie / FPS', icon: '🪨' },
  { id: 'dayz', name: 'DayZ', category: 'Survie Zombie', icon: '🧟' },

  // 🚀 Co-op, PvE & Survie
  { id: 'helldivers2', name: 'Helldivers 2', category: 'Co-op Shooter', icon: '🚀' },
  { id: 'palworld', name: 'Palworld', category: 'Survie / Craft', icon: '🐾' },
  { id: 'lethal_company', name: 'Lethal Company', category: 'Horreur Co-op', icon: '📦' },
  { id: 'content_warning', name: 'Content Warning', category: 'Horreur / Fun', icon: '📹' },
  { id: 'phasmophobia', name: 'Phasmophobia', category: 'Horreur Chasse aux Fantômes', icon: '👻' },
  { id: 'sea_of_thieves', name: 'Sea of Thieves', category: 'Aventure Pirate', icon: '🏴‍☠️' },
  { id: 'deep_rock', name: 'Deep Rock Galactic', category: 'Co-op FPS', icon: '⛏️' },
  { id: 'dbd', name: 'Dead by Daylight', category: 'Horreur Asymétrique', icon: '🔪' },
  { id: 'monster_hunter', name: 'Monster Hunter: World / Wilds', category: 'Action RPG', icon: '🐉' },
  { id: 'destiny2', name: 'Destiny 2', category: 'MMO FPS', icon: '🌌' },
  { id: 'warframe', name: 'Warframe', category: 'Co-op Action', icon: '⚔️' },
  { id: 'borderlands', name: 'Borderlands 3 / Tiny Tina', category: 'Looter Shooter', icon: '🔫' },
  { id: 'space_marine2', name: 'Warhammer 40k: Space Marine 2', category: 'Action Co-op', icon: '🛡️' },
  { id: 'minecraft', name: 'Minecraft', category: 'Sandbox / Craft', icon: '🧱' },
  { id: 'terraria', name: 'Terraria', category: 'Sandbox 2D', icon: '🌳' },
  { id: 'valheim', name: 'Valheim', category: 'Survie Viking', icon: '🛡️' },
  { id: 'ark', name: 'ARK: Survival Ascended / Evolved', category: 'Survie Dinos', icon: '🦖' },

  // ⚔️ MOBA, RPG & Stratégie
  { id: 'lol', name: 'League of Legends (LoL)', category: 'MOBA', icon: '⚔️' },
  { id: 'tft', name: 'Teamfight Tactics (TFT)', category: 'Auto Battler', icon: '♟️' },
  { id: 'dota2', name: 'Dota 2', category: 'MOBA', icon: '🛡️' },
  { id: 'wow', name: 'World of Warcraft', category: 'MMORPG', icon: '🧝' },
  { id: 'diablo4', name: 'Diablo IV', category: 'Hack & Slash', icon: '😈' },
  { id: 'poe', name: 'Path of Exile', category: 'Hack & Slash', icon: '💎' },
  { id: 'bg3', name: 'Baldur\'s Gate 3', category: 'RPG Tactique', icon: '🎲' },
  { id: 'elden_ring', name: 'Elden Ring / Souls', category: 'Action RPG', icon: '💍' },
  { id: 'genshin', name: 'Genshin Impact / Honkai', category: 'Gacha RPG', icon: '✨' },
  { id: 'starcraft2', name: 'StarCraft II', category: 'RTS Stratégie', icon: '🛸' },

  // ⚽ Sport, Course & Combat
  { id: 'rocketleague', name: 'Rocket League', category: 'Sport Voiture', icon: '⚽' },
  { id: 'fc24', name: 'EA Sports FC 24 / FIFA', category: 'Sport Football', icon: '🎮' },
  { id: 'nba2k', name: 'NBA 2K24', category: 'Basket', icon: '🏀' },
  { id: 'trackmania', name: 'TrackMania', category: 'Course Arcade', icon: '🏎️' },
  { id: 'forza', name: 'Forza Horizon 5 / Motorsport', category: 'Course automobile', icon: '🚗' },
  { id: 'f1_game', name: 'F1 23 / F1 24', category: 'Simulation F1', icon: '🏎️' },
  { id: 'sf6', name: 'Street Fighter 6', category: 'Combat', icon: '🥊' },
  { id: 'tekken8', name: 'Tekken 8', category: 'Combat', icon: '👊' },
  { id: 'dragonball', name: 'Dragon Ball Sparking! Zero / FighterZ', category: 'Combat Anime', icon: '💥' },
  { id: 'brawlhalla', name: 'Brawlhalla', category: 'Combat Platform', icon: '⚔️' },

  // 🍄 Nintendo Switch & Open World
  { id: 'smash', name: 'Super Smash Bros. Ultimate', category: 'Nintendo Combat', icon: '🥊' },
  { id: 'mariokart', name: 'Mario Kart 8 Deluxe', category: 'Course Party', icon: '🍄' },
  { id: 'splatoon3', name: 'Splatoon 3', category: 'Shooter Encre', icon: '🦑' },
  { id: 'pokemon', name: 'Pokémon Écarlate / Violet / UNITE', category: 'RPG / MOBA', icon: '⚡' },
  { id: 'gta5', name: 'GTA Online / FiveM RP', category: 'Open World RP', icon: '🚗' },
  { id: 'rdr2', name: 'Red Dead Online', category: 'Open World Western', icon: '🤠' },
  { id: 'other', name: '➕ Autre jeu (Personnalisé)...', category: 'Personnalisé', icon: '🎮' }
];

export const INITIAL_PLATFORMS = [
  { id: 'pc', name: 'PC', icon: '💻', placeholder: 'ex: Steam / Epic / Discord' },
  { id: 'ps5', name: 'PlayStation', icon: '🎮', placeholder: 'ex: ID PSN (ex: Shadow_PSN)' },
  { id: 'xbox', name: 'Xbox', icon: '❎', placeholder: 'ex: Gamertag Xbox' },
  { id: 'switch', name: 'Switch', icon: '🔴', placeholder: 'ex: Pseudo Switch / Code Ami' },
];

export const BANNED_WORDS = [
  'connard', 'con', 'conne', 'connasse', 'conar', 'konar', 'konnard', 'connar', 'conard', 'connardd', 'pov con', 'povcon',
  'putain', 'pute', 'ptn', 'ptin', 'put1', 'ptnnn', 'put1n', 'putainn', 'poute', 'pouetain', 'salopute', 'tmlp',
  'enculé', 'enculée', 'enculer', 'encule', 'nculé', 'anculé', 'enkulé', 'enc', 'vtefe', 'vtfen',
  'salope', 'salaud', 'salopard', 'salop', 'saloop', 'saloppe', 'sallope', 'sal0p', 'sal0ppe',
  'merde', 'merdeux', 'emmerdeur', 'emmerdeuse', 'mrd', 'emrd', 'merdd', 'pauvre merde', 'pm',
  'bâtard', 'batard', 'fdp', 'fdpp', 'fils de pute', 'fils de chien', 'sdb', 'bahtard',
  'abruti', 'abrutie', 'cretin', 'cret1n', 'débile', 'debil', 'debyle', 'imbécile', 'imbecil', 'imbecile',
  'nulard', 'nulos', 'bouffon', 'bouff', 'boufon', 'klown', 'clownd', 'skill issue', 'no aura', 'ratio',
  'enfoiré', 'enfoi', 'anfoiré', 'trou du cul', 'trouduc', 'tdc', 'chienne', 'chiennasse',
  'gros lard', 'gros porcs', 'grolard', 'pédé', 'pd', 'pedé', 'pedale', 'baltringue', 'boloss', 'guedin', 'guedra',
  'dechet de societe', 'dechet humain', 'victime', 'pov victime', 'ntm', 'ta mere'
];

export const containsInsult = (text) => {
  if (!text) return false;
  const clean = text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/@/g,'a').replace(/\$/g,'s').replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/!/g,'i')
    .replace(/[^a-z0-9\s]/g, '');

  return BANNED_WORDS.some(word => {
    if (word.length <= 4) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(clean) || clean.includes(word);
    }
    return clean.includes(word);
  });
};
