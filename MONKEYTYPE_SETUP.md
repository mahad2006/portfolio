# MonkeyType API Integration Setup

## Overview
The `/stats` page displays real-time typing performance metrics fetched from your MonkeyType account using their official API.

## Features
- **Input Velocity**: Your 60-second Personal Best WPM
- **Mechanical Precision**: Average accuracy percentage
- **System Uptime**: Total hours spent typing
- **Tests Executed**: Total number of tests completed
- **Global Percentile**: Your ranking (Top 0.01%, 0.1%, 1%, etc.)
- **Challenge Button**: Direct link to your MonkeyType profile

## Setup Instructions

### 1. Get Your MonkeyType API Key (ApeKey)
1. Visit [MonkeyType Settings](https://monkeytype.com/settings)
2. Navigate to the **Account** section
3. Scroll down to find **"Generate Ape Key"** or **"API Key"**
4. Click to generate a new key
5. Copy the generated key

### 2. Configure Environment Variables
1. Create a file named `.env.local` in the Portfolio root directory (if it doesn't exist)
2. Add your API key:
```env
MONKEYTYPE_API_KEY=your_actual_ape_key_here
```
3. Save the file

### 3. Restart Your Dev Server
```bash
npm run dev
```

### 4. Test the Integration
- Navigate to `http://localhost:3000/stats`
- You should see your live typing statistics
- If the API key is not configured, fallback data (192 WPM) will be displayed with a warning

## How It Works

### Server-Side Rendering
- Stats are fetched using Next.js Server Components
- API key is kept secure on the server (never exposed to the client)

### Caching Strategy
- ISR (Incremental Static Regeneration) with 1-hour revalidation
- Reduces API calls and improves performance

### API Endpoints Used
1. **Personal Bests**: `GET /users/personalBests?mode=time&mode2=60`
2. **User Stats**: `GET /users/stats`

### Authentication
```javascript
headers: {
  'Authorization': `ApeKey ${YOUR_API_KEY}`,
  'Accept': 'application/json'
}
```

## Elite Performance Badge
If your WPM ≥ 120, the page will automatically display:
- Green glowing border on the velocity card
- "Elite Performance Detected" badge
- Top percentile ranking

## Troubleshooting

### Issue: "API Key not configured" warning
**Solution**: Ensure `.env.local` exists with the correct variable name `MONKEYTYPE_API_KEY`

### Issue: Stats showing fallback data (192 WPM)
**Possible causes**:
1. API key not set or incorrect
2. Network connection issues
3. MonkeyType API is down

**Solution**: Check browser console or server logs for error messages

### Issue: Stats not updating
**Solution**: The cache revalidates every hour. To force refresh:
```bash
# Delete Next.js cache
rm -rf .next
npm run dev
```

## Profile URL Configuration
Update your MonkeyType profile username in `/app/stats/page.js`:
```javascript
href="https://monkeytype.com/profile/YOUR_USERNAME"
```

Currently set to: `CodeWithMahad1`

## Security Note
- Never commit `.env.local` to version control
- `.env.local` is already in `.gitignore`
- Use `.env.example` to document required variables

## Documentation
- [MonkeyType API Docs](https://monkeytype.com/api)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
