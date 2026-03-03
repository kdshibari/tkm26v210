import React, { useState, useEffect } from 'react';

interface PreferenceSliderProps {
  label: string;
  value?: number; 
  onChange: (value: number) => void;
}

export const PreferenceSlider = ({ label, value = 0, onChange }: PreferenceSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const bubblePosition = ((value + 2) / 4) * 100;
  const thumbOffset = 14 - (bubblePosition * 0.28); 

  const getLabelText = (val: number) => {
    switch (val) {
      case -2: return "Hard Limit";
      case -1: return "Soft Limit";
      case 0: return "Neutral";
      case 1: return "Moderate";
      case 2: return "Yes!";
      default: return "Neutral";
    }
  };

  const getDynamicColor = (val: number) => {
    switch (val) {
      case -2: return "hsl(var(--slider-hard-limit))";
      case -1: return "hsl(var(--slider-curious))";
      case 0: return "rgba(80, 80, 90, 0.6)"; 
      case 1: return "hsl(var(--slider-moderate))";
      case 2: return "hsl(var(--slider-yes))";
      default: return "rgba(80, 80, 90, 0.6)";
    }
  };

  const currentColor = getDynamicColor(value);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="mb-8 last:mb-4 relative select-none"
      style={{ '--thumb-color': currentColor } as React.CSSProperties}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-foreground tracking-tight">{label}</span>
      </div>

      <div className="relative pt-6 pb-2">
        <div 
          className={`absolute top-0 -translate-x-1/2 mb-2 px-3 py-1 text-[10px] font-bold text-white rounded-lg transition-all duration-300 pointer-events-none z-10 backdrop-blur-xl ${
            isDragging ? 'opacity-100 scale-110 -translate-y-1' : 'opacity-0 scale-95'
          }`}
          style={{ 
            left: `calc(${bubblePosition}% + ${thumbOffset}px)`,
            backgroundColor: value !== 0 ? currentColor : "rgba(20, 20, 25, 0.85)", 
            borderColor: value !== 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
            boxShadow: value !== 0 ? `0 0 12px ${currentColor}50` : '0 4px 12px rgba(0,0,0,0.5)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          {getLabelText(value)}
          <div 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r" 
            style={{ 
              backgroundColor: value !== 0 ? currentColor : "rgba(20, 20, 25, 0.85)",
              borderColor: value !== 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'
            }}
          />
        </div>

        <input
          type="range"
          min="-2"
          max="2"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="preference-slider w-full cursor-grab active:cursor-grabbing"
        />
        
        <div className="relative mt-3 h-4 w-full">
          <span className="absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground uppercase font-medium transition-colors duration-300" style={{ left: '14px', color: value === -2 ? currentColor : undefined }}>Hard</span>
          <span className="absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground uppercase font-medium transition-colors duration-300" style={{ left: 'calc(25% + 7px)', color: value === -1 ? currentColor : undefined }}>Soft</span>
          <span className="absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground uppercase font-medium" style={{ left: '50%' }}></span>
          <span className="absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground uppercase font-medium transition-colors duration-300" style={{ left: 'calc(75% - 7px)', color: value === 1 ? currentColor : undefined }}>Moderate</span>
          <span className="absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground uppercase font-medium transition-colors duration-300" style={{ left: 'calc(100% - 14px)', color: value === 2 ? currentColor : undefined }}>Yes!</span>
        </div>
      </div>
    </div>
  );
};
