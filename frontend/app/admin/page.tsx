'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMaterials, updateMaterials, getAllJobs, approveJob, rejectJob } from '../utils/api';
import Button from '../components/ui/Button';
import { MaterialsData, Job } from '../types';

export default function AdminPage() {
  const [materialsData, setMaterialsData] = useState<MaterialsData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<'materials' | 'jobs'>('materials');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editedMaterials, setEditedMaterials] = useState<MaterialsData | null>(null);

  // Load materials and jobs on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [materialsResponse, jobsResponse] = await Promise.all([
          getMaterials(),
          getAllJobs(),
        ]);
        
        setMaterialsData(materialsResponse);
        setEditedMaterials(JSON.parse(JSON.stringify(materialsResponse))); // Deep copy
        setJobs(jobsResponse);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle material updates
  const handleMaterialChange = (materialIndex: number, field: string, value: any) => {
    if (!editedMaterials) return;
    
    const updatedMaterials = { ...editedMaterials };
    updatedMaterials.materials[materialIndex][field] = value;
    setEditedMaterials(updatedMaterials);
  };

  // Handle color updates
  const handleColorChange = (materialIndex: number, colorIndex: number, field: string, value: any) => {
    if (!editedMaterials) return;
    
    const updatedMaterials = { ...editedMaterials };
    updatedMaterials.materials[materialIndex].colors[colorIndex][field] = value;
    setEditedMaterials(updatedMaterials);
  };

  // Add a new color to a material
  const handleAddColor = (materialIndex: number) => {
    if (!editedMaterials) return;
    
    const updatedMaterials = { ...editedMaterials };
    updatedMaterials.materials[materialIndex].colors.push({
      id: `color-${Date.now()}`,
      name: 'New Color',
      hex: '#CCCCCC',
      addon_price: 0,
    });
    setEditedMaterials(updatedMaterials);
  };

  // Remove a color from a material
  const handleRemoveColor = (materialIndex: number, colorIndex: number) => {
    if (!editedMaterials) return;
    
    const updatedMaterials = { ...editedMaterials };
    updatedMaterials.materials[materialIndex].colors.splice(colorIndex, 1);
    setEditedMaterials(updatedMaterials);
  };

  // Add a new material
  const handleAddMaterial = () => {
    if (!editedMaterials) return;
    
    const updatedMaterials = { ...editedMaterials };
    updatedMaterials.materials.push({
      id: `material-${Date.now()}`,
      name: 'New Material',
      description: 'Description of the new material',
      properties: ['Property 1', 'Property 2'],
      base_cost_per_gram: 0.05,
      hourly_rate: 2.0,
      colors: [
        {
          id: `color-${Date.now()}`,
          name: 'Default Color',
          hex: '#CCCCCC',
          addon_price: 0,
        },
      ],
    });
    setEditedMaterials(updatedMaterials);
  };

  // Remove a material
  const handleRemoveMaterial = (materialIndex: number) => {
    if (!editedMaterials) return;
    
    const updatedMaterials = { ...editedMaterials };
    updatedMaterials.materials.splice(materialIndex, 1);
    setEditedMaterials(updatedMaterials);
  };

  // Save materials changes
  const handleSaveMaterials = async () => {
    if (!editedMaterials) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      await updateMaterials(editedMaterials);
      setMaterialsData(editedMaterials);
      setSuccess('Materials updated successfully');
    } catch (err) {
      console.error('Error saving materials:', err);
      setError('Failed to save materials. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle job approval
  const handleApproveJob = async (jobId: string) => {
    setError(null);
    setSuccess(null);
    
    try {
      await approveJob(jobId);
      
      // Update job status in the local state
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: 'approved', approved_at: Date.now() } : job
      ));
      
      setSuccess('Job approved successfully');
    } catch (err) {
      console.error('Error approving job:', err);
      setError('Failed to approve job. Please try again.');
    }
  };

  // Handle job rejection
  const handleRejectJob = async (jobId: string) => {
    setError(null);
    setSuccess(null);
    
    try {
      await rejectJob(jobId);
      
      // Update job status in the local state
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: 'rejected', rejected_at: Date.now() } : job
      ));
      
      setSuccess('Job rejected successfully');
    } catch (err) {
      console.error('Error rejecting job:', err);
      setError('Failed to reject job. Please try again.');
    }
  };

  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'materials'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('materials')}
          >
            Materials & Colors
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'jobs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('jobs')}
          >
            Print Jobs
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-6">
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

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-600 mb-6">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>{success}</p>
            </div>
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && !isLoading && editedMaterials && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Materials & Colors</h2>
              <div className="space-x-2">
                <Button onClick={handleAddMaterial} variant="secondary">
                  Add Material
                </Button>
                <Button onClick={handleSaveMaterials} isLoading={isSaving} disabled={isSaving}>
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Materials List */}
            <div className="space-y-8">
              {editedMaterials.materials.map((material, materialIndex) => (
                <div key={material.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-4 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Material Name
                        </label>
                        <input
                          type="text"
                          value={material.name}
                          onChange={(e) => handleMaterialChange(materialIndex, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={material.description}
                          onChange={(e) => handleMaterialChange(materialIndex, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Base Cost per Gram ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={material.base_cost_per_gram}
                            onChange={(e) => handleMaterialChange(materialIndex, 'base_cost_per_gram', parseFloat(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hourly Rate ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={material.hourly_rate}
                            onChange={(e) => handleMaterialChange(materialIndex, 'hourly_rate', parseFloat(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveMaterial(materialIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Colors Section */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Colors</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddColor(materialIndex)}
                      >
                        Add Color
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {material.colors.map((color, colorIndex) => (
                        <div key={color.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div
                            className="w-8 h-8 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="grid grid-cols-3 gap-3 flex-1">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                value={color.name}
                                onChange={(e) => handleColorChange(materialIndex, colorIndex, 'name', e.target.value)}
                                className="w-full p-1 text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">
                                Color Code
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="color"
                                  value={color.hex}
                                  onChange={(e) => handleColorChange(materialIndex, colorIndex, 'hex', e.target.value)}
                                  className="w-8 h-8 p-0 border-0"
                                />
                                <input
                                  type="text"
                                  value={color.hex}
                                  onChange={(e) => handleColorChange(materialIndex, colorIndex, 'hex', e.target.value)}
                                  className="w-full p-1 text-sm border border-gray-300 rounded-md ml-2"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">
                                Addon Price ($)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={color.addon_price}
                                onChange={(e) => handleColorChange(materialIndex, colorIndex, 'addon_price', parseFloat(e.target.value))}
                                className="w-full p-1 text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveColor(materialIndex, colorIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && !isLoading && (
          <div>
            <h2 className="text-xl font-bold mb-6">Print Jobs</h2>
            
            {jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                No print jobs found
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{job.original_filename}</h3>
                        <p className="text-sm text-gray-500">
                          Submitted: {formatDate(job.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : job.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : job.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {job.result && (
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Material:</span>{' '}
                          {job.material_id}
                        </div>
                        <div>
                          <span className="text-gray-500">Color:</span>{' '}
                          {job.color_id}
                        </div>
                        <div>
                          <span className="text-gray-500">Filament Used:</span>{' '}
                          {job.result.filament_used_g.toFixed(2)}g
                        </div>
                        <div>
                          <span className="text-gray-500">Print Time:</span>{' '}
                          {job.result.estimated_time}
                        </div>
                        <div>
                          <span className="text-gray-500">Fill Density:</span>{' '}
                          {Math.round(job.fill_density * 100)}%
                        </div>
                        <div>
                          <span className="text-gray-500">Supports:</span>{' '}
                          {job.enable_supports ? 'Yes' : 'No'}
                        </div>
                        {job.result.price_info && (
                          <div className="col-span-2">
                            <span className="text-gray-500">Total Price:</span>{' '}
                            <span className="font-medium">
                              ${job.result.price_info.total_price.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {job.status === 'completed' && (
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={() => handleApproveJob(job.id)}
                          variant="primary"
                          size="sm"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectJob(job.id)}
                          variant="outline"
                          size="sm"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    
                    {job.status === 'approved' && job.approved_at && (
                      <p className="mt-4 text-sm text-green-600">
                        Approved on {formatDate(job.approved_at)}
                      </p>
                    )}
                    
                    {job.status === 'rejected' && job.rejected_at && (
                      <p className="mt-4 text-sm text-red-600">
                        Rejected on {formatDate(job.rejected_at)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
