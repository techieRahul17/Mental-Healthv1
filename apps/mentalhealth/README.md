# TakeUrTime - Mental Health App

A mental health mobile application built with Expo React Native, designed to provide accessible and stigma-free mental wellness support.

## Demo

**Live Demo:** [https://drive.google.com/file/d/1hLe8mTxwXeL5ol7oFsgZfb-fDr_rrpKd/view?usp=sharing]

**Video Walkthrough:** [https://drive.google.com/file/d/1hLe8mTxwXeL5ol7oFsgZfb-fDr_rrpKd/view?usp=sharing]

## Features

- **Home Dashboard** - Welcome screen with quick access to key features
- **AI Chat Interface** - Conversational support with Gemini API integration (backend pending)
- **Mood Tracker** - Daily mood logging with visual feedback and history
- **Appointment Management** - Book, reschedule, and manage therapy appointments
- **Gratitude Journal** - Daily journaling with calendar view and affirmations
- **Breathing Exercises** - Guided breathing techniques with animated visualizations
- **Theme Support** - Light and dark mode toggle

## Tech Stack

- **Framework:** Expo React Native
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based routing)
- **Styling:** React Native StyleSheet with custom design system
- **Fonts:** Google Fonts (Outfit family)
- **Storage:** AsyncStorage for local data persistence
- **State Management:** React Context API
- **Animations:** React Native Animated API

## Project Structure

```
app/
├── (tabs)/                 # Tab-based screens
│   ├── index.tsx           # Home screen
│   ├── chat.tsx            # Chat interface
│   ├── mood.tsx            # Mood tracker
│   ├── appointments.tsx    # Appointment management
│   ├── journal.tsx         # Gratitude journal
│   └── _layout.tsx         # Tab navigation layout
├── breathing/              # Breathing exercises
│   ├── index.tsx           # Exercise selection
│   └── calm-breathing.tsx  # Calm breathing exercise
├── _layout.tsx             # Root layout with font loading
└── modal.tsx               # Modal screens

components/
├── ui/                     # Reusable UI components
│   ├── button.tsx          # Custom button component
│   ├── mood-option.tsx     # Mood selection bubbles
│   ├── appointment-card.tsx # Appointment display cards
│   ├── week-selector.tsx   # Calendar week selector
│   ├── animated-circle.tsx # Breathing animation
│   └── theme-toggle.tsx    # Light/dark mode toggle
└── themed-*.tsx            # Theme-aware components

constants/
└── theme.ts                # Color palette and typography system

contexts/
└── theme-context.tsx       # Theme state management

hooks/
└── use-*.ts                # Custom React hooks
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url] with branch
   cd mentalhealth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

### Development Setup

1. **Font Loading**
   - Outfit fonts are automatically loaded via @expo-google-fonts/outfit
   - Fallback to system fonts if loading fails

2. **Theme Configuration**
   - Light/dark themes defined in `constants/theme.ts`
   - Toggle available in top-right of each screen

3. **Data Storage**
   - Mood entries stored in AsyncStorage with date keys
   - Journal entries persisted locally
   - No backend required for basic functionality

## Design System

### Colors
- **Background:** Light mint green (#E8F4F0)
- **Primary:** Dark green (#2D5A3D)
- **Secondary:** Medium green (#4A7C59)
- **Cards:** White (#FFFFFF)

### Typography
- **Headings:** Outfit Bold (700)
- **Subheadings:** Outfit SemiBold (600)
- **Body Text:** Outfit Regular (400)
- **Medium Text:** Outfit Medium (500)

### Components
- **Buttons:** Highly rounded corners (30px radius)
- **Cards:** Rounded corners (20px) with subtle shadows
- **Mood Bubbles:** Floating circular design with animations
- **Calendar:** Minimalist week selector with dot indicators

## Future Enhancements

### Backend Integration
- **Database:** MongoDB for user data and appointments
- **Authentication:** User registration and login system
- **AI Chat:** Gemini API integration with LangChain
- **Appointments:** Real healthcare provider booking system
- **Sync:** Cross-device data synchronization

### Additional Features
- Push notifications for reminders
- Progress tracking and analytics
- Community features and support groups
- Integration with wearable devices
- Offline mode improvements

