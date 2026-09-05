import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

// FUTURE: Replace mock responses with Gemini/OpenAI API integration.

export const AIAssistant = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Hello ${profile?.name || 'there'}! I am your Welfora Assistant. Ask me anything about government scholarships, agricultural subsidies, healthcare schemes, or eligibility rules!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (queryToSend) => {
    const text = queryToSend || inputQuery;
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      if (lower.includes('student') || lower.includes('scholarship') || lower.includes('b.tech') || lower.includes('punjab')) {
        replyText = `Based on your profile (Age: ${profile?.age || 20}, State: ${profile?.state || 'Punjab'}, Student), you may qualify for:\n\n1. Post-Matric Scholarship Scheme for SC/ST/OBC Students (100% fee coverage + monthly allowance).\n2. PM POSHAN Scheme for educational meal support.\n\nRequired documents typically include Marksheets, Income Certificate (< ₹2.5 Lakhs), and Caste Certificate. Would you like details on how to apply?`;
      } else if (lower.includes('farmer') || lower.includes('kisan') || lower.includes('agriculture')) {
        replyText = `For agricultural support, check PM-KISAN (Pradhan Mantri Kisan Samman Nidhi). It provides ₹6,000 per year directly to your bank account in 3 equal installments of ₹2,000. Land ownership proof and Aadhaar linking are required.`;
      } else if (lower.includes('health') || lower.includes('hospital') || lower.includes('ayushman')) {
        replyText = `For healthcare assistance, Ayushman Bharat (PM-JAY) offers cashless hospitalization coverage up to ₹5,00,000 per family annually for secondary and tertiary medical treatments.`;
      } else if (lower.includes('business') || lower.includes('loan') || lower.includes('entrepreneur')) {
        replyText = `For enterprise loans, explore PM MUDRA Yojana (collateral-free loans up to ₹10 Lakhs) and Stand Up India Scheme (loans from ₹10 Lakhs to ₹1 Crore for greenfield projects).`;
      } else {
        replyText = `Thank you for your question. Based on our current database of schemes across ${profile?.state || 'India'}, I recommend exploring our Scheme Explorer or updating your Profile income and occupation settings for maximum rule accuracy.`;
      }

      // FUTURE: Replace mock responses with Gemini/OpenAI API integration.
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="container main-content" style={{ maxWidth: '880px' }}>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          CIVIC AI ASSISTANT
        </span>
        <h1 className="section-title" style={{ marginTop: '0.2rem' }}>Welfora Assistant</h1>
        <p className="section-subtitle">
          Let's help you discover benefits that may be relevant to you.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-600)', alignSelf: 'center' }}>
          Suggested Prompts:
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleSend("I'm a 20-year-old student from Punjab. What schemes might I qualify for?")}
        >
          🎓 Student Scholarships in Punjab
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleSend("What schemes exist for agricultural financial support?")}
        >
          🌾 PM-KISAN & Farmer Benefits
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleSend("Tell me about Ayushman Bharat health insurance.")}
        >
          🏥 Ayushman Bharat Health Cover
        </button>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-600)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800
            }}>
              W
            </div>
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block', color: 'var(--white)' }}>Welfora Civic Assistant</strong>
              <span style={{ fontSize: '0.775rem', opacity: 0.85 }}>● Online Civic Assistant</span>
            </div>
          </div>
          <span style={{
            fontSize: '0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: 'var(--white)',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            Civic AI
          </span>
        </div>

        {/* Message Stream */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
            >
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              <div style={{
                fontSize: '0.7rem',
                opacity: 0.75,
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                marginTop: '0.4rem'
              }}>
                {msg.timestamp}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble chat-bubble-assistant" style={{ fontStyle: 'italic', color: 'var(--neutral-600)' }}>
              🤖 Welfora Assistant is analyzing scheme criteria...
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-container">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Ask about government schemes, scholarships, subsidies..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="primary" onClick={() => handleSend()}>
            Send ➔
          </Button>
        </div>
      </div>
    </div>
  );
};
