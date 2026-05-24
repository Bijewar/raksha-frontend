# Raksha AI - Premium Outbreak Forecasting Dashboard

A sophisticated AI-powered healthcare outbreak forecasting and risk prediction platform built with Next.js, featuring a premium glassmorphic design system with animated gradients and interactive visualizations.

## 🎯 Project Overview

Raksha AI provides real-time disease outbreak risk assessment and prediction capabilities using machine learning models trained on environmental factors, case history, and demographic data. The platform enables healthcare officials to make data-driven decisions and implement preventive measures effectively.

## ✨ Key Features

### 🎨 Premium Design System
- **Glassmorphism Components**: Frosted glass effects with backdrop blur
- **Animated Gradients**: Dynamic gradient shifts in backgrounds and UI elements
- **AI Glow Effects**: Pulsing cyan/blue neon glows on interactive elements
- **Smooth Animations**: 300ms transitions with easing functions
- **Dark Mode**: Premium dark theme by default with custom color palette

### 📊 Core Pages

1. **Dashboard** - Overview with animated stat cards and chart previews
2. **Prediction** - 18-parameter form for outbreak risk assessment
3. **Analytics** - Comprehensive charts and trend visualizations
4. **Heatmap** - Interactive district risk visualization
5. **Alerts** - Real-time alert notifications with recommendations

### 🔧 Technical Architecture

#### Component Structure
```
components/
├── base/                    # Reusable base components
│   ├── GlassPanel.jsx      # Glassmorphic container
│   ├── AIGlowCard.jsx      # AI-themed glow card
│   ├── AnimatedGradientBg.jsx  # Animated background
│   └── PremiumSkeleton.jsx  # Loading skeleton
├── layout/                  # Layout components
│   ├── Sidebar.jsx         # Navigation sidebar
│   └── Navbar.jsx          # Top navigation bar
├── dashboard/              # Dashboard components
│   ├── HeroSection.jsx     # Hero section
│   ├── StatCard.jsx        # Stat metric card
│   ├── StatCardsGrid.jsx   # Grid of stats
│   └── ChartPreview.jsx    # Chart preview
├── prediction/             # Prediction page
│   ├── PredictionForm.jsx  # Form with 18 inputs
│   └── RiskResultCard.jsx  # Result display
├── analytics/              # Analytics page
│   └── AnalyticsCharts.jsx # Multiple charts
├── heatmap/               # Heatmap page
│   └── IndiaHeatmap.jsx   # District heat map
└── alerts/                # Alerts page
    └── AlertsList.jsx     # Alert notifications
```

#### Styling System

**Color Palette:**
- Primary Blue: `#0066ff`
- Accent Cyan: `#00d9ff`
- Risk Colors: Green (LOW), Yellow (MEDIUM), Red (HIGH)
- Background: Black (`#0f0f0f`)
- Glass Effects: White with opacity (5-10%)

**Typography:**
- Headings: Bold Geist Sans (48-56px)
- Body: Regular Geist Sans (14-16px)
- Letter spacing for premium feel

**Spacing Scale:**
- Cards: 32px+ gaps
- Padding: 32-40px minimum
- Section spacing: 80-120px

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file (if needed for API calls):
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## 🎨 Design System Components

### GlassPanel
Premium glassmorphic container with variants:
- `default`: Base glass effect
- `ai`: AI-themed with cyan accents
- `dark`: Subtle dark glass
- `elevated`: Enhanced glass with more blur

### AnimatedGradientBg
Background with animated gradients and floating particles:
- `hero`: Large gradients with 3 floating elements
- `section`: Medium gradients
- `subtle`: Minimal gradient effect

### Animations

Custom CSS animations:
- `gradientShift`: 10s color shift animation
- `pulseGlow`: 4s pulse glow effect
- `floatParticle`: 20s floating movement
- `slideUpFadeIn`: 400ms entry animation
- `glowBorder`: Border glow animation

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Mobile** (`<768px`): Single column, hamburger menu
- **Tablet** (`768-1024px`): Two columns, adjusted spacing
- **Desktop** (`>1024px`): Full layout, visible sidebar

Sidebar collapses to hamburger on mobile while maintaining premium feel.

## 🔌 API Integration

### Prediction API

The prediction form can integrate with an endpoint at `http://127.0.0.1:8000/predict`:

```javascript
// Form sends 18 parameters:
{
  district: string,
  cases_lag1: number,
  cases_lag2: number,
  cases_lag3: number,
  rainfall: number,
  humidity: number,
  temperature: number,
  aqi: number,
  population: number,
  population_density: number,
  vaccination_rate: number,
  sanitation: number,
  healthcare_capacity: number,
  doctor_patient_ratio: number,
  vector_control: number,
  water_quality: number
}

// Returns:
{
  probability: number (0-100),
  risk_level: string ("LOW" | "MEDIUM" | "HIGH"),
  district: string,
  recommendation: string
}
```

## 🎬 Performance Optimizations

- Server-side rendering with Next.js 16
- Responsive images and lazy loading
- Optimized animation keyframes
- Minimal CSS with Tailwind
- Component-level code splitting

## 📚 Technologies Used

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom animations
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🛠 Customization

### Changing Colors

Update CSS variables in `app/globals.css`:
```css
:root {
  --ai-blue: #0066ff;
  --ai-cyan: #00d9ff;
  /* ... */
}
```

### Adding New Pages

1. Create page file: `app/[page]/page.jsx`
2. Add sidebar link in `components/layout/Sidebar.jsx`
3. Create page components in `components/[page]/`

### Modifying Animations

All animations are in `app/globals.css` under `@keyframes`. Adjust duration and easing as needed.

## 📄 License

This project is created with v0.

## 🤝 Contributing

Feel free to fork, modify, and use for your projects.

---

**Built with ❤️ for healthcare innovation**
