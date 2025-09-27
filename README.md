# EIICHI VISION (ビジョン・エイイチ)

> Build Your Future. Honor The Past.

A sophisticated real estate development platform that continues the legacy of Shibusawa Eiichi, connecting global citizens with Japan's heritage homes (akiya) in Gunma prefecture.

## 🏛️ Project Overview

EIICHI VISION is a modern web application built with Next.js, TypeScript, and Tailwind CSS, designed to showcase Japanese heritage properties and facilitate investment opportunities. The platform embodies the philosophy of "Rongo to Soroban" (論語と算盤) - The Analects and the Abacus, combining ethical principles with business efficiency.

## ✨ Features

### 🏠 Core Functionality
- **Property Portfolio**: Browse and filter heritage homes with detailed information
- **Investment Calculator**: Estimate renovation costs and ROI
- **Cultural Education**: Learn about Japanese architecture and traditions
- **Process Guidance**: Step-by-step journey from discovery to ownership

### 🎨 Design Philosophy
- **Japanese Minimalism**: Clean, spacious design following "Ma" (間) principles
- **Natural Materials**: Wood, stone, and indigo color palette
- **Cinematic Photography**: High-quality visuals showcasing lifestyle
- **Responsive Design**: Optimized for all devices

### 📱 Technical Features
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Performance Optimized**: SEO-friendly with Core Web Vitals optimization
- **Accessibility**: WCAG compliant design
- **Real-time Interactivity**: Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eiichi-vision
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Or use the provided batch file:
   ```bash
   start-dev.bat
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
eiichi-vision/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About Us page
│   │   ├── projects/          # Property portfolio
│   │   ├── process/           # The Path (道) process
│   │   ├── journal/           # Blog/journal
│   │   ├── contact/           # Contact page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   └── components/             # Reusable components
│       ├── Layout.tsx          # Main layout wrapper
│       ├── Navigation.tsx      # Navigation component
│       ├── Footer.tsx         # Footer component
│       ├── HeroSection.tsx    # Homepage hero
│       ├── LegacySection.tsx  # Shibusawa Eiichi section
│       ├── FeaturedProjects.tsx # Property showcase
│       ├── DestinationSection.tsx # Gunma destination
│       └── PhilosophySection.tsx # Philosophy in action
├── public/                     # Static assets
├── start-dev.bat              # Development startup script
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Indigo Blue (#1a365d)
- **Secondary**: Medium Gray (#4a5568)  
- **Accent**: Natural Wood (#d69e2e)
- **Background**: White Bone (#fefefe)
- **Muted**: Light Gray (#f7fafc)

### Typography
- **Sans**: Inter (body text)
- **Serif**: Playfair Display (headings)
- **Mono**: Geist Mono (code/accents)

### Components
- **Navigation**: Fixed header with smooth scrolling
- **Cards**: Elevated with hover effects
- **Forms**: Clean, accessible inputs
- **Buttons**: Rounded with smooth transitions

## 📄 Pages

### 🏠 Homepage
- Hero section with immersive video background
- Legacy section showcasing Shibusawa Eiichi
- Featured properties grid
- Gunma destination highlights
- Philosophy in action (Analectas & Abacus)

### 📖 About Us
- Three-part story: The Visionary, New Generation, Our Promise
- Historical context and family connection
- Values translation to modern service

### 🏘️ Projects
- Interactive property portfolio
- Advanced filtering and search
- Detailed property information
- Investment calculations

### 🛤️ The Path (道)
- Step-by-step process visualization
- Timeline with duration estimates
- Support system overview
- Call-to-action for consultation

### 📚 Journal
- Categorized blog content
- Featured articles
- Search and filter functionality
- Newsletter subscription

### 📞 Contact
- Multiple contact methods
- Discovery call scheduling
- Comprehensive contact form
- Office hours and response times

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Maps**: Google Maps JavaScript API
- **Images**: High-quality stock photography from Unsplash

## 🌟 Key Features

### 🎯 Target Audience
- Millennials and Digital Nomads
- North and South American investors
- Culture enthusiasts seeking authentic experiences
- Long-term lifestyle investors

### 💡 Value Proposition
- **Transparency**: Complete process visibility
- **Cultural Respect**: Preservation-focused approach
- **Community Benefit**: Local artisan support
- **Investment Potential**: Measurable returns

### 🏛️ Brand Philosophy
- **The Analects (論語)**: Ethical foundation and cultural respect
- **The Abacus (算盤)**: Business efficiency and measurable value
- **Gapponshugi**: Combination of ethics and economics

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interactions

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Create a `.env.local` file for production:
```env
NEXT_PUBLIC_SITE_URL=https://www.eiichivision.com
```

## 📞 Support

For questions or support:
- **Email**: info@eiichivision.com
- **Phone**: +81 90-1234-5678
- **Location**: Kusatsu, Gunma, Japan

## 📄 License

This project is proprietary to EIICHI VISION. All rights reserved.

---

*Inspired by the legacy of Shibusawa Eiichi (渋沢栄一) - The Architect of Modern Japan*
