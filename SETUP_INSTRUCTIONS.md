# KalKut Portfolio - Setup Instructions

## ✅ Completed Features

1. ✓ Contact Form (EmailJS integration)
2. ✓ SEO Optimization (Meta tags, Open Graph)
3. ✓ Google Analytics (GA4)
4. ✓ Scroll-based Animations
5. ✓ Blog Section

## 🔧 Configuration Required

### 1. EmailJS Setup (Contact Form)

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
4. Get your credentials:
   - Service ID
   - Template ID
   - Public Key
5. Update in `src/KalKutMinimalPortfolio.jsx` (line ~230):
   ```javascript
   emailjs.send(
     'YOUR_SERVICE_ID',  // Replace this
     'YOUR_TEMPLATE_ID', // Replace this
     {...},
     'YOUR_PUBLIC_KEY'   // Replace this
   )
   ```

### 2. Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Update in `src/KalKutMinimalPortfolio.jsx` (line ~20):
   ```javascript
   ReactGA.initialize('G-XXXXXXXXXX'); // Replace with your ID
   ```

### 3. GitHub Pages Branch

Make sure in your GitHub repository settings:
- Go to Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` (not master)
- Folder: `/ (root)`

## 📝 Content Updates

### Update Projects
Edit the `projects` array in `src/KalKutMinimalPortfolio.jsx` (line ~50)

### Update Blog Posts
Edit the `blogPosts` array in `src/KalKutMinimalPortfolio.jsx` (line ~220)

### Update Testimonials
Edit the `testimonials` array in `src/KalKutMinimalPortfolio.jsx` (line ~195)

### Update Skills
Edit the `skills` array in `src/KalKutMinimalPortfolio.jsx` (line ~140)

## 🚀 Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy

# Local development
npm start
```

## 📱 Mobile Optimized
- Fully responsive design
- Touch-friendly buttons
- Optimized font sizes
- Clean animations

## 🎨 Features
- ✓ Smooth scroll animations
- ✓ Loading screen
- ✓ Cursor glow effect (desktop)
- ✓ Project filtering
- ✓ Stats counter animation
- ✓ FAQ accordion
- ✓ Contact form with validation
- ✓ Blog section with cards
- ✓ SEO optimized
- ✓ Google Analytics ready

## 📧 Contact
- Email: contactkalkut@gmail.com
- Phone: +91 9509058933
- WhatsApp: +91 7340591251

---
Made with ❤️ by KalKut
