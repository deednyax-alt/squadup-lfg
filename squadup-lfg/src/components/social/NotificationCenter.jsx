import React from 'react';
import { Bell, UserPlus, MessageSquare, Shield, Check, X } from 'lucide-react';

export default function NotificationCenter({ notifications, onClose }) {
  const getIcon = (type) => {
    switch (type) {
      case 'friend_request':
        return <UserPlus className="w-4 h-4 text-cyan-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'reputation':
        return <Shield className="w-4 h-4 text-green-400" />;
      default:
        return <Bell className="w-4 h-4 text-gold-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-gaming-card border border-gaming-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gaming-border bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold text-sm text-slate-200">Notifications</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-gaming-border">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-sm">
            Aucune notification récente.
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id}
              className={`p-3.5 hover:bg-slate-800/60 transition-colors flex gap-3 items-start ${
                !n.read ? 'bg-purple-950/20' : ''
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-800/80 border border-gaming-border shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 text-xs">
                <p className="font-semibold text-slate-200">{n.title}</p>
                <p className="text-slate-400 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
