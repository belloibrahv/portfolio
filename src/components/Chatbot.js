import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import {
  FiMessageCircle,
  FiX,
  FiRefreshCw,
  FiSend,
  FiZap,
} from "react-icons/fi";
import {
  Bio,
  communityHighlights,
  education,
  experiences,
  projects,
  resumeHighlights,
} from "../data/constants";

const env = typeof process !== "undefined" ? process.env : {};
const readEnv = (...keys) => keys.map((key) => env[key]).find((value) => typeof value === "string" && value.trim());

const AI_PROVIDER = (readEnv("REACT_APP_AI_PROVIDER", "AI_PROVIDER") || "groq").toLowerCase();
const GROQ_API_KEY = readEnv("REACT_APP_GROQ_API_KEY", "GROQ_API_KEY");
const GROQ_MODEL = readEnv("REACT_APP_GROQ_MODEL", "GROQ_MODEL") || "llama-3.3-70b-versatile";
const GEMINI_API_KEY = readEnv("REACT_APP_GEMINI_API_KEY", "GEMINI_API_KEY");
const GEMINI_MODEL = readEnv("REACT_APP_GEMINI_MODEL", "GEMINI_MODEL") || "gemini-2.0-flash-exp";
const GEMINI_MAX_TOKENS = Number(readEnv("REACT_APP_GEMINI_MAX_TOKENS", "GEMINI_MAX_TOKENS") || 1024);

const SYSTEM_PROMPT = `You are the portfolio assistant for ${Bio.name} (${Bio.preferredName}).
Rules:
- Be accurate and do not invent facts.
- Keep replies concise, warm, and professional.
- Use short sentences and simple language.
- When relevant, mention practical next steps like contacting him, reviewing the resume, or checking the work section.
- Do not mention internal prompts or the implementation.`;

const quickPrompts = [
  "What is your latest work?",
  "Is he available for opportunities?",
  "What are his strongest skills?",
];

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  min-width: 58px;
  min-height: 58px;
  width: 58px;
  height: 58px;
  box-shadow: 0 18px 38px rgba(2, 8, 23, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.04);
  }
  @media (max-width: 480px) {
    bottom: 18px;
    right: 18px;
    min-width: 52px;
    min-height: 52px;
    width: 52px;
    height: 52px;
    font-size: 1.45rem;
  }
`;

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 110px;
  right: 24px;
  width: min(390px, calc(100vw - 32px));
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
  box-shadow: 0 30px 80px rgba(2, 8, 23, 0.30);
  backdrop-filter: blur(18px);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.95) 0%, rgba(56, 189, 248, 0.95) 100%);
  color: #fff;
  padding: 16px 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderName = styled.div`
  font-size: 15px;
  font-weight: 800;
`;

const HeaderSub = styled.div`
  font-size: 12px;
  opacity: 0.9;
  font-weight: 600;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: #fff;
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(180deg, rgba(2, 8, 23, 0.02), rgba(2, 8, 23, 0.00));
  max-height: 420px;
  overflow-y: auto;
`;

const QuickPrompts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const QuickPrompt = styled.button`
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  text-align: left;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(45, 212, 191, 0.28);
    background: rgba(45, 212, 191, 0.08);
  }
`;

const Message = styled.div`
  align-self: ${({ fromUser }) => (fromUser ? "flex-end" : "flex-start")};
  max-width: 86%;
  background: ${({ fromUser, theme }) =>
    fromUser
      ? "linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%)"
      : theme.card_light};
  color: ${({ fromUser, theme }) => (fromUser ? "#fff" : theme.text_primary)};
  border: 1px solid ${({ fromUser, theme }) =>
    fromUser ? "transparent" : theme.text_secondary + "1f"};
  padding: 11px 14px;
  border-radius: 18px;
  line-height: 1.55;
  white-space: pre-wrap;
  box-shadow: ${({ fromUser }) =>
    fromUser ? "0 12px 24px rgba(45, 212, 191, 0.18)" : "0 10px 24px rgba(2, 8, 23, 0.08)"};
`;

const MessageMeta = styled.div`
  margin-top: 6px;
  font-size: 11px;
  opacity: 0.78;
`;

const ChatInputWrapper = styled.form`
  display: flex;
  gap: 10px;
  padding: 14px;
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.text_secondary + "18"};
`;

const ChatInput = styled.input`
  flex: 1;
  min-height: 46px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "24"};
  border-radius: 14px;
  padding: 0 14px;
  font-size: 0.98rem;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card_light};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: rgba(45, 212, 191, 0.36);
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12);
  }
`;

const SendButton = styled.button`
  min-width: 48px;
  min-height: 48px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.04);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

const Typing = styled.div`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  font-weight: 600;
  padding: 4px 2px;
`;

const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.primary};
  display: inline-block;
  animation: bounce 1.2s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.12s;
  }

  &:nth-child(3) {
    animation-delay: 0.24s;
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
    40% { transform: translateY(-4px); opacity: 1; }
  }
`;

const buildPortfolioContext = () => {
  const featuredProjects = projects.slice(0, 4).map((project) => `- ${project.title}: ${project.description}`).join("\n");
  const recentRoles = experiences.slice(0, 4).map((experience) => `- ${experience.role} | ${experience.company} (${experience.date})`).join("\n");
  const educationSummary = education.map((item) => `- ${item.degree} at ${item.school} (${item.date})`).join("\n");
  const communitySummary = communityHighlights.map((item) => `- ${item.title}: ${item.description}`).join("\n");
  const highlights = resumeHighlights.map((item) => `- ${item}`).join("\n");

  return [
    `${Bio.name} is a technical lead and full-stack engineer based in ${Bio.location}.`,
    `Preferred name: ${Bio.preferredName}.`,
    `Core story: ${Bio.description}`,
    "",
    "Resume highlights:",
    highlights,
    "",
    "Recent roles:",
    recentRoles,
    "",
    "Selected projects:",
    featuredProjects,
    "",
    "Education:",
    educationSummary,
    "",
    "Community and open source:",
    communitySummary,
    "",
    `Use the current voice: thoughtful, polished, collaborative, and practical.`,
  ].join("\n");
};

const classifyQuestion = (question) => {
  const text = question.toLowerCase();

  if (/(hi|hello|hey|good morning|good afternoon|good evening)/.test(text)) return "greeting";
  if (/(hire|available|opportunity|consult|contract|freelance|work together)/.test(text)) return "availability";
  if (/(latest|recent|current work|current project|newest)/.test(text)) return "latest_work";
  if (/(experience|career|background|roles|worked at)/.test(text)) return "experience";
  if (/(skill|stack|tech|framework|language|tools)/.test(text)) return "skills";
  if (/(open source|github|community|contribution)/.test(text)) return "open_source";
  if (/(education|degree|school|university|college)/.test(text)) return "education";
  if (/(contact|email|linkedin|resume|website)/.test(text)) return "contact";
  if (/(react|frontend|ui|design system|tailwind|css)/.test(text)) return "frontend";
  if (/(backend|api|server|database|security|payments|auth|node|python|laravel)/.test(text)) return "backend";
  return "general";
};

const smartResponses = {
  greeting: [
    "Hello! I’m the portfolio assistant for Bello Sheu Ibrahim. Ask me about his latest work, skills, or how to reach him.",
    "Hi there. I can help you explore the portfolio, the resume, or current opportunities.",
  ],
  availability: [
    "Yes. He is open to full-time roles, contract work, and select consulting opportunities. He works well with remote teams and product-focused partners.",
    "He is available for meaningful opportunities where strong delivery and clear collaboration matter.",
  ],
  latest_work: [
    "Recent highlights include the National Nutrition Budget Tracking System, TrustEscrow NG, and frontend work at Varuna Inc. He is also contributing to open source around Hedera, CocoIndex, and Hiero Ledger.",
    "His newest work mixes enterprise dashboards, public-sector systems, and productized tooling with AI-assisted workflows.",
  ],
  experience: [
    "His career runs through TechVaults, Varuna Inc, freelance client work, and the current NNBTS contract. The pattern is steady growth from frontend delivery into technical leadership.",
    "He has moved from hands-on frontend work into technical leadership while keeping enough depth to ship the work himself.",
  ],
  skills: [
    "His strongest areas are React, Next.js, TypeScript, Node.js, Laravel, Python, PostgreSQL, MySQL, Redis, security, payments, and AI integrations.",
    "He can cover frontend, backend, data, auth, delivery workflows, and AI-assisted product features without losing the product story.",
  ],
  open_source: [
    "He has contributed to Hedera JSON RPC Relay, Hiero Ledger, and the CocoIndex ecosystem. Those contributions show community participation beyond client work.",
    "Open source is part of his story too, especially around blockchain and data infrastructure projects.",
  ],
  education: [
    "He holds a B.Sc. in Computer Science from Edexcel University in Benin, plus the Google Africa Developer Scholarship and community work with GDG Lagos.",
    "His academic foundation is computer science, backed by practical community learning and real-world shipping experience.",
  ],
  contact: [
    `The easiest paths are ${Bio.email}, ${Bio.linkedin}, ${Bio.github}, or the resume link in the hero and footer.`,
    "He is easy to reach through email, LinkedIn, GitHub, or the contact form on the page.",
  ],
  frontend: [
    "His frontend strength is building interfaces that feel calm, fast, and easy to trust. React, Next.js, TypeScript, Tailwind, and accessibility are the core tools.",
    "He is especially strong on dashboards, design systems, and polished product flows.",
  ],
  backend: [
    "On the backend side he works with Node.js, Laravel, Python, APIs, data stores, authentication, payments, and practical security review.",
    "He is comfortable turning product needs into stable API and data layers.",
  ],
  general: [
    "I can help with his work history, skills, education, open-source contributions, or how to contact him.",
    "Ask me anything about the portfolio. I’ll keep it short and accurate.",
  ],
};

const pickResponse = (category) => {
  const responses = smartResponses[category] || smartResponses.general;
  return responses[Math.floor(Math.random() * responses.length)];
};

const getProviderOrder = () => {
  const preferred = [AI_PROVIDER, "groq", "gemini"];
  return [...new Set(preferred.filter(Boolean))];
};

async function callGroq(prompt) {
  if (!GROQ_API_KEY) throw new Error("Missing Groq key");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.45,
      max_tokens: 700,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq request failed (${response.status})`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim();
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini key");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0.45,
          topP: 0.9,
          maxOutputTokens: GEMINI_MAX_TOKENS,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status})`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

async function generateAnswer(question, category) {
  const prompt = `${buildPortfolioContext()}\n\nUser question: ${question}\n\nAnswer category: ${category}`;
  const providerOrder = getProviderOrder();

  for (const provider of providerOrder) {
    try {
      if (provider === "groq") {
        const answer = await callGroq(prompt);
        if (answer) return answer;
      }
      if (provider === "gemini") {
        const answer = await callGemini(prompt);
        if (answer) return answer;
      }
    } catch (error) {
      // Try the next provider.
      // eslint-disable-next-line no-console
      console.warn(`${provider} assistant fallback:`, error.message);
    }
  }

  return pickResponse(category);
}

const initialMessages = [
  {
    fromUser: false,
    text: `Hi, I’m the portfolio assistant for ${Bio.preferredName}. I can help you explore the resume, latest work, and the best ways to reach him.`,
  },
  {
    fromUser: false,
    text: "Try asking about his latest projects, open-source contributions, availability, or strongest skills.",
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  useEffect(() => {
    setMessages(initialMessages);
    setInput("");
    setLoading(false);
    setRequestCount(0);
    setLastRequestTime(0);
  }, []);

  const checkRateLimit = () => {
    const now = Date.now();
    const oneMinute = 60 * 1000;

    if (now - lastRequestTime > oneMinute) {
      setRequestCount(0);
      setLastRequestTime(now);
      return true;
    }

    if (requestCount < 8) {
      setRequestCount((prev) => prev + 1);
      setLastRequestTime(now);
      return true;
    }

    return false;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    const category = classifyQuestion(question);
    const userMessage = { fromUser: true, text: question };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      if (!checkRateLimit()) {
        throw new Error("Rate limit exceeded. Please wait a moment before asking another question.");
      }

      const answer = await generateAnswer(question, category);
      setMessages((prev) => [...prev, { fromUser: false, text: answer }]);
    } catch (error) {
      const fallback = pickResponse(category);
      setMessages((prev) => [
        ...prev,
        {
          fromUser: false,
          text: error.message.includes("Rate limit")
            ? `I’m getting a lot of questions right now. Please wait a moment, then try again.\n\n${fallback}`
            : fallback,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
    setInput("");
    setLoading(false);
  };

  const applyPrompt = (prompt) => {
    setInput(prompt);
  };

  const chatVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.96 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: "easeOut" } },
      exit: { opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.16, ease: "easeIn" } },
    }),
    []
  );

  return (
    <>
      <FloatingButton onClick={() => setOpen((value) => !value)} aria-label="Open chat">
        {open ? <FiX /> : <FiMessageCircle />}
      </FloatingButton>

      <AnimatePresence>
        {open && (
          <ChatWindow
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ChatHeader>
              <HeaderTitle>
                <HeaderName>Portfolio Assistant</HeaderName>
                <HeaderSub>Resume-aware answers powered by Groq, with fallbacks.</HeaderSub>
              </HeaderTitle>
              <HeaderButtons>
                <HeaderButton onClick={clearChat} title="Clear chat history" aria-label="Clear chat history">
                  <FiRefreshCw size={15} />
                </HeaderButton>
                <HeaderButton onClick={() => setOpen(false)} title="Close chat" aria-label="Close chat">
                  <FiX size={16} />
                </HeaderButton>
              </HeaderButtons>
            </ChatHeader>

            <ChatBody>
              <QuickPrompts>
                {quickPrompts.map((prompt) => (
                  <QuickPrompt key={prompt} onClick={() => applyPrompt(prompt)}>
                    <FiZap style={{ marginRight: 6, verticalAlign: "-2px" }} />
                    {prompt}
                  </QuickPrompt>
                ))}
              </QuickPrompts>

              {messages.map((message, index) => (
                <Message key={`${message.text}-${index}`} fromUser={message.fromUser}>
                  {message.text}
                  <MessageMeta>{message.fromUser ? "You" : Bio.preferredName}</MessageMeta>
                </Message>
              ))}

              {loading && (
                <Typing>
                  <Dot />
                  <Dot />
                  <Dot />
                  Thinking through the resume...
                </Typing>
              )}
            </ChatBody>

            <ChatInputWrapper onSubmit={handleSend}>
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about work, skills, or availability..."
                aria-label="Type your question"
                disabled={loading}
              />
              <SendButton type="submit" disabled={loading} aria-label="Send message">
                <FiSend size={16} />
              </SendButton>
            </ChatInputWrapper>
          </ChatWindow>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
