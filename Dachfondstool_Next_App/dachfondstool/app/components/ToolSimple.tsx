import React, { useState, useEffect } from 'react';
import ThreeButtonContainer from './ThreeButtonContainer';
import RangeSlider from './RangeSlider';

const percentageProps = [
  { buttonValue: 10, buttonText: '10%' },
  { buttonValue: 50, buttonText: '50%' },
  { buttonValue: 90, buttonText: '90%' },
];

const yearProps = [
  { buttonValue: 4, buttonText: '4 Jahre' },
  { buttonValue: 6, buttonText: '6 Jahre' },
  { buttonValue: 10, buttonText: '10 Jahre' },
];

const ToolSimple = () => {
  const [sliderValue, setSliderValue] = useState<number>(500000); // Initial Slider Value
  const [selectedPercent, setSelectedPercent] = useState<number>(90); // Default 90%
  const [selectedYear, setSelectedYear] = useState<number>(10); // Default 10 Jahre
  const [expectedResult, setExpectedResult] = useState<string>('');
  const [idealResult, setIdealResult] = useState<string>('');

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };

  const calculateResults = () => {
    const expectedMap: { [key: string]: number } = {
      '10-4': 0.8,
      '10-6': 0.5,
      '10-10': 0.19,
      '50-4': 1.2,
      '50-6': 1.4,
      '50-10': 1.27,
      '90-4': 1.25,
      '90-6': 1.6,
      '90-10': 2.36,
    };

    const idealMap: { [key: string]: number } = {
      '10-4': 0.8,
      '10-6': 0.5,
      '10-10': 0.49,
      '50-4': 1.2,
      '50-6': 1.53,
      '50-10': 2.03,
      '90-4': 1.49,
      '90-6': 2.03,
      '90-10': 3.12,
    };


    const rateKey = `${selectedPercent}-${selectedYear}`;
    const expectedReturnRate = expectedMap[rateKey] || 1;
    const idealReturnRate = idealMap[rateKey] || 1.25;

    const expected = sliderValue * expectedReturnRate;
    const ideal = sliderValue * idealReturnRate;

    setExpectedResult(expected.toLocaleString('de-DE'));
    setIdealResult(ideal.toLocaleString('de-DE'));
  };

  useEffect(() => {
    calculateResults();
  }, [sliderValue, selectedPercent, selectedYear]);

  return (
    <div>
      <h2>Tool Simple</h2>
      <div className='flex justify-evenly'>
        <ThreeButtonContainer
          props={percentageProps}
          defaultValue={90}
          onClick={(value: number) => setSelectedPercent(value)}
        />
        <RangeSlider
          min={200000}
          max={5000000}
          step={10000}
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <ThreeButtonContainer
          props={yearProps}
          defaultValue={10}
          onClick={(value: number) => setSelectedYear(value)}
        />
      </div>
      <div className='mt-4'>
        <h3>Ergebnisse:</h3>
        <p>Erwarteter Gewinn: {expectedResult} €</p>
        <p>Idealer Gewinn: {idealResult} €</p>
      </div>
    </div>
  );
};

export default ToolSimple;
