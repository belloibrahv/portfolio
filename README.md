# Bello Sheu Ibrahim Portfolio

Personal portfolio for Bello Sheu Ibrahim with resume-driven content, selected work, and a resume-aware chatbot.

## Run locally

```bash
npm install
npm start
```

## AI chat setup

Set these environment variables if you want the chat assistant to use live model responses:

- `REACT_APP_AI_PROVIDER=groq`
- `REACT_APP_GROQ_API_KEY=...`
- `REACT_APP_GROQ_MODEL=llama-3.3-70b-versatile`
- `REACT_APP_GEMINI_API_KEY=...`
- `REACT_APP_GEMINI_MODEL=gemini-2.0-flash-exp`

If the live providers are unavailable, the assistant falls back to local resume-aware responses.
