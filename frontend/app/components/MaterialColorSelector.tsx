'use client';

import React, { useState, useEffect } from 'react';
import { Material, Color } from '../types';
import { cn } from '../utils/cn';

interface MaterialColorSelectorProps {
  materials: Material[];
  selectedMaterial: string;
  selectedColor: string;
  onMaterialChange: (materialId: string) => void;
  onColorChange: (colorId: string) => void;
  className?: string;
}

const MaterialColorSelector: React.FC<MaterialColorSelectorProps> = ({
  materials,
  selectedMaterial,
  selectedColor,
  onMaterialChange,
  onColorChange,
  className,
}) => {
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);

  // Update current material when selectedMaterial changes
  useEffect(() => {
    const material = materials.find((m) => m.id === selectedMaterial);
    setCurrentMaterial(material || null);
  }, [materials, selectedMaterial]);

  // If the selected color is not available in the new material, select the first color
  useEffect(() => {
    if (currentMaterial) {
      const colorExists = currentMaterial.colors.some((c) => c.id === selectedColor);
      if (!colorExists && currentMaterial.colors.length > 0) {
        onColorChange(currentMaterial.colors[0].id);
      }
    }
  }, [currentMaterial, selectedColor, onColorChange]);

  if (!materials.length) {
    return <div className="p-4 text-gray-500">No materials available</div>;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Material Selection */}
      <div>
        <h3 className="text-lg font-medium mb-3">Material</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => onMaterialChange(material.id)}
              className={cn(
                'p-4 rounded-lg border text-left transition-colors',
                material.id === selectedMaterial
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="font-medium">{material.name}</div>
              <div className="text-sm text-gray-500 mt-1">{material.description}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {material.properties.map((property) => (
                  <span
                    key={property}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 rounded"
                  >
                    {property}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      {currentMaterial && (
        <div>
          <h3 className="text-lg font-medium mb-3">Color</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentMaterial.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorChange(color.id)}
                className={cn(
                  'flex flex-col items-center p-3 rounded-lg border transition-colors',
                  color.id === selectedColor
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div
                  className="w-12 h-12 rounded-full border border-gray-200 mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="font-medium text-sm">{color.name}</div>
                {color.addon_price > 0 && (
                  <div className="text-xs text-blue-600 mt-1">+${color.addon_price.toFixed(2)}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialColorSelector;
