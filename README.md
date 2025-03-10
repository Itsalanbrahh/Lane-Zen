# Lane Zen

Lane Zen is a modern web application designed for freight brokers to analyze historical lane data and forecast future rates using advanced machine learning models.

## Features

- **File Upload System**: Easily upload bid files, historical lane data, and market data.
- **Historical Analysis**: Visualize expenditure trends and lane performance with interactive charts.
- **Advanced Forecasting**: Predict future rates using:
  - SARIMAX (Statistical modeling)
  - XGBoost (Gradient boosting)
  - Neural Prophet (Deep learning)
- **Interactive Visualizations**: Modern, responsive charts and graphs for data insights.
- **Lane-specific Analysis**: Detailed metrics and forecasts for individual lanes.

## Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start both servers using the development script:
   ```bash
   chmod +x run_dev.sh
   ./run_dev.sh
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## File Format Requirements

### Bid File
- CSV format
- Required columns: lane_id, origin, destination, volume, target_rate

### Historical Data
- CSV format
- Required columns: lane_id, date, rate, volume

### Market Data
- CSV format
- Required columns: date, region, market_index, fuel_price

## Development

### Project Structure
```
freight-forecast-app/
├── frontend/          # React/Next.js frontend
├── backend/           # FastAPI backend
├── data/             # Data storage
└── run_dev.sh        # Development server script
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License