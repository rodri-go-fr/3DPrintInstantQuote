'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../utils/cn';
import Button from './ui/Button';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  accept = {
    'model/stl': ['.stl'],
    'model/3mf': ['.3mf'],
  },
  maxSize = 50 * 1024 * 1024, // 50MB
  className,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB`);
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setError('Invalid file type. Please upload an STL or 3MF file.');
      } else {
        setError(rejection.errors[0].message);
      }
    },
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-lg font-medium">
            {isDragActive ? 'Drop the file here' : 'Drag & drop your 3D model here'}
          </div>
          <p className="text-sm text-gray-500">
            or <Button onClick={open} variant="ghost" size="sm" type="button">browse files</Button>
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: STL, 3MF (Max {maxSize / (1024 * 1024)}MB)
          </p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
