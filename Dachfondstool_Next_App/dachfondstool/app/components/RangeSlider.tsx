import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, value, onChange }) => {
  return (
    <div className="range-slider px-4">
        <div className="slider-info flex justify-center text-3xl px-4 text-gray-600 mt-2">
        <span>{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider w-full h-2 bg-[#ea5600] rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
    </div>
  );
};

export default RangeSlider;
