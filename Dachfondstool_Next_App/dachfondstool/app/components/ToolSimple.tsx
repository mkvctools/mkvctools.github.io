import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import ThreeButtonContainer from './ThreeButtonContainer';
import RangeSlider from './RangeSlider';

const percentageProps= [
  {
    buttonValue: 10,
    buttonText: '10%'
  },
  {
    buttonValue: 50,
    buttonText: '50%'
  },
  {
    buttonValue: 90,
    buttonText: '90%'
  },
]
const yearProps= [
  {
    buttonValue: 4,
    buttonText: '4 Jahre'
  },
  {
    buttonValue: 6,
    buttonText: '6 Jahre'
  },
  {
    buttonValue: 10,
    buttonText: '10 Jahre'
  },
]

const ToolSimple = () => {

  const [sliderValue, setSliderValue] = useState<number>(50); // Initialer Slider-Wert

  // onChange-Handler
  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue); // Aktualisiert den Wert im Zustand
    console.log('Neuer Slider-Wert:', newValue);
  };

  return (
    <div>
      <h2>Tool Simple</h2>
      <div className='flex justify-evenly'>
      <ThreeButtonContainer props={percentageProps}/>
      <RangeSlider 
      min={200000}
      max={5000000}
      step={10000}
      value={sliderValue}
      onChange={handleSliderChange}
      />
      <ThreeButtonContainer props={yearProps}/>

      </div>
    </div>
  );
};

export default ToolSimple;
