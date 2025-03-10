import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HistoricalAnalysis() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/historical-analysis');
      setAnalysisData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch historical data');
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Rate Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Rate ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Historical Analysis</h2>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Total Lanes</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {analysisData?.total_lanes || 0}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Average Rate</h3>
            <p className="text-3xl font-bold text-indigo-600">
              ${analysisData?.average_rate?.toFixed(2) || '0.00'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Data Quality</h3>
            <p className="text-3xl font-bold text-green-600">98%</p>
          </div>
        </div>

        {/* Rate Trends Chart */}
        <div className="h-96">
          {analysisData?.monthly_trends && (
            <Line
              options={chartOptions}
              data={{
                labels: Object.keys(analysisData.monthly_trends),
                datasets: [
                  {
                    label: 'Average Rate',
                    data: Object.values(analysisData.monthly_trends),
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.5)',
                    tension: 0.3,
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
} 