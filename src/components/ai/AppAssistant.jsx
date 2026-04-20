import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const PROMPT_CHIPS = [
  { label: 'How to refer', prompt: 'What is the process for referring someone to RE Jones Global Housing?' },
  { label: 'Available housing', prompt: 'What housing models and programs do you offer?' },
  { label: 'Become a partner', prompt: 'How can my organization partner with RE Jones Global Housing?' },
];

export default function AppAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userMessage = input) => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await base44.functions.invoke('aiAssistant', {
        messages: newMessages,
      });

      const assistantMessage = response.data.message;
      setMessages([
        ...newMessages,
        { role: 'assistant', content: assistantMessage },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            'Sorry, I encountered an error. Please try again or contact us directly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center transition-all z-40"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-[600px] bg-slate-900 rounded-lg shadow-2xl border border-slate-800 flex flex-col z-40">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold text-lg">RE Jones Global</h3>
            <p className="text-indigo-100 text-sm">Partner Information Assistant</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="w-12 h-12 text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm mb-6">
                  Hello! Ask me anything about our housing programs, referral process, or partnership.
                </p>
                <div className="space-y-2 w-full">
                  {PROMPT_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => handleSendMessage(chip.prompt)}
                      className="w-full px-3 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-sm rounded-lg transition-colors border border-indigo-500/30"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-100 border border-slate-700'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-400 px-4 py-2 rounded-lg border border-slate-700">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !loading) handleSendMessage();
                }}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg px-3 py-2 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}