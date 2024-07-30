"use client"

import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

type GradientType = "radial" | "linear";

export interface Gradient {
  type: GradientType;
  rotation?: number;
  colorStops: { offset: number; color: string; }[];
}

export interface GradientPickerProps {
  label: string;
  id: string;
  value: Gradient;
  setValue: (gradient: Gradient, id: string) => void;
}



const GradientPicker: React.FC<GradientPickerProps> = ({ id, label, setValue, value }) => {
  const [gradient, setGradient] = useState<Gradient>(value);

  const updateGradient = (updatedGradient: Gradient) => {
    setGradient(updatedGradient);
    setValue(updatedGradient,id);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateGradient({ ...gradient, type: event.target.value as GradientType });
  };

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateGradient({ ...gradient, rotation: parseInt(event.target.value) });
  };

  const handleColorStopChange = (index: number, field: 'offset' | 'color', value: number | string) => {
    const newColorStops = [...gradient.colorStops];
    newColorStops[index] = { ...newColorStops[index], [field]: value };
    updateGradient({ ...gradient, colorStops: newColorStops });
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
    <div className='flex flex-row items-center space-x-4'>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        id={`${id}-type`}
        value={gradient?.type}
        onChange={handleTypeChange}
        className="bg-gray-800 block text-sm font-medium text-gray-300"
      >
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
      </select>
      {gradient.type === "linear" && (
        <input
          type="number"
          id={`${id}-rotation`}
          value={gradient.rotation}
          onChange={handleRotationChange}
          className="bg-gray-800 block text-sm font-medium text-gray-300"
          placeholder="Rotation (degrees)"
        />
      )}
    </div>
    <div className='flex flex-row items-center space-x-4'>
    {gradient.colorStops.map((stop, index) => (
        <div key={index} className="mt-2">
          <ColorPicker
            id={`${id}-color-${index}`}
            label={`Color Stop ${index + 1}`}
            value={stop.color}
            setValue={(e) => handleColorStopChange(index, 'color', e.target.value)}
          />
          <input
            type="number"
            id={`${id}-offset-${index}`}
            value={stop.offset}
            onChange={(e) => handleColorStopChange(index, 'offset', parseInt(e.target.value))}
            className="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Offset (%)"
            min="0"
            max="100"
          />
        </div>
      ))}
    </div>
      
     
    </div>
  );
};

export default GradientPicker;