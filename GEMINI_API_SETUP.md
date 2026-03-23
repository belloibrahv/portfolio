# Google Gemini API Setup Guide

## Getting Your Free Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select "Create API key in new project" (recommended)
   - Copy the generated API key

3. **Set Up Environment Variable**
   - Create a `.env` file in your project root (if it doesn't exist)
   - Add your API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Secure Your API Key**
   - Make sure `.env` is in your `.gitignore` file
   - Never commit your API key to version control
   - For production, set the environment variable in your hosting platform

## Free Tier Limits (2026)

- **Gemini 2.0 Flash**: 10 requests/minute, 250 requests/day
- **No credit card required**
- **1 million token context window**
- **Multimodal capabilities** (text, images, code)

## Testing Your Setup

1. Start your development server: `npm start`
2. Open the chatbot and ask: "What are Ibrahim's main skills?"
3. You should get an AI-powered response about your portfolio

## Troubleshooting

### API Key Issues
- Ensure the key starts with `AIza`
- Check that you've enabled the Generative AI API in Google Cloud Console
- Verify the environment variable name: `REACT_APP_GEMINI_API_KEY`

### Rate Limiting
- Free tier: 10 requests/minute, 250/day
- If you hit limits, the chatbot will fall back to FAQ responses
- Consider implementing request queuing for high traffic

### CORS Issues
- Gemini API supports direct browser requests
- No proxy server needed for client-side integration

## Production Deployment

### Vercel
```bash
vercel env add REACT_APP_GEMINI_API_KEY
```

### Netlify
Add environment variable in Site Settings > Environment Variables

### Other Platforms
Set `REACT_APP_GEMINI_API_KEY` in your platform's environment configuration

## Security Best Practices

1. **API Key Rotation**: Regularly rotate your API keys
2. **Domain Restrictions**: Consider restricting API key usage to your domain
3. **Rate Limiting**: Implement client-side rate limiting
4. **Error Handling**: Never expose API keys in error messages

## Monitoring Usage

- Visit [Google Cloud Console](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas)
- Monitor your API usage and quotas
- Set up alerts for approaching limits

Your chatbot is now powered by Google's advanced Gemini AI with comprehensive knowledge about your portfolio!