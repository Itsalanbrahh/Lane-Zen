import { useState, useCallback } from 'react';
import axios from 'axios';

export default function FileUpload({ uploadedFiles, setUploadedFiles }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    await handleFileUpload(file);
  }, []);

  const handleFileUpload = async (file) => {
    const fileType = determineFileType(file.name);
    if (!fileType) {
      alert('Invalid file type');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/upload/${fileType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 'success') {
        setUploadedFiles(prev => ({
          ...prev,
          [fileType]: file.name
        }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading file');
    }
  };

  const determineFileType = (filename) => {
    // Simple logic to determine file type - can be enhanced based on actual file formats
    if (filename.includes('bid')) return 'bid';
    if (filename.includes('historical')) return 'historical';
    if (filename.includes('market')) return 'market';
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload Files</h2>
        
        {/* File Upload Areas */}
        {['bid', 'historical', 'market'].map((type) => (
          <div
            key={type}
            className={`
              mt-4 p-6 border-2 border-dashed rounded-lg
              ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              ${uploadedFiles[type] ? 'bg-green-50 border-green-500' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 capitalize mb-2">
                {type} File
              </h3>
              
              {uploadedFiles[type] ? (
                <div className="text-green-600">
                  ✓ Uploaded: {uploadedFiles[type]}
                </div>
              ) : (
                <>
                  <p className="text-gray-500">
                    Drag and drop your {type} file here, or
                    <label className="ml-1 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files[0])}
                        accept=".csv,.xlsx"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: CSV, Excel
                  </p>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Upload Status */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Status</h3>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <ul className="divide-y divide-gray-200">
              {Object.entries(uploadedFiles).map(([type, filename]) => (
                <li key={type} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{type}:</span>
                    <span className={filename ? 'text-green-600' : 'text-gray-400'}>
                      {filename || 'Not uploaded'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 