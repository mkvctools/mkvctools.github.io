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
  const [moneySliderValue, setMoneySliderValue] = useState<number>(500000); // Initial Slider Value
  const [selectedPercent, setSelectedPercent] = useState<number>(90); // Default 90%
  const [selectedYear, setSelectedYear] = useState<number>(10); // Default 10 Jahre
  const [expectedResult, setExpectedResult] = useState<string>('');
  const [idealResult, setIdealResult] = useState<string>('');
  const [startupAmount,setStartupAmount] = useState<string>('');

  const handleMoneySliderChange = (newValue: number) => {
    setMoneySliderValue(newValue);
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
    const startupMap: { [key: string]: number } = {
      '10-4': 10,
      '10-6': 10,
      '10-10': 10,
      '50-4': 50,
      '50-6': 50,
      '50-10': 50,
      '90-4': 200,
      '90-6': 200,
      '90-10': 200,
    };

    

    const rateKey = `${selectedPercent}-${selectedYear}`;
    const expectedReturnRate = expectedMap[rateKey] || 1;
    const idealReturnRate = idealMap[rateKey] || 1.25;

    const expected = moneySliderValue * expectedReturnRate;
    const ideal = moneySliderValue * idealReturnRate;

    setExpectedResult(expected.toLocaleString('de-DE'));
    setIdealResult(ideal.toLocaleString('de-DE'));
    setStartupAmount(startupMap[rateKey].toLocaleString('de-DE'));
  };

  useEffect(() => {
    calculateResults();
  }, [moneySliderValue, selectedPercent, selectedYear]);

  return (
    <div className='py-16 px-4 lg:px-24'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <ThreeButtonContainer
          props={percentageProps}
          defaultValue={90}
          onClick={(value: number) => setSelectedPercent(value)}
          containerTitle='Gewinnwahrscheinlichkeit'
        />
        <RangeSlider
          min={200000}
          max={5000000}
          step={10000}
          value={moneySliderValue}
          onChange={handleMoneySliderChange}
          sliderTitle='Ihr Investment'
          className=''
        />
        <ThreeButtonContainer
          props={yearProps}
          defaultValue={10}
          onClick={(value: number) => setSelectedYear(value)}
          containerTitle='Investitionszeitraum'
        />
      </div>
      <div className='mt-4'>
        <p className='text-2xl'>Anzahl der Startups: {startupAmount}</p>
        <p className='text-2xl'>Erwarteter Gewinn: {expectedResult} €</p>
        <p className='text-2xl'>Idealer Gewinn: {idealResult} €</p>
      </div>
    </div>
  );
};

export default ToolSimple;
