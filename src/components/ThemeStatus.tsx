"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeStatus() {
  const { theme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-yellow-400' : 'bg-blue-500'}`}></div>
          <span className="text-gray-700 dark:text-gray-300">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </div>
    </div>
  );
} 