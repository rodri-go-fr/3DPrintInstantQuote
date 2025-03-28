'use client';

import React from 'react';
import { JobResult, Material, Color } from '../types';
import Button from './ui/Button';
import { cn } from '../utils/cn';

interface QuoteDisplayProps {
  jobResult: JobResult;
  selectedMaterial: Material;
  selectedColor: Color;
  onSubmit: () => void;
  isSubmitting: boolean;
  className?: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  jobResult,
  selectedMaterial,
  selectedColor,
  onSubmit,
  isSubmitting,
  className,
}) => {
  if (!jobResult || !jobResult.price_info) {
    return null;
  }

  const { price_info, filament_used_g, estimated_time, size, volume_cm3, has_supports } = jobResult;
  const { material_cost, time_cost, color_addon, total_price } = price_info;

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Print Quote</h2>
        
        <div className="space-y-6">
          {/* Model Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Model Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Dimensions</p>
                <p className="font-medium">
                  {size.x.toFixed(1)} × {size.y.toFixed(1)} × {size.z.toFixed(1)} mm
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Volume</p>
                <p className="font-medium">{volume_cm3.toFixed(2)} cm³</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Material Weight</p>
                <p className="font-medium">{filament_used_g.toFixed(2)} g</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Print Time</p>
                <p className="font-medium">{estimated_time}</p>
              </div>
            </div>
          </div>
          
          {/* Material Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Material</h3>
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div>
                <span className="font-medium">{selectedMaterial.name}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{selectedColor.name}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedMaterial.properties.map((property) => (
                <span
                  key={property}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 rounded"
                >
                  {property}
                </span>
              ))}
            </div>
            {has_supports && (
              <div className="mt-2 text-sm text-amber-600">
                <span className="font-medium">Note:</span> This model requires support structures
              </div>
            )}
          </div>
          
          {/* Price Breakdown */}
          <div>
            <h3 className="text-lg font-medium mb-3">Price Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Material Cost</span>
                <span>${material_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Print Time Cost</span>
                <span>${time_cost.toFixed(2)}</span>
              </div>
              {color_addon > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Color Premium</span>
                  <span>${color_addon.toFixed(2)}</span>
                </div>
              )}
              {has_supports && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Support Material</span>
                  <span>Included</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                <span>Total Price</span>
                <span>${total_price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <Button
          onClick={onSubmit}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          Submit Print Request
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Your request will be reviewed before printing begins
        </p>
      </div>
    </div>
  );
};

export default QuoteDisplay;
