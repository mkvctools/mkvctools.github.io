import React from 'react';
import H3Component from './H3Component';
interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  sliderTitle: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, value, onChange, sliderTitle}) => {
  return (
    <div className="px-4 flex flex-col items-center justify-center">
      <H3Component title={sliderTitle}/>
        <div className="slider-info flex justify-center text-3xl px-4 text-gray-600 mt-2">
        <p className='mb-4 text-2xl text-black'>{value} <span className={`${sliderTitle.toLowerCase().includes("investment")? '':'hidden'}`}>€</span></p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#ea5600] rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
    </div>
  );
};

export default RangeSlider;
