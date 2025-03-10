import { useState } from 'react';
import Head from 'next/head';
import FileUpload from '../components/FileUpload';
import HistoricalAnalysis from '../components/HistoricalAnalysis';
import Forecasting from '../components/Forecasting';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState({
    bid: null,
    historical: null,
    market: null,
  });

  const tabs = [
    { id: 'upload', name: 'Upload Files' },
    { id: 'historical', name: 'Historical Analysis' },
    { id: 'forecasting', name: 'Forecasting' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Freight Forecasting Platform</title>
        <meta name="description" content="Advanced freight forecasting for RFPs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Freight Forecast</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === 'upload' && (
            <FileUpload
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          )}
          {activeTab === 'historical' && (
            <HistoricalAnalysis />
          )}
          {activeTab === 'forecasting' && (
            <Forecasting />
          )}
        </div>
      </main>
    </div>
  );
} 