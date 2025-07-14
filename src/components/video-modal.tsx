"use client"

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  // إغلاق المودال عند الضغط على ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* خلفية شفافة */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* نافذة الفيديو */}
      <div className="relative z-10 bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-hidden">
        {/* رأس النافذة */}
        <div className="flex items-center justify-between p-1.5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-primary-dark">شاهد كيف تعمل منصة بوتيفاي</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* الفيديو */}
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-b-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Botifiy Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}