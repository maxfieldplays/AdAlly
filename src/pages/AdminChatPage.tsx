import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChatSession {
  id: string;
  visitor_name: string;
  visitor_email: string;
  status: string;
  created_at: string;
}

interface Message {
  id: string;
  message: string;
  sender_type: 'visitor' | 'admin';
  sender_name?: string;
  created_at: string;
}

const AdminChatPage: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [adminName] = useState('Support Agent');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id);
      const subscription = setupRealtime(selectedSession.id);
      return () => {
        subscription?.unsubscribe();
      };
    }
  }, [selectedSession]);

  const loadSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading sessions:', error);
      setLoading(false);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const setupRealtime = (sessionId: string) => {
    const subscription = supabase
      .channel(`admin_chat_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return subscription;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedSession) return;

    const messageText = newMessage;
    setNewMessage('');

    try {
      const { error } = await supabase.from('chat_messages').insert({
        session_id: selectedSession.id,
        message: messageText,
        sender_type: 'admin',
        sender_name: adminName,
        sender_email: 'admin@imagicarts.com',
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      setNewMessage(messageText);
    }
  };

  const closeSession = async () => {
    if (!selectedSession) return;

    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ status: 'closed' })
        .eq('id', selectedSession.id);

      if (error) throw error;

      setSessions(sessions.filter((s) => s.id !== selectedSession.id));
      setSelectedSession(null);
      setMessages([]);
    } catch (error) {
      console.error('Error closing session:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading chat sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sessions List */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Active Chats</h2>
          <p className="text-sm text-gray-500 mt-1">{sessions.length} active session(s)</p>
        </div>

        {sessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No active chat sessions</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                  selectedSession?.id === session.id
                    ? 'border-black bg-gray-50'
                    : 'border-transparent'
                }`}
              >
                <p className="font-semibold text-gray-900">{session.visitor_name}</p>
                <p className="text-sm text-gray-500 truncate">{session.visitor_email}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(session.created_at).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedSession ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSession.visitor_name}
                </h3>
                <p className="text-sm text-gray-500">{selectedSession.visitor_email}</p>
              </div>
              <button
                onClick={closeSession}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center text-gray-500">
                  <p>No messages yet</p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-lg ${
                      msg.sender_type === 'admin'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    {msg.sender_type === 'admin' && (
                      <p className="text-xs font-semibold mb-1 opacity-75">You</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-4 flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500">
            <p>Select a chat session to start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;
