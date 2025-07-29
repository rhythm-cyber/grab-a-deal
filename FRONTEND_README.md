# Deal Aggregator Frontend

A beautiful React frontend for the Deal Aggregator platform, built with TypeScript, Tailwind CSS, and modern web technologies.

## Features

✅ **Beautiful UI** with platform-specific branding  
✅ **Razorpay Integration** for ₹0.89 micro-payments  
✅ **Responsive Design** optimized for all devices  
✅ **Real-time Deal Updates** from backend API  
✅ **Platform Filtering** by Flipkart, Amazon, JioMart, Myntra, Swiggy, BigBasket  
✅ **Affiliate Link Generation** after successful payment  
✅ **Modern React Architecture** with TypeScript  

## Backend Integration

The frontend expects your FastAPI backend to be running with these endpoints:

```
GET  /deals - Get all deals
GET  /{platform}-deals - Get platform-specific deals  
POST /create_order - Create Razorpay order
POST /verify_payment - Verify payment success
```

## Environment Setup

1. **Update Razorpay Keys** in `src/services/razorpay.ts`:
   ```typescript
   private static RAZORPAY_KEY = 'rzp_test_your_key_here';
   ```

2. **Update Backend URL** in `src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-backend.render.com';
   ```

## Development

```bash
npm install
npm run dev
```

## Deployment

### GitHub Pages + Cloudflare

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Set source to `dist` folder

3. **Add Cloudflare (Optional):**
   - Add your domain to Cloudflare
   - Point DNS to GitHub Pages
   - Enable Cloudflare optimizations

### Vercel/Netlify (Alternative)

The app is also ready for deployment on Vercel or Netlify:

- **Vercel:** Connect GitHub repository and deploy
- **Netlify:** Drag & drop `dist` folder or connect GitHub

## Platform Integration

### Affiliate Link Generation

The frontend automatically generates affiliate links based on your backend configuration:

- **Flipkart:** `https://dl.flipkart.com/dl{path}?affid=AFFILIATE_FLIPKART`
- **Amazon:** `https://www.amazon.in/dp/{ASIN}?tag=AFFILIATE_AMAZON`
- **JioMart:** `https://www.jiomart.com{path}?affid=AFFILIATE_JIOMART`
- **Myntra:** `https://myntra.go2cloud.org/aff_c?offer_id=6&aff_id=AFFILIATE_MYNTRA&url={URL}`
- **BigBasket:** `https://www.bigbasket.com{path}?affiliate=AFFILIATE_BIGBASKET`
- **Swiggy:** `https://cuelinks.com/redirect?url={URL}&aff_id=AFFILIATE_SWIGGY`

### Payment Flow

1. User clicks "Unlock for ₹0.89" button
2. Frontend calls `/create_order` endpoint
3. Razorpay checkout opens
4. After payment success, `/verify_payment` is called
5. Affiliate link opens in new tab

## Technical Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** for components
- **Razorpay** for payments
- **Lucide React** for icons
- **Vite** for build tooling

## File Structure

```
src/
├── components/
│   ├── ui/              # Shadcn components
│   ├── DealCard.tsx     # Individual deal card
│   ├── DealsGrid.tsx    # Grid layout for deals
│   ├── Header.tsx       # Page header
│   └── PlatformFilter.tsx # Platform filtering
├── services/
│   ├── api.ts           # Backend API calls
│   └── razorpay.ts      # Payment processing
├── types/
│   └── deal.ts          # TypeScript interfaces
└── pages/
    └── Index.tsx        # Main page
```

## Customization

### Colors & Branding

Update platform colors in `src/index.css`:

```css
:root {
  --flipkart: 47 100% 50%;
  --amazon: 27 100% 50%;
  /* Add your custom colors */
}
```

### Mock Data

For development without backend, mock deals are provided in `src/services/api.ts`. Update the `getMockDeals()` function to match your data structure.

## Production Checklist

- [ ] Update Razorpay keys
- [ ] Set correct backend URL
- [ ] Test payment flow
- [ ] Verify affiliate link generation
- [ ] Test on mobile devices
- [ ] Configure CORS on backend
- [ ] Set up error tracking (optional)

## Support

For backend integration help, refer to your FastAPI backend documentation or check the API service file for expected response formats.