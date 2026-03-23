import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiX, FiRefreshCw } from "react-icons/fi";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  min-width: 56px;
  min-height: 56px;
  width: 56px;
  height: 56px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    filter: brightness(1.1);
    transform: scale(1.08);
  }
  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    min-width: 52px;
    min-height: 52px;
    width: 52px;
    height: 52px;
    font-size: 1.5rem;
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

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
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
  min-height: 44px;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: filter 0.2s;
  white-space: nowrap;
  &:hover {
    filter: brightness(1.1);
  }
  @media (max-width: 480px) {
    min-height: 40px;
    padding: 8px 14px;
    font-size: 0.9rem;
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

// Portfolio context for AI responses
const getPortfolioContext = () => {
  return `You are Ibrahim Bello's AI assistant. Answer questions about Ibrahim using simple, easy words that anyone can understand. Use short sentences and explain things clearly.

IMPORTANT: Always use simple words like a 5th grader would understand. Avoid big technical words. Explain things in a friendly, easy way.

ABOUT IBRAHIM:
- He builds websites and apps for 5+ years
- He works from Nigeria but helps companies all over the world
- He makes both the parts you see (frontend) and the parts you don't see (backend) of websites
- He loves solving problems and making things work better

FRONTEND EXPERIENCE (What users see and click):
- Makes beautiful websites that work on phones, tablets, and computers
- Uses React to build fast, smooth websites (5+ years experience)
- Knows TypeScript and JavaScript to make websites interactive
- Uses CSS and Tailwind to make websites look great
- Built dashboards for big companies like SAHCO and Custodian
- Made the National Nutrition Budget website for Nigeria government
- Creates buttons, forms, and menus that are easy to use
- Makes sure websites load quickly and work well

BACKEND EXPERIENCE (The hidden parts that make websites work):
- Builds the "brain" of websites using Python and Django (5+ years)
- Creates APIs that connect different parts of websites
- Works with databases to store and find information quickly
- Uses Node.js and Express to build server systems
- Built systems that handle thousands of users at once
- Makes sure user data is safe and secure
- Creates login systems and user accounts
- Connects websites to payment systems and other services

FULL-STACK EXPERIENCE (Both frontend and backend together):
- Can build complete websites from start to finish
- Connects the pretty frontend to the powerful backend
- Built the AI Model Training Platform (complete system)
- Created the Loan Prediction System (full website with AI)
- Made the Career Recommendation System (complete app)
- Works with teams to plan, build, and launch websites
- Fixes problems in any part of a website
- Can take an idea and turn it into a working website

CURRENT PROJECTS:
- National Nutrition Budget System - Helps Nigeria track money for food programs
- AI Model Training Platform - Helps people build smart computer programs
- Loan Defaulter Prediction - Helps banks decide who to lend money to
- Career Recommendation System - Helps people find the right jobs
- Corporate websites for big companies

TOOLS HE USES:
- Frontend: React, Next.js, TypeScript, HTML, CSS, Tailwind
- Backend: Python, Django, Node.js, Express
- Databases: PostgreSQL, MongoDB, Firebase
- Cloud: AWS, Google Cloud, Vercel
- AI Tools: OpenAI, TensorFlow, PyTorch

WORK EXPERIENCE:
- TechVaults Limited (2019-now) - Builds websites for hospitals, banks, and schools
- Varuna Inc, Texas (2023-2024) - Made modern web apps with React
- Many other companies as a contractor

EDUCATION:
- Computer Science degree from Edexcel University (2016-2019)
- Computer Science diploma from Olabisi Onabanjo University (2015-2017)

HOW TO CONTACT:
- GitHub: https://github.com/belloibrahv
- LinkedIn: https://www.linkedin.com/in/ibrahim-bello-8951ba187
- He's available for new projects and jobs
- He can work remotely with teams anywhere in the world

IMPORTANT: Always use simple words and short sentences. Explain technical things in ways that are easy to understand. Be friendly and helpful.`;
};

// Classify user questions for better responses
const classifyQuestion = (question) => {
  const questionLower = question.toLowerCase();
  
  // Latest projects specific questions
  if (questionLower.includes('latest project') || questionLower.includes('recent project') || 
      questionLower.includes('current project') || questionLower.includes('newest project') ||
      questionLower.includes('tell me about his latest') || questionLower.includes('what has he built recently') ||
      questionLower.includes('recent work') || questionLower.includes('latest work')) {
    return 'latest_projects';
  }
  
  // Hiring/availability specific questions
  else if (questionLower.includes('available for hire') || questionLower.includes('is he available') ||
           questionLower.includes('can i hire') || questionLower.includes('hire him') ||
           questionLower.includes('available for work') || questionLower.includes('looking for work') ||
           questionLower.includes('open to opportunities')) {
    return 'hiring_availability';
  }
  
  // React experience specific questions
  else if (questionLower.includes('experience with react') || questionLower.includes('react experience') ||
           questionLower.includes('how long react') || questionLower.includes('react skills') ||
           questionLower.includes('good with react') || questionLower.includes('react expertise')) {
    return 'react_experience';
  }
  
  // Frontend specific questions
  else if (questionLower.includes('frontend') || questionLower.includes('front-end') || questionLower.includes('front end') || 
      questionLower.includes('react') || questionLower.includes('ui') || questionLower.includes('user interface') ||
      questionLower.includes('css') || questionLower.includes('html') || questionLower.includes('javascript') ||
      questionLower.includes('typescript') || questionLower.includes('tailwind') || questionLower.includes('design') ||
      questionLower.includes('responsive') || questionLower.includes('mobile') || questionLower.includes('website look')) {
    return 'frontend';
  }
  
  // Backend specific questions
  else if (questionLower.includes('backend') || questionLower.includes('back-end') || questionLower.includes('back end') ||
           questionLower.includes('server') || questionLower.includes('database') || questionLower.includes('api') ||
           questionLower.includes('python') || questionLower.includes('django') || questionLower.includes('node') ||
           questionLower.includes('express') || questionLower.includes('postgresql') || questionLower.includes('mongodb') ||
           questionLower.includes('data') || questionLower.includes('security') || questionLower.includes('login system')) {
    return 'backend';
  }
  
  // Full-stack specific questions
  else if (questionLower.includes('full-stack') || questionLower.includes('fullstack') || questionLower.includes('full stack') ||
           questionLower.includes('complete website') || questionLower.includes('end to end') || questionLower.includes('both frontend and backend') ||
           questionLower.includes('whole system') || questionLower.includes('entire application') || questionLower.includes('complete app')) {
    return 'fullstack';
  }
  
  // General experience questions
  else if (questionLower.includes('experience') || questionLower.includes('background') || questionLower.includes('career') || questionLower.includes('job')) {
    return 'experience';
  }
  
  // Project questions
  else if (questionLower.includes('project') || questionLower.includes('work') || questionLower.includes('built') || questionLower.includes('portfolio')) {
    return 'projects';
  }
  
  // Skills questions
  else if (questionLower.includes('skill') || questionLower.includes('tech') || questionLower.includes('language') || questionLower.includes('framework') || questionLower.includes('tool')) {
    return 'skills';
  }
  
  // Contact/hiring questions
  else if (questionLower.includes('hire') || questionLower.includes('contact') || questionLower.includes('available') || questionLower.includes('work together')) {
    return 'contact';
  }
  
  // Education questions
  else if (questionLower.includes('education') || questionLower.includes('degree') || questionLower.includes('university') || questionLower.includes('school')) {
    return 'education';
  }
  
  return 'general';
};

// Generate contextual prompts based on question type
const getContextualPrompt = (question, category) => {
  const baseContext = getPortfolioContext();
  
  switch (category) {
    case 'latest_projects':
      return `${baseContext}\n\nThe user is asking about Ibrahim's LATEST/RECENT projects. Focus on his newest work from 2025-2026. Use simple words to explain:
- National Nutrition Budget System (2025) - helps Nigeria track money for food programs
- AI Model Training Platform - helps people build smart computer programs  
- Loan Defaulter Prediction System - helps banks decide who to lend money to
- Career Recommendation System - helps people find the right jobs
- Recent corporate websites he built
Explain what each project does and why it's important!\n\nUser question: ${question}`;
      
    case 'hiring_availability':
      return `${baseContext}\n\nThe user is asking if Ibrahim is AVAILABLE FOR HIRE. Use simple words to explain:
- Yes, he's looking for new projects and jobs!
- He can work full-time, part-time, or on contracts
- He works great with teams from anywhere in the world
- He's worked with American, European, and other international companies
- How to contact him (LinkedIn, GitHub, contact form)
- Why he's a great choice for their project
Be encouraging and helpful!\n\nUser question: ${question}`;
      
    case 'react_experience':
      return `${baseContext}\n\nThe user is asking about Ibrahim's REACT EXPERIENCE specifically. Use simple words to explain:
- He's been using React for 5+ years (since 2019)
- He built many websites and apps with React
- He knows React, Next.js, and TypeScript really well
- He built the National Nutrition Budget website with React
- He worked at Varuna Inc building React apps
- He can make websites that work on phones and computers
- Examples of React projects he built
Keep it simple and focus on React!\n\nUser question: ${question}`;
    
    case 'frontend':
      return `${baseContext}\n\nThe user is asking about Ibrahim's FRONTEND experience. Focus on what users see and click on websites. Use simple words to explain:
- How he makes websites look good and work well
- His 5+ years with React and JavaScript
- How he makes websites work on phones and computers
- The pretty websites he built for companies
- How he makes buttons, forms, and menus easy to use
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    case 'backend':
      return `${baseContext}\n\nThe user is asking about Ibrahim's BACKEND experience. Focus on the hidden parts that make websites work. Use simple words to explain:
- How he builds the "brain" of websites with Python and Django
- How he makes databases store information safely
- How he connects different parts of websites
- How he makes login systems and keeps data secure
- His 5+ years building server systems
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    case 'fullstack':
      return `${baseContext}\n\nThe user is asking about Ibrahim's FULL-STACK experience. Focus on how he builds complete websites from start to finish. Use simple words to explain:
- How he can make both the pretty parts (frontend) and the working parts (backend)
- Complete projects he built like the AI Training Platform
- How he takes ideas and turns them into working websites
- How he works with teams to plan and build websites
- Why being full-stack makes him special
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    case 'projects':
      return `${baseContext}\n\nThe user is asking about Ibrahim's projects. Use simple words to explain his work:
- What each project does and why it's important
- The tools he used to build them
- How many people use these projects
- What problems they solve
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    case 'skills':
      return `${baseContext}\n\nThe user is asking about Ibrahim's skills. Use simple words to explain:
- What tools and languages he knows
- How long he's been using each skill
- What he can build with these skills
- Why these skills are useful
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    case 'contact':
      return `${baseContext}\n\nThe user wants to hire or contact Ibrahim. Use simple words to explain:
- How to reach him (GitHub, LinkedIn)
- That he's available for new projects
- That he can work with teams anywhere in the world
- Why he's a good choice for their project
Be encouraging and helpful!\n\nUser question: ${question}`;
      
    case 'experience':
      return `${baseContext}\n\nThe user is asking about Ibrahim's work experience. Use simple words to explain:
- Where he has worked and for how long
- What kind of projects he built at each job
- How he helps companies solve problems
- Why his experience makes him good at his job
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    case 'education':
      return `${baseContext}\n\nThe user is asking about Ibrahim's education. Use simple words to explain:
- His Computer Science degrees
- What he learned in school
- How his education helps him build better websites
Keep it simple and easy to understand!\n\nUser question: ${question}`;
      
    default:
      return `${baseContext}\n\nProvide a helpful response about Ibrahim using simple, easy words that anyone can understand. Use short sentences and be friendly.\n\nUser question: ${question}`;
  }
};

// Enhanced FAQ with better pattern matching and friendly responses
const FAQ_RESPONSES = {
  // Greetings and casual conversation
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'what\'s up', 'sup', 'yo'],
    responses: [
      "Hello! 👋 Great to meet you! I'm here to help you learn about Ibrahim's work and experience. What would you like to know?",
      "Hi there! 😊 I'm Ibrahim's AI assistant. I'd love to tell you about his projects, skills, or availability. What interests you most?",
      "Hey! 👋 Welcome to Ibrahim's portfolio! I can share insights about his development work, technical expertise, or career background. What catches your eye?"
    ]
  },
  
  // Appreciation and thanks
  thanks: {
    patterns: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'perfect', 'excellent', 'amazing', 'cool', 'nice'],
    responses: [
      "You're very welcome! 😊 Is there anything else you'd like to know about Ibrahim's work or experience?",
      "Glad I could help! Feel free to ask about any of Ibrahim's projects, skills, or professional background.",
      "Happy to assist! 🎉 Let me know if you want to learn more about Ibrahim's development expertise or recent work."
    ]
  },
  
  // Casual questions about the AI
  about_ai: {
    patterns: ['who are you', 'what are you', 'are you ai', 'are you a bot', 'are you real', 'are you human'],
    responses: [
      "I'm Ibrahim's AI assistant! 🤖 I'm here to help you learn about his skills, projects, and professional experience. Think of me as your guide to his portfolio!",
      "I'm an AI assistant created to showcase Ibrahim's work and expertise! I can tell you about his development projects, technical skills, and career journey.",
      "Hi! I'm Ibrahim's digital assistant 🤖 I know all about his programming skills, recent projects, and professional background. What would you like to explore?"
    ]
  },
  
  // How are you / casual check-ins
  casual: {
    patterns: ['how are you', 'how\'s it going', 'what\'s new', 'how do you do', 'how you doing'],
    responses: [
      "I'm doing great, thanks for asking! 😊 I'm excited to share Ibrahim's latest work - he's been building some amazing AI and web applications. Want to hear about them?",
      "Fantastic! I love talking about Ibrahim's projects and skills. He's been working on some really innovative stuff lately. What aspect of his work interests you most?",
      "I'm wonderful, thank you! 🌟 Ibrahim's been keeping busy with exciting projects like AI platforms and enterprise dashboards. Shall I tell you more about his recent work?"
    ]
  },
  
  // Goodbye and ending conversation
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'talk later', 'gtg', 'gotta go', 'farewell', 'catch you later'],
    responses: [
      "Thanks for visiting Ibrahim's portfolio! 👋 Feel free to come back anytime to learn more about his work. Have a great day!",
      "Goodbye! 😊 Don't forget to check out Ibrahim's projects and reach out if you'd like to work together. Take care!",
      "See you later! 🌟 Remember, Ibrahim is always open to exciting opportunities. Feel free to connect with him anytime!"
    ]
  },
  
  // Latest projects specific
  latest_projects: {
    patterns: ['latest project', 'recent project', 'current project', 'newest project', 'tell me about his latest', 'recent work', 'latest work', 'working on now', 'current work'],
    responses: [
      "Ibrahim has been working on some really exciting projects lately! Here are his newest ones:\n\n🏛️ **Nigeria Food Money Tracker (2025)**\n   • Helps Nigeria's government track money for food programs\n   • Built with React and TypeScript\n   • Used by government workers to help people get better nutrition\n\n🤖 **Smart Computer Learning Platform**\n   • Helps people build AI programs that can learn\n   • Makes it easy to create smart apps\n   • Uses Python and special AI tools\n\n💰 **Bank Loan Helper**\n   • Helps banks decide who to lend money to safely\n   • Uses AI to predict if people will pay back loans\n   • Makes banking fairer for everyone\n\nThese projects show how Ibrahim builds things that really help people!",
      "Ibrahim's latest work is really impressive! He just finished building a big system for Nigeria's government that helps track money for nutrition programs - it's helping make sure people get the food they need. He also built an AI platform that makes it easier for other people to create smart computer programs. Plus, he made a system that helps banks make better decisions about loans using artificial intelligence. All of these projects are being used by real people right now to solve important problems!"
    ]
  },

  // Hiring availability specific
  hiring_availability: {
    patterns: ['available for hire', 'is he available', 'can i hire', 'hire him', 'available for work', 'looking for work', 'open to opportunities'],
    responses: [
      "Yes! Ibrahim is definitely available and excited about new opportunities! 🎉\n\n✅ **He's open to:**\n• Full-time jobs with great companies\n• Part-time projects that need expert help\n• Contract work for specific needs\n• Consulting to solve tough problems\n\n🌍 **He works great with international teams:**\n• He's worked with companies in America, Europe, and other places\n• He's excellent at working remotely\n• He can work in different time zones\n• He speaks English clearly and communicates well\n\n💼 **Perfect for projects involving:**\n• Building new websites from scratch\n• Making existing websites better\n• Adding AI features to apps\n• Full-stack development work\n\n**Ready to work with him?**\n• LinkedIn: https://www.linkedin.com/in/ibrahim-bello-8951ba187\n• GitHub: https://github.com/belloibrahv\n• Contact form on this website\n\nHe usually responds quickly and loves discussing new projects!",
      "Absolutely! Ibrahim is actively looking for his next great opportunity. He's perfect for companies that need someone who can build complete websites, work well with remote teams, and deliver high-quality results. He's worked with startups, big companies, and even government projects, so he can adapt to any environment. The best part is he explains technical things in simple terms and makes sure everyone on the team understands what's happening. If you're looking for a reliable, skilled developer who can work anywhere in the world, Ibrahim is your guy!"
    ]
  },

  // React experience specific
  react_experience: {
    patterns: ['experience with react', 'react experience', 'how long react', 'react skills', 'good with react', 'react expertise'],
    responses: [
      "Ibrahim is really experienced with React! Here's what you should know:\n\n⚛️ **5+ Years of React Experience (since 2019)**\n• Started learning React at TechVaults and became an expert\n• Built many websites and apps using React\n• Knows React inside and out\n\n🚀 **What he's built with React:**\n• National Nutrition Budget website for Nigeria government\n• Modern web apps at Varuna Inc in Texas\n• Dashboards for big companies like SAHCO and Custodian\n• AI platforms and smart applications\n\n💡 **He also knows React's friends:**\n• Next.js - for making React websites even faster\n• TypeScript - for writing better, safer code\n• Tailwind CSS - for making websites look great\n• Material UI - for professional-looking components\n\n📱 **Special skills:**\n• Makes websites work perfectly on phones and computers\n• Builds fast, smooth user interfaces\n• Creates websites that are easy and fun to use\n\nIbrahim doesn't just know React - he's a React expert who can build anything you need!",
      "Ibrahim has been working with React for over 5 years and he's really good at it! He started using React in 2019 and has built tons of projects with it since then. He's worked on everything from government websites to AI platforms using React. What makes him special is that he doesn't just know React by itself - he knows how to use it with other modern tools like TypeScript and Next.js to build really professional websites. He's also great at making React websites that work well on both phones and computers. Companies love working with him because he can take complex ideas and turn them into smooth, fast websites that users enjoy using."
    ]
  },

  // Technical/Portfolio specific
  skills: {
    patterns: ['skill', 'tech', 'technology', 'language', 'framework', 'stack', 'programming', 'coding', 'development'],
    responses: [
      "Ibrahim knows lots of tools to build websites! Here's what he's good at:\n\n**Making websites look good (Frontend):**\n• React - Makes websites fast and smooth\n• TypeScript & JavaScript - Makes websites interactive\n• CSS & Tailwind - Makes websites pretty\n• HTML - The basic building blocks\n\n**Making websites work (Backend):**\n• Python & Django - The brain of websites\n• Node.js - Another way to build website brains\n• Databases - Where information is stored safely\n\n**Other cool stuff:**\n• AI tools - Makes smart computer programs\n• Cloud services - Puts websites on the internet\n• Git - Saves and shares code with teams\n\nHe's been using these tools for 5+ years!",
      "Ibrahim is really good at building complete websites from start to finish! He knows how to make the parts you see (like buttons and menus) and the parts you don't see (like databases and servers). His main skills are React for making websites look great, Python for making them work well, and AI tools for making them smart. He's been learning and using these tools for over 5 years, so he's really experienced!"
    ]
  },
  
  projects: {
    patterns: ['project', 'work', 'built', 'created', 'developed', 'portfolio', 'app', 'website', 'application'],
    responses: [
      "Ibrahim has built some really cool projects! Here are his favorites:\n\n🏛️ **Nigeria Food Money Tracker (2025)**\n   • Helps Nigeria's government track money for food programs\n   • Built with modern tools like React and TypeScript\n   • Used by government workers to make better decisions\n\n🤖 **Smart Computer Learning Platform**\n   • Helps people build AI programs that can learn\n   • Uses Python and special AI tools\n   • Makes it easy for others to create smart apps\n\n💰 **Bank Loan Helper**\n   • Helps banks decide who to lend money to\n   • Uses AI to predict if people will pay back loans\n   • Makes banking safer and fairer\n\n🏢 **Company Websites**\n   • Built websites for big companies like SAHCO and Custodian\n   • Made them look professional and work well\n   • Helps companies connect with their customers",
      "Ibrahim loves building things that help people! His recent work includes a website that helps Nigeria track money for food programs - it's used by the government to make sure people get the nutrition they need. He also built AI systems that help banks make better decisions and platforms that make it easier for others to create smart computer programs. Each project shows how he can take big ideas and turn them into working websites that real people use every day!"
    ]
  },
  
  hiring: {
    patterns: ['hire', 'job', 'work together', 'available', 'freelance', 'contract', 'employment', 'opportunity', 'recruit'],
    responses: [
      "Yes! Ibrahim is looking for new projects and would love to work with you! Here's what you need to know:\n\n✅ **He's available for:**\n• Full-time jobs\n• Part-time projects\n• Contract work\n• Consulting help\n\n🌍 **He can work with teams anywhere in the world!**\n• He's worked with people in America, Europe, and other places\n• He's great at working from home\n• He can work in different time zones\n\n� **He's perfect for:**\n• Building websites from scratch\n• Making websites look better\n• Adding new features to existing websites\n• Building AI-powered apps\n\n**How to contact him:**\n• LinkedIn: https://www.linkedin.com/in/ibrahim-bello-8951ba187\n• GitHub: https://github.com/belloibrahv\n• Use the Contact section on this website\n\nHe's friendly, reliable, and loves helping teams build amazing things!",
      "Ibrahim is definitely available and excited about new opportunities! He's been working with teams from different countries for years, so he's really good at remote work. Whether you need someone to build a new website, improve an existing one, or create something with AI, he can help! He's worked with startups, big companies, and government projects. The best part is he explains things in simple terms and makes sure everyone understands what's happening. You can reach out to him through LinkedIn or the contact form - he usually responds quickly!"
    ]
  },
  
  experience: {
    patterns: ['experience', 'background', 'career', 'history', 'worked', 'company', 'job', 'resume'],
    responses: [
      "Ibrahim has been building websites and apps for over 5 years! Here's where he's worked:\n\n🏢 **TechVaults Limited, Nigeria** (2019 - now)\n   • **Job:** Software Engineer (his main job)\n   • **What he does:** Builds websites for hospitals, banks, and schools\n   • **Cool achievement:** Made websites that helped companies get 30% more customers!\n   • **Tools he uses:** React, Python, JavaScript, and databases\n\n🏢 **Varuna Inc, Texas, USA** (2023-2024)\n   • **Job:** Frontend Engineer (worked from Nigeria for American company!)\n   • **What he did:** Made beautiful, fast websites with React\n   • **Special:** Worked with a team across different time zones\n\n🏢 **Nigeria Government Project** (2025-now)\n   • **Job:** Contract Software Engineer\n   • **Project:** Built a system to track money for food programs\n   • **Impact:** Helps make sure people get proper nutrition\n\nHe's also worked with many other companies as a freelancer and contractor!",
      "Ibrahim has built an amazing career over 5+ years! He started at TechVaults in Nigeria where he learned to build websites for different types of businesses. Then he got to work with an American company called Varuna while staying in Nigeria - that's when he really got good at working with international teams. Now he works on really important projects like helping the Nigerian government track nutrition programs. Throughout his career, he's always focused on building things that actually help people and make their lives better. Companies love working with him because he's reliable, explains things clearly, and always delivers great results!"
    ]
  },
  
  // Location and personal info
  location: {
    patterns: ['where', 'location', 'from', 'live', 'based', 'nigeria'],
    responses: [
      "Ibrahim is based in Nigeria and has extensive experience working with global teams remotely! 🌍 He's worked across multiple time zones and has delivered successful projects for clients in the US, Europe, and other regions.",
      "He's from Nigeria and specializes in remote collaboration with international teams. His experience includes working with startups and companies across different continents, making him great for distributed teams!"
    ]
  },

  // General "about him" questions
  about_ibrahim: {
    patterns: ['about him', 'tell me about', 'who is ibrahim', 'more about him', 'know more', 'learn about', 'describe ibrahim', 'ibrahim bello'],
    responses: [
      "Ibrahim Bello is a skilled full-stack developer from Nigeria with 5+ years of professional experience. He specializes in React, TypeScript, Python, and Django, building scalable web applications for global startups and enterprises. Currently working as a Software Engineer at TechVaults Limited since 2019, he's also worked with Varuna Inc in Texas and delivered projects for clients worldwide. He holds a BTech in Computer Science and is passionate about AI/ML technologies, having built platforms for machine learning, nutrition tracking, and financial risk assessment.",
      "Ibrahim is a versatile full-stack developer who combines technical expertise with strong problem-solving skills. With experience spanning healthcare, finance, education, and enterprise applications, he's built everything from AI-powered platforms to corporate websites for major companies like SAHCO PLC and Custodian PLC. His recent work includes the National Nutrition Budget Tracking System (Next.js enterprise dashboard) and multiple machine learning projects. He's known for his ability to work effectively with remote, distributed teams across different time zones."
    ]
  },

  // Professional summary
  summary: {
    patterns: ['summary', 'overview', 'profile', 'introduction', 'brief', 'quick info'],
    responses: [
      "Here's a quick overview of Ibrahim: 🚀\n\n• **Role:** Full-Stack Developer & AI Tools Builder\n• **Experience:** 5+ years in web development\n• **Specialties:** React, TypeScript, Python, Django, AI/ML\n• **Current Position:** Software Engineer at TechVaults Limited\n• **Education:** BTech Computer Science\n• **Notable Projects:** National Nutrition Budget Tracking System, AI Model Training Platform, Loan Defaulter Prediction System\n• **Availability:** Open to remote opportunities globally",
      "Ibrahim Bello - Professional Summary:\n\n✅ **Technical Expertise:** Full-stack development with React, Next.js, Python, Django\n✅ **Industry Experience:** Healthcare, finance, education, enterprise applications\n✅ **Recent Achievements:** Built enterprise dashboards, AI platforms, and SaaS applications\n✅ **Global Experience:** Worked with distributed teams across multiple time zones\n✅ **Education:** Computer Science degree with focus on modern web technologies\n✅ **Specialization:** Scalable applications for startups and growing companies"
    ]
  },

  // What makes him unique
  unique: {
    patterns: ['what makes', 'why choose', 'unique', 'different', 'special', 'standout', 'advantage'],
    responses: [
      "What makes Ibrahim stand out as a developer:\n\n🎯 **Versatile Expertise:** Full-stack capabilities from React frontends to Python backends\n🌍 **Global Experience:** Successfully worked with teams across US, Europe, and other regions\n🚀 **Innovation Focus:** Built AI/ML platforms and modern web applications\n💼 **Business Impact:** Delivered solutions that increased client transactions by 30%\n⚡ **Rapid Development:** Known for building scalable applications quickly and efficiently\n🤝 **Team Collaboration:** Excellent communication skills for remote work environments",
      "Ibrahim brings unique value through his combination of technical depth and practical experience. He's not just a coder - he's a problem solver who understands business needs. His work spans from building machine learning platforms to enterprise dashboards, always focusing on scalability and user experience. With proven experience in remote collaboration and a track record of delivering results for global startups, he brings both technical excellence and professional reliability to every project."
    ]
  },

  // Education and learning
  education: {
    patterns: ['education', 'degree', 'university', 'study', 'school', 'learning', 'qualification'],
    responses: [
      "Ibrahim's educational background:\n\n🎓 **Bachelor of Technology (BTech)** in Computer Science\n   📍 Edexcel University Cotonou, Republic of Benin (2016-2019)\n   📊 CGPA: 3.90\n\n🎓 **Diploma** in Computer Science\n   📍 Olabisi Onabanjo University (O.O.U.C) (2015-2017)\n   📊 Grade: 3.42\n\nHis strong academic foundation in computer science, combined with continuous learning in modern technologies, has enabled him to stay current with industry trends and build cutting-edge applications.",
      "Ibrahim has a solid educational foundation with a BTech in Computer Science (3.90 CGPA) and a Diploma in Computer Science. Beyond formal education, he's a continuous learner who stays updated with the latest technologies in web development, AI/ML, and cloud computing. His academic background provides the theoretical foundation, while his 5+ years of professional experience gives him the practical skills to solve real-world problems effectively."
    ]
  },

  // Current work and recent projects
  current_work: {
    patterns: ['current work', 'recent work', 'latest project', 'working on', 'current project', 'now doing'],
    responses: [
      "Ibrahim's current and recent work highlights:\n\n🏢 **Current Role:** Software Engineer at TechVaults Limited (2019-Present)\n   • Leading full-stack development for healthcare, finance, and education clients\n   • Delivered solutions that increased client online transactions by 30%\n   • Managing complete project lifecycle from requirements to deployment\n\n🚀 **Recent Projects:**\n   • **National Nutrition Budget Tracking System** - Enterprise dashboard (Next.js, TypeScript)\n   • **AI Model Training Platform** - ML platform (React, Django, Docker)\n   • **Loan Defaulter Prediction System** - Credit risk assessment tool\n   • **SAHCO PLC Website** - Corporate website for aviation ground handling company",
      "Currently, Ibrahim is working as a Software Engineer at TechVaults Limited where he leads full-stack development projects. His recent work includes building the National Nutrition Budget Tracking System - a comprehensive enterprise dashboard for tracking nutrition financing in Nigeria using Next.js 16, TypeScript, and Tailwind CSS. He's also developed AI-powered platforms for machine learning model training and financial risk assessment. His work consistently focuses on building scalable, user-friendly applications that solve real business problems."
    ]
  }
};

// Smart FAQ response function with pattern matching
function getSmartResponse(question) {
  const questionLower = question.toLowerCase().trim();
  
  // Check each category for pattern matches
  for (const [category, data] of Object.entries(FAQ_RESPONSES)) {
    const matchedPattern = data.patterns.find(pattern => 
      questionLower.includes(pattern) || 
      questionLower.startsWith(pattern) ||
      questionLower === pattern
    );
    
    if (matchedPattern) {
      // Return random response from the category
      const responses = data.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Fallback for unmatched questions - more helpful and friendly
  const fallbackResponses = [
    "That's an interesting question! While I'm focused on Ibrahim's professional work, I'd love to help you learn about his development projects, technical skills, or career background. What aspect of his portfolio would you like to explore?",
    "I'm here to showcase Ibrahim's expertise as a full-stack developer! 🚀 I can tell you about his React/Python projects, AI work, or experience with global startups. What would you like to know more about?",
    "Great question! I specialize in discussing Ibrahim's professional work and technical expertise. Whether you're curious about his latest projects, development skills, or availability for work, I'm here to help! What interests you most?",
    "I'd love to help you learn about Ibrahim! 😊 I can share details about his full-stack development work, recent AI projects, or his experience building scalable applications. What would you like to discover about his portfolio?"
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      fromUser: false, 
      text: "Hi! 👋 I'm Ibrahim's AI assistant. I can help you learn about his projects, technical skills, experience, and availability for work. What would you like to know?" 
    },
    {
      fromUser: false,
      text: "💡 Try asking me things like:\n• \"What are Ibrahim's main skills?\"\n• \"Tell me about his latest projects\"\n• \"Is he available for hire?\"\n• \"What's his experience with React?\"\n\nOr just say hi! 😊"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  // Clear chat history on component mount (page refresh)
  useEffect(() => {
    // Reset to initial welcome messages on every page load/refresh
    setMessages([
      { 
        fromUser: false, 
        text: "Hi! 👋 I'm Ibrahim's AI assistant. I can help you learn about his projects, technical skills, experience, and availability for work. What would you like to know?" 
      },
      {
        fromUser: false,
        text: "💡 Try asking me things like:\n• \"What are Ibrahim's main skills?\"\n• \"Tell me about his latest projects\"\n• \"Is he available for hire?\"\n• \"What's his experience with React?\"\n\nOr just say hi! 😊"
      }
    ]);
    setRequestCount(0);
    setLastRequestTime(0);
    setInput("");
    setLoading(false);
    setOpen(false);
  }, []); // Empty dependency array means this runs once on mount (page refresh)

  // Clear chat function (can be used manually)
  const clearChat = () => {
    setMessages([
      { 
        fromUser: false, 
        text: "Hi! 👋 I'm Ibrahim's AI assistant. I can help you learn about his projects, technical skills, experience, and availability for work. What would you like to know?" 
      },
      {
        fromUser: false,
        text: "💡 Try asking me things like:\n• \"What are Ibrahim's main skills?\"\n• \"Tell me about his latest projects\"\n• \"Is he available for hire?\"\n• \"What's his experience with React?\"\n\nOr just say hi! 😊"
      }
    ]);
    setInput("");
    setLoading(false);
  };

  // Simple rate limiting: max 8 requests per minute
  const checkRateLimit = () => {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    
    // Reset counter if more than a minute has passed
    if (now - lastRequestTime > oneMinute) {
      setRequestCount(0);
      setLastRequestTime(now);
      return true;
    }
    
    // Check if under rate limit
    if (requestCount < 8) {
      setRequestCount(prev => prev + 1);
      setLastRequestTime(now);
      return true;
    }
    
    return false;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { fromUser: true, text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    
    try {
      // Check rate limit before making API call
      if (!checkRateLimit()) {
        throw new Error("Rate limit exceeded. Please wait a moment before asking another question.");
      }
      
      // Classify the question for better context
      const questionCategory = classifyQuestion(input);
      const contextualPrompt = getContextualPrompt(input, questionCategory);
      
      // Try Gemini API first
      if (GEMINI_API_KEY) {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: contextualPrompt }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 400,
              topP: 0.8,
              topK: 40
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ],
            systemInstruction: {
              parts: [{
                text: "Always use simple words that a 5th grader can understand. Use short sentences. Avoid big technical words. Be friendly and helpful. Explain things in an easy way."
              }]
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            setMessages(msgs => [...msgs, { fromUser: false, text: aiText }]);
            return;
          }
        } else {
          console.warn("Gemini API error:", response.status, response.statusText);
        }
      }
      
      // Fallback to FAQ if Gemini fails or no API key
      throw new Error("Gemini API unavailable");
      
    } catch (err) {
      console.warn("AI API failed, using smart FAQ fallback:", err.message);
      let fallbackResponse = getSmartResponse(userMsg.text);
      
      // Special message for rate limiting
      if (err.message.includes("Rate limit")) {
        fallbackResponse = "I'm getting a lot of questions right now! 😅 Please wait a moment before asking another question. In the meantime: " + fallbackResponse;
      }
      
      setMessages(msgs => [...msgs, { 
        fromUser: false, 
        text: fallbackResponse
      }]);
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
            <HeaderButtons>
              <HeaderButton 
                onClick={clearChat}
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                <FiRefreshCw size={16} />
              </HeaderButton>
              <HeaderButton 
                onClick={() => setOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <FiX size={18} />
              </HeaderButton>
            </HeaderButtons>
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
 