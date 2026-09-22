import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const AndroidStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12-hour or standard mobile time
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-7 px-4 flex items-center justify-between text-[12px] font-medium text-slate-800 bg-[#f7f9fb] select-none z-50 shrink-0">
      <span className="font-semibold tracking-tight">{currentTime}</span>
      <div className="flex items-center gap-1.5 opacity-85">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">92%</span>
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
