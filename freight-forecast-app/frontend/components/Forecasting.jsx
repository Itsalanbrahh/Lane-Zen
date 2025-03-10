import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export default function Forecasting() {
  const [selectedLane, setSelectedLane] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecast = async (laneId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/forecast/${laneId}`);
      setForecastData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forecast data');
      setForecastData(null);
    }
    setLoading(false);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rate Forecasts by Model',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Predicted Rate ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  const handleLaneSelect = (e) => {
    const laneId = e.target.value;
    setSelectedLane(laneId);
    if (laneId) {
      fetchForecast(laneId);
    }
  };

  const getChartData = () => {
    if (!forecastData) return null;

    const models = ['sarimax', 'xgboost', 'neural_prophet'];
    const colors = {
      sarimax: 'rgb(99, 102, 241)', // Indigo
      xgboost: 'rgb(34, 197, 94)', // Green
      neural_prophet: 'rgb(249, 115, 22)', // Orange
    };

    return {
      labels: forecastData.sarimax.dates,
      datasets: models.map(model => ({
        label: model.toUpperCase(),
        data: forecastData[model].values,
        borderColor: colors[model],
        backgroundColor: colors[model].replace('rgb', 'rgba').replace(')', ', 0.5)'),
        tension: 0.3,
      })),
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rate Forecasting</h2>

        {/* Lane Selection */}
        <div className="mb-6">
          <label htmlFor="lane" className="block text-sm font-medium text-gray-700">
            Select Lane
          </label>
          <select
            id="lane"
            value={selectedLane}
            onChange={handleLaneSelect}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a lane...</option>
            <option value="LAX-NYC">Los Angeles to New York</option>
            <option value="CHI-MIA">Chicago to Miami</option>
            <option value="SEA-DAL">Seattle to Dallas</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 p-4">
            {error}
          </div>
        )}

        {/* Forecast Results */}
        {forecastData && !loading && (
          <div className="space-y-6">
            {/* Model Comparison Chart */}
            <div className="h-96">
              <Line options={chartOptions} data={getChartData()} />
            </div>

            {/* Model Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['SARIMAX', 'XGBoost', 'Neural Prophet'].map((model) => (
                <div key={model} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">{model}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">MAPE:</span>
                      <span className="font-medium">2.34%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">RMSE:</span>
                      <span className="font-medium">$45.67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">R²:</span>
                      <span className="font-medium">0.89</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 