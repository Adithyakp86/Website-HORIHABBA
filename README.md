# 🌾 HoriHabba Bull Tracking & Management System

A modern React-based web application for tracking and managing bull passes during the HoriHabba festival.

## 🎯 Features

- **Add Bull Details**: Register bulls with their information before the festival
- **Live Counting**: Real-time tracking of bull passes with auto-display of bull details
- **Results & Rankings**: View sorted results with winner highlighting
- **Export Functionality**: Download results as CSV
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Village-themed design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
horihabba/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── AddBull.js
│   │   ├── AddBull.css
│   │   ├── LiveCounting.js
│   │   ├── LiveCounting.css
│   │   ├── Results.js
│   │   └── Results.css
│   ├── utils/
│   │   └── dataManager.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Pages

1. **Home**: Dashboard with quick stats and navigation
2. **Add Bull Details**: Form to register new bulls
3. **Live Counting**: Main counting interface with auto-display
4. **Results**: Rankings and winner display with export options

## 💾 Data Storage

Currently uses browser localStorage. Can be easily upgraded to Firebase or any backend service by modifying `src/utils/dataManager.js`.

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner

## 📱 Features in Detail

### Auto-Display
When a bull number is entered, the system automatically displays:
- Bull name
- Owner name
- Village/Area
- Current pass count

### Real-time Updates
- Live count table updates automatically
- Pass counts are saved instantly
- Statistics update in real-time

### Export Options
- CSV export for results
- Print-friendly layout

## 🎨 Design

- Village-themed color scheme (amber, orange, green)
- Large, easy-to-read buttons
- Smooth animations and transitions
- Mobile-responsive layout

## 🔮 Future Enhancements

- QR code scanning
- RFID integration
- LED display board connection
- Multi-language support (Kannada)
- Admin authentication
- Cloud sync

## 📝 License

© 2026 HoriHabba Festival Committee. All rights reserved.
