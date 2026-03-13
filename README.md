# EV Charging Analytics Platform

A real-time EV charging analytics dashboard built with React, featuring live utilization metrics, peak demand analysis, and predictive insights.

## Features

- **Real-time Metrics Dashboard** - Monitor active chargers, current load, and revenue
- **Utilization Analytics** - Track charging patterns and peak demand hours
- **Live Charger Status** - View real-time status of all charging stations
- **Predictive Analytics** - Get insights and forecasts for grid optimization
- **Interactive Charts** - Visualize data with line, bar, and area charts
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, Recharts, Lucide Icons, Tailwind CSS
- **Backend**: Python (Flask/FastAPI ready)
- **API Integration**: Tesla Fleet API compatible

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ev-charging-analytics.git
cd ev-charging-analytics

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm eject` - Eject from create-react-app

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── EVChargingPlatform.js    # Main component
│   ├── App.js                    # App wrapper
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── package.json
└── README.md
```

## Dashboard Features

### Dashboard Tab
- Key performance metrics (active chargers, current load, revenue)
- Utilization trends over time
- Power consumption analysis
- Revenue tracking

### Utilization Tab
- Peak demand analysis by hour
- Utilization distribution by time period
- Key insights and recommendations

### Chargers Tab
- Live status of all charging stations
- Power output and vehicle information
- State of charge (SOC) levels
- Estimated time remaining

### Analytics Tab
- API integration status
- Predictive analytics for next 24 hours
- Grid optimization opportunities
- Data collection metrics

## Future Enhancements

- Backend API integration with real Tesla Fleet data
- User authentication and multi-tenant support
- Advanced machine learning predictions
- Mobile app version
- Billing and revenue management system

