import {
  INITIAL_GAMES,
  INITIAL_PLATFORMS,
  INITIAL_LANGUAGES,
  INITIAL_REGIONS,
  INITIAL_USERS,
  INITIAL_POSTS,
  INITIAL_FRIENDS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  containsInsult
} from './mockData';

const KEYS = {
  CURRENT_USER_ID: 'squadup_current_user_id',
  USERS: 'squadup_users',
  POSTS: 'squadup_posts',
  FRIENDS: 'squadup_friends',
  MESSAGES: 'squadup_messages',
  NOTIFICATIONS: 'squadup_notifications'
};

const getItem = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage key:', key, e);
    return defaultValue;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage key:', key, e);
  }
};

export const storageService = {
  init() {
    if (!localStorage.getItem(KEYS.USERS)) {
      setItem(KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(KEYS.POSTS)) {
      setItem(KEYS.POSTS, INITIAL_POSTS);
    }
    if (!localStorage.getItem(KEYS.FRIENDS)) {
      setItem(KEYS.FRIENDS, INITIAL_FRIENDS);
    }
    // Always clear messages to start fresh as requested
    setItem(KEYS.MESSAGES, []);
    if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
      setItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(KEYS.CURRENT_USER_ID)) {
      setItem(KEYS.CURRENT_USER_ID, 'user_1');
    }
  },

  getGames: () => INITIAL_GAMES,
  getPlatforms: () => INITIAL_PLATFORMS,
  getLanguages: () => INITIAL_LANGUAGES,
  getRegions: () => INITIAL_REGIONS,

  getCurrentUserId() {
    return getItem(KEYS.CURRENT_USER_ID, 'user_1');
  },
  setCurrentUserId(userId) {
    setItem(KEYS.CURRENT_USER_ID, userId);
  },
  getCurrentUser() {
    const currentId = this.getCurrentUserId();
    const users = this.getUsers();
    return users.find(u => u.id === currentId) || users[0];
  },

  getUsers() {
    return getItem(KEYS.USERS, INITIAL_USERS);
  },
  getUserById(id) {
    return this.getUsers().find(u => u.id === id);
  },
  updateUser(updatedUser) {
    const users = this.getUsers().map(u => u.id === updatedUser.id ? updatedUser : u);
    setItem(KEYS.USERS, users);
    return updatedUser;
  },

  // Check if user is suspended (returns suspension info or false)
  isUserSuspended(userId) {
    const user = this.getUserById(userId);
    if (!user || !user.suspendedUntil) return false;
    const now = new Date().getTime();
    const expiry = new Date(user.suspendedUntil).getTime();
    if (now < expiry) {
      return {
        suspended: true,
        suspendedUntil: user.suspendedUntil,
        remainingMs: expiry - now
      };
    }
    return false;
  },

  // Suspend user account for 24 hours
  suspendUser(userId, reason = 'Publication de contenus insultants') {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      const suspensionEnd = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      users[userIndex].suspendedUntil = suspensionEnd;
      users[userIndex].repScore = Math.max(0, users[userIndex].repScore - 30);
      setItem(KEYS.USERS, users);

      this.addNotification({
        userId: userId,
        type: 'suspension',
        title: '🛑 Compte Suspendu (24 Heures)',
        message: `Votre compte a été suspendu automatiquement pour 24h suite à la détection d'insultes/propos non-conformes.`,
        senderId: 'system'
      });

      return suspensionEnd;
    }
    return null;
  },

  createUser(newUser) {
    const users = this.getUsers();
    const created = {
      ...newUser,
      id: `user_${Date.now()}`,
      tag: `#${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: newUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${newUser.username}`,
      repScore: 100,
      suspendedUntil: null,
      badges: [],
      games: newUser.games || []
    };
    users.push(created);
    setItem(KEYS.USERS, users);
    this.setCurrentUserId(created.id);
    return created;
  },

  getPosts() {
    return getItem(KEYS.POSTS, INITIAL_POSTS);
  },
  createPost(postData) {
    // Anti-toxicity check
    if (containsInsult(postData.title) || containsInsult(postData.description)) {
      this.suspendUser(postData.authorId, 'Annonce avec propos insultants');
      throw new Error('CONTENT_BLOCKED_SUSPENDED');
    }

    const posts = this.getPosts();
    const newPost = {
      ...postData,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString(),
      currentPlayers: 1,
      joinedUserIds: [postData.authorId]
    };
    posts.unshift(newPost);
    setItem(KEYS.POSTS, posts);
    return newPost;
  },

  joinPost(postId, userId) {
    if (this.isUserSuspended(userId)) {
      throw new Error('USER_SUSPENDED');
    }
    const posts = this.getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      const post = posts[postIndex];
      if (!post.joinedUserIds.includes(userId) && post.currentPlayers < (post.neededPlayers + 1)) {
        post.joinedUserIds.push(userId);
        post.currentPlayers += 1;
        posts[postIndex] = post;
        setItem(KEYS.POSTS, posts);

        this.addNotification({
          userId: post.authorId,
          type: 'post_join',
          title: 'Nouveau joueur dans votre escouade !',
          message: `Un joueur a rejoint votre annonce.`,
          senderId: userId
        });
      }
    }
    return posts;
  },

  getFriends(userId) {
    const allFriends = getItem(KEYS.FRIENDS, INITIAL_FRIENDS);
    return allFriends.filter(f => f.userId === userId || f.friendId === userId);
  },

  sendFriendRequest(senderId, targetId) {
    if (this.isUserSuspended(senderId)) throw new Error('USER_SUSPENDED');
    const friends = getItem(KEYS.FRIENDS, INITIAL_FRIENDS);
    const existing = friends.find(f => 
      (f.userId === senderId && f.friendId === targetId) ||
      (f.userId === targetId && f.friendId === senderId)
    );
    if (!existing) {
      friends.push({ userId: senderId, friendId: targetId, status: 'pending' });
      setItem(KEYS.FRIENDS, friends);

      const sender = this.getUserById(senderId);
      this.addNotification({
        userId: targetId,
        type: 'friend_request',
        title: 'Demande d\'ami',
        message: `${sender?.username || 'Un joueur'} souhaite vous ajouter en ami.`,
        senderId: senderId
      });
    }
    return friends;
  },

  addReputation(targetUserId, badgeId, badgeLabel, icon) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === targetUserId);
    if (userIndex !== -1) {
      const user = users[userIndex];
      const badgeIndex = user.badges.findIndex(b => b.id === badgeId);
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].count += 1;
      } else {
        user.badges.push({ id: badgeId, label: badgeLabel, icon: icon, count: 1 });
      }
      user.repScore = Math.min(100, user.repScore + 1);
      users[userIndex] = user;
      setItem(KEYS.USERS, users);
    }
  },

  getMessagesBetween(userA, userB) {
    const all = getItem(KEYS.MESSAGES, []);
    return all.filter(m => (m.senderId === userA && m.receiverId === userB) || (m.senderId === userB && m.receiverId === userA))
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },

  sendMessage(senderId, receiverId, text) {
    if (this.isUserSuspended(senderId)) {
      throw new Error('USER_SUSPENDED');
    }

    // Anti-toxicity check for direct messages
    if (containsInsult(text)) {
      this.suspendUser(senderId, 'Envoi de message insultant');
      throw new Error('CONTENT_BLOCKED_SUSPENDED');
    }

    const messages = getItem(KEYS.MESSAGES, []);
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId,
      receiverId,
      text,
      timestamp: new Date().toISOString(),
      read: false
    };
    messages.push(newMsg);
    setItem(KEYS.MESSAGES, messages);

    const sender = this.getUserById(senderId);
    this.addNotification({
      userId: receiverId,
      type: 'message',
      title: 'Nouveau message privé',
      message: `${sender?.username}: "${text.length > 30 ? text.substring(0, 30) + '...' : text}"`,
      senderId: senderId
    });

    return newMsg;
  },

  getNotifications(userId) {
    const notifs = getItem(KEYS.NOTIFICATIONS, []);
    return notifs.filter(n => n.userId === userId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },
  addNotification(notifData) {
    const notifs = getItem(KEYS.NOTIFICATIONS, []);
    const newNotif = {
      ...notifData,
      id: `notif_${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString()
    };
    notifs.unshift(newNotif);
    setItem(KEYS.NOTIFICATIONS, notifs);
  },
  markNotificationsAsRead(userId) {
    const notifs = getItem(KEYS.NOTIFICATIONS, []);
    const updated = notifs.map(n => n.userId === userId ? { ...n, read: true } : n);
    setItem(KEYS.NOTIFICATIONS, updated);
  }
};
