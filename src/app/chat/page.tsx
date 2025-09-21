'use client';

import { useState } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState<
        { role: 'user' | 'assistant'; content: string }[]
    >([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ messages: newMessages }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">مساعد سلتي</h2>
            <div className="mb-4 h-64 overflow-y-auto border p-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200'
                            }`}
                    >
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <input
                className="border p-2 w-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
            />
            <button
                onClick={handleSend}
                disabled={loading}
                className="mt-2 w-full bg-blue-600 text-white p-2 rounded"
            >
                {loading ? 'جارٍ الرد...' : 'إرسال'}
            </button>
        </div>
    );
}
