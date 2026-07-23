import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, Shield, CheckCheck, Smile } from 'lucide-react';

export default function ChatWindow({ 
  currentUser, 
  allUsers, 
  initialRecipientId, 
  messages, 
  onSendMessage 
}) {
  const [activeRecipientId, setActiveRecipientId] = useState(
    initialRecipientId || (allUsers.find(u => u.id !== currentUser.id)?.id)
  );
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const activeRecipient = allUsers.find(u => u.id === activeRecipientId);

  // Filter conversation messages
  const conversationMessages = messages.filter(
    m => (m.senderId === currentUser.id && m.receiverId === activeRecipientId) ||
         (m.senderId === activeRecipientId && m.receiverId === currentUser.id)
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages, activeRecipientId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeRecipientId) return;

    onSendMessage(currentUser.id, activeRecipientId, inputText.trim());
    setInputText('');
  };

  // Contacts list (all users except current user)
  const contacts = allUsers.filter(u => u.id !== currentUser.id);

  return (
    <div className="glass-panel rounded-2xl border border-gaming-border h-[650px] flex overflow-hidden">
      
      {/* Left Contacts Sidebar */}
      <div className="w-full sm:w-72 border-r border-gaming-border bg-slate-950/60 flex flex-col">
        <div className="p-4 border-b border-gaming-border">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            Messagerie Privée
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gaming-border/40">
          {contacts.map(contact => {
            const isSelected = contact.id === activeRecipientId;
            const lastMsg = messages
              .filter(m => (m.senderId === currentUser.id && m.receiverId === contact.id) || (m.senderId === contact.id && m.receiverId === currentUser.id))
              .pop();

            return (
              <button
                key={contact.id}
                onClick={() => setActiveRecipientId(contact.id)}
                className={`w-full p-3 flex items-center gap-3 text-left transition-colors ${
                  isSelected ? 'bg-purple-950/40 border-l-4 border-purple-500' : 'hover:bg-slate-900/60'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={contact.avatar} alt={contact.username} className="w-10 h-10 rounded-xl object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0b0e14]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xs text-slate-200 truncate">{contact.username}</p>
                    {lastMsg && (
                      <span className="text-[10px] text-slate-500">
                        {new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {lastMsg ? lastMsg.text : 'Démarrer une discussion...'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Main Chat Section */}
      <div className="flex-1 flex flex-col bg-slate-900/40">
        
        {/* Chat Header */}
        {activeRecipient ? (
          <div className="p-4 border-b border-gaming-border bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeRecipient.avatar} alt={activeRecipient.username} className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  {activeRecipient.username}
                  <span className="text-xs text-slate-400 font-mono">{activeRecipient.tag}</span>
                </h4>
                <span className="text-[10px] text-green-400 font-medium">En Ligne • {activeRecipient.region}</span>
              </div>
            </div>
            
            <div className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-green-400 font-semibold border border-gaming-border">
              {activeRecipient.repScore}% Réputation 🛡️
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-gaming-border text-slate-400 text-sm">
            Sélectionnez un contact pour discuter.
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {conversationMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center text-slate-500 text-xs">
              Aucun message échangé pour le moment. Envoyez un salut ! 👋
            </div>
          ) : (
            conversationMessages.map(msg => {
              const isMine = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs shadow-md ${
                    isMine 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 border border-gaming-border rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <div className={`text-[9px] mt-1 flex items-center gap-1 ${isMine ? 'text-purple-200 justify-end' : 'text-slate-400'}`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMine && <CheckCheck className="w-3 h-3 text-cyan-300" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 border-t border-gaming-border bg-slate-950/80 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Envoyer un message à ${activeRecipient?.username || 'votre ami'}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-gaming-border text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white transition-all shadow-glow-purple"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
