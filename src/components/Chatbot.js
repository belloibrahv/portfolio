import React, { useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiX } from "react-icons/fi";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    filter: brightness(1.1);
    transform: scale(1.08);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 110px;
  right: 32px;
  width: 340px;
  max-width: 95vw;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  color: #fff;
  padding: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.bg};
  max-height: 320px;
  overflow-y: auto;
`;

const ChatInputWrapper = styled.form`
  display: flex;
  padding: 12px;
  background: ${({ theme }) => theme.card};
`;

const ChatInput = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 1rem;
  outline: none;
  margin-right: 8px;
`;

const SendButton = styled.button`
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Message = styled.div`
  align-self: ${({ fromUser }) => (fromUser ? "flex-end" : "flex-start")};
  background: ${({ fromUser, theme }) =>
    fromUser
      ? "linear-gradient(90deg, #00C9A7 0%, #845EC2 100%)"
      : theme.card};
  color: ${({ fromUser, theme }) => (fromUser ? "#fff" : theme.text_primary)};
  padding: 10px 16px;
  border-radius: 16px;
  margin-bottom: 4px;
  max-width: 80%;
  font-size: 1rem;
  box-shadow: ${({ fromUser }) =>
    fromUser ? "0 2px 8px rgba(0,0,0,0.08)" : "none"};
`;

const FAQ = [
  {
    q: "What tech stacks does Ibrahim know?",
    a: "Ibrahim is skilled in React, TypeScript, Python, Node.js, Docker, PostgreSQL, and more. He builds scalable full-stack apps for startups.",
  },
  {
    q: "Tell me about his latest projects.",
    a: "Recent projects include an AI Model Training Platform (React, Django, Docker), a SaaS dashboard, and several open-source tools. See the Projects section for details!",
  },
  {
    q: "How can I hire him?",
    a: "Just use the 'Let's Work Together' button or the Contact section to reach out. Ibrahim is open to remote, global opportunities!",
  },
  {
    q: "Does Ibrahim have experience with remote teams?",
    a: "Yes! Ibrahim has worked with distributed teams across multiple time zones, delivering results for global startups.",
  },
  {
    q: "Where can I find his resume?",
    a: "You can view or download his resume in the Resume section above.",
  },
];

function getFAQAnswer(question) {
  const found = FAQ.find(f => question.toLowerCase().includes(f.q.toLowerCase().slice(0, 12)));
  return found ? found.a : "Sorry, I don't have an answer for that yet. Try asking about skills, projects, or hiring!";
}

const OLLAMA_API_URL = "https://branches-est-match-gang.trycloudflare.com/api/chat";
const OLLAMA_MODEL = "llama3";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { fromUser: false, text: "Hi! 👋 I'm Ibrahim's assistant. Ask me about his skills, projects, or how to hire him!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { fromUser: true, text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(OLLAMA_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages: [
            { role: "user", content: input }
          ]
        })
      });
      // Check if response is streaming (text/event-stream)
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("text/event-stream")) {
        // Streamed response
        const reader = res.body.getReader();
        let aiText = "";
        let decoder = new TextDecoder();
        let done = false;
        let partialText = ""; // local variable for partial updates

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data:")) {
                try {
                  const json = JSON.parse(line.replace("data:", "").trim());
                  if (json.message && json.message.content) {
                    aiText += json.message.content;
                    partialText = aiText;
                    const textToShow = partialText;
                    setMessages(msgs => {
                      if (msgs[msgs.length - 1]?.fromUser === false && msgs[msgs.length - 1]?.text.endsWith("…")) {
                        return [...msgs.slice(0, -1), { fromUser: false, text: textToShow + "…" }];
                      }
                      return [...msgs, { fromUser: false, text: textToShow + "…" }];
                    });
                  }
                } catch {}
              }
            }
          }
        }
        // Finalize message
        setMessages(msgs => {
          // Remove last partial
          if (msgs[msgs.length - 1]?.fromUser === false && msgs[msgs.length - 1]?.text.endsWith("…")) {
            return [...msgs.slice(0, -1), { fromUser: false, text: aiText }];
          }
          return [...msgs, { fromUser: false, text: aiText }];
        });
      } else {
        // Non-streaming JSON response
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const aiText = data?.message?.content || "(No response from Llama)";
        setMessages(msgs => [...msgs, { fromUser: false, text: aiText }]);
      }
    } catch (err) {
      setMessages(msgs => [...msgs, { fromUser: false, text: getFAQAnswer(userMsg.text) + "\n(API fallback)" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FloatingButton onClick={() => setOpen(o => !o)} aria-label="Open chat">
        {open ? <FiX /> : <FiMessageCircle />}
      </FloatingButton>
      {open && (
        <ChatWindow>
          <ChatHeader>
            Ask Ibrahim's AI Assistant
            <FiX style={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
          </ChatHeader>
          <ChatBody>
            {messages.map((msg, i) => (
              <Message key={i} fromUser={msg.fromUser}>{msg.text}</Message>
            ))}
            {loading && <Message fromUser={false}>Thinking...</Message>}
          </ChatBody>
          <ChatInputWrapper onSubmit={handleSend}>
            <ChatInput
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              aria-label="Type your question"
              disabled={loading}
            />
            <SendButton type="submit" disabled={loading}>Send</SendButton>
          </ChatInputWrapper>
        </ChatWindow>
      )}
    </>
  );
};

export default Chatbot;
 