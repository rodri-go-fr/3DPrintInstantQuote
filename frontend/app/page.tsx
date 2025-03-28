'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FileUpload from './components/FileUpload';
import ModelViewer from './components/ModelViewer';
import MaterialColorSelector from './components/MaterialColorSelector';
import QuoteDisplay from './components/QuoteDisplay';
import Button from './components/ui/Button';
import { uploadModel, getJobStatus, getMaterials } from './utils/api';
import { Material, Color, Job, PrintOptions, MaterialsData } from './types';

export default function Home() {
  // State for file upload
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  // State for materials and options
  const [materialsData, setMaterialsData] = useState<MaterialsData | null>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('pla');
  const [selectedColorId, setSelectedColorId] = useState<string>('white');
  const [fillDensity, setFillDensity] = useState<number>(0.15);
  const [enableSupports, setEnableSupports] = useState<boolean>(true);
  
  // State for job processing
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [jobResult, setJobResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Selected material and color objects
  const selectedMaterial = materialsData?.materials.find(m => m.id === selectedMaterialId);
  const selectedColor = selectedMaterial?.colors.find(c => c.id === selectedColorId);

  // Load materials on component mount
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await getMaterials();
        setMaterialsData(data);
        
        // Set default selections
        if (data.materials.length > 0) {
          setSelectedMaterialId(data.materials[0].id);
          if (data.materials[0].colors.length > 0) {
            setSelectedColorId(data.materials[0].colors[0].id);
          }
        }
      } catch (err) {
        console.error('Error loading materials:', err);
        setError('Failed to load materials. Please try again later.');
      }
    };
    
    loadMaterials();
  }, []);

  // Create object URL for the uploaded file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Clean up URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  // Poll for job status updates
  useEffect(() => {
    if (!jobId || jobStatus === 'completed' || jobStatus === 'failed') {
      return;
    }
    
    const pollInterval = setInterval(async () => {
      try {
        const jobData = await getJobStatus(jobId);
        setJobStatus(jobData.status);
        
        if (jobData.status === 'completed') {
          setJobResult(jobData.result);
          clearInterval(pollInterval);
        } else if (jobData.status === 'failed') {
          setError(jobData.error || 'Processing failed. Please try again.');
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('Error polling job status:', err);
        setError('Failed to get job status. Please try again.');
        clearInterval(pollInterval);
      }
    }, 2000);
    
    return () => clearInterval(pollInterval);
  }, [jobId, jobStatus]);

  // Handle file selection
  const handleFileSelected = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setJobId(null);
    setJobStatus(null);
    setJobResult(null);
    setError(null);
    setSuccessMessage(null);
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a 3D model file first.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const options: PrintOptions = {
        material_id: selectedMaterialId,
        color_id: selectedColorId,
        fill_density: fillDensity,
        enable_supports: enableSupports,
      };
      
      const response = await uploadModel(file, options);
      
      setJobId(response.job_id);
      setJobStatus(response.status);
      setIsSubmitting(false);
    } catch (err: any) {
      console.error('Error uploading model:', err);
      setError(err.response?.data?.error || 'Failed to upload model. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Handle print request submission
  const handlePrintRequest = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real app, you would call an API to submit the print request
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Your print request has been submitted successfully! Our team will review it shortly.');
      setIsSubmitting(false);
    } catch (err) {
      console.error('Error submitting print request:', err);
      setError('Failed to submit print request. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    setFile(null);
    setFileUrl(null);
    setJobId(null);
    setJobStatus(null);
    setJobResult(null);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">3D Print Instant Quote</h1>
          <nav>
            <Link href="/admin" className="text-gray-600 hover:text-blue-600">
              Admin Panel
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {successMessage ? (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-green-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <Button onClick={handleReset}>Start New Quote</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload and Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Upload Your 3D Model</h2>
                {!file ? (
                  <FileUpload onFileSelected={handleFileSelected} />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={handleReset}>
                        Change
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {fileUrl && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">3D Preview</h2>
                  <ModelViewer
                    modelUrl={fileUrl}
                    selectedColor={selectedColor}
                  />
                </div>
              )}

              {/* Print Options */}
              {file && !jobResult && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Print Options</h2>
                  
                  {/* Fill Density Slider */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fill Density: {Math.round(fillDensity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={fillDensity}
                      onChange={(e) => setFillDensity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  {/* Support Material Toggle */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableSupports"
                      checked={enableSupports}
                      onChange={(e) => setEnableSupports(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableSupports" className="ml-2 block text-sm text-gray-700">
                      Generate support material (recommended)
                    </label>
                  </div>
                  
                  {/* Process Button */}
                  <div className="mt-6">
                    <Button
                      onClick={handleSubmit}
                      isLoading={isSubmitting || jobStatus === 'processing'}
                      disabled={isSubmitting || jobStatus === 'processing'}
                      className="w-full"
                    >
                      {jobStatus === 'processing' ? 'Processing...' : 'Generate Quote'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Material Selection and Quote */}
            <div className="space-y-6">
              {materialsData && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Material & Color</h2>
                  <MaterialColorSelector
                    materials={materialsData.materials}
                    selectedMaterial={selectedMaterialId}
                    selectedColor={selectedColorId}
                    onMaterialChange={setSelectedMaterialId}
                    onColorChange={setSelectedColorId}
                  />
                </div>
              )}

              {jobResult && selectedMaterial && selectedColor && (
                <QuoteDisplay
                  jobResult={jobResult}
                  selectedMaterial={selectedMaterial}
                  selectedColor={selectedColor}
                  onSubmit={handlePrintRequest}
                  isSubmitting={isSubmitting}
                />
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p>{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} 3D Print Instant Quote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
