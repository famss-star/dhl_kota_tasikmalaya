"use client";

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Jangan render apa-apa jika belum mounted
  if (!mounted) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      className={`relative text-gray-800 dark:text-white bg-gray-200/50 dark:bg-green-900 rounded-full p-2 hover:bg-gray-300/70 dark:hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg ${sizeClasses[size]} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun 
          className={`absolute transition-all duration-300 ${iconSizes[size]} ${
            theme === 'dark' 
              ? 'rotate-0 opacity-100 scale-100' 
              : 'rotate-90 opacity-0 scale-0'
          }`}
        />
        <Moon 
          className={`absolute transition-all duration-300 ${iconSizes[size]} ${
            theme === 'light' 
              ? 'rotate-0 opacity-100 scale-100' 
              : '-rotate-90 opacity-0 scale-0'
          }`}
        />
      </div>
    </button>
  );
} 