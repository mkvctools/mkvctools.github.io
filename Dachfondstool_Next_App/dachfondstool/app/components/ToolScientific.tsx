"use client"
import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {
  interpolationChart,
  interpolateArrays,
  roiArrayFill,
} from '../utils/interpolation';

import BarChart from '@/app/components/charts/BarChart';
import LineChart from '@/app/components/charts/LineChart';
import ProbChart from '@/app/components/charts/ProbChart';
import ROIChart from '@/app/components/charts/ROIChart';

import RangeSlider from './RangeSlider';

const ToolScientific = () => {
  const [moneySliderValue, setMoneySliderValue] = useState<number>(500000); // Initial Money Slider Value
  const [startupSliderValue, setStartupSliderValue] = useState<number>(200); // Initial Startup Slider Value

  // Input data for interpolations
  const inputMin = [0, 0.07, 0.17, 0.51, 0.93, 1.10, 1.13, 1.19, 1.27];
  const inputMax = [0, 0.48, 1.23, 2.03, 2.67, 3.12, 3.26, 3.42, 3.41];
  const inputProb = [0, 0.1, 0.5, 0.9, 0.95];
  const inputStartups = [0, 10, 50, 200, 400];

  // Interpolation results
  const minArray = interpolationChart(inputMin, 400);
  const maxArray = interpolationChart(inputMax, 400);
  const probArray = interpolateArrays(inputProb, inputStartups);
  const roiArrayMin = roiArrayFill(minArray, moneySliderValue);
  const roiArrayMax = roiArrayFill(maxArray, moneySliderValue);

  // Handlers for sliders
  const handleMoneySliderChange = (newValue: number) => {
    setMoneySliderValue(newValue);
  };

  const handleStartupSliderChange = (newValue: number) => {
    setStartupSliderValue(newValue);
  };

  return (
    <div>
      {/* Range Sliders */}
      <div className="flex w-full justify-center my-16 gap-8">
        <div>
          <label className="block text-center font-medium">Investment (€)</label>
          <RangeSlider
            min={200000}
            max={5000000}
            step={10000}
            value={moneySliderValue}
            onChange={handleMoneySliderChange}
          />
          <div className="text-center mt-2">{moneySliderValue.toLocaleString('de-DE')} €</div>
        </div>
        <div>
          <label className="block text-center font-medium">Startups</label>
          <RangeSlider
            min={0}
            max={400}
            step={1}
            value={startupSliderValue}
            onChange={handleStartupSliderChange}
          />
          <div className="text-center mt-2">{startupSliderValue} Startups</div>
        </div>
      </div>

      {/* Tabs */}
      <TabGroup>
        <TabList className="flex justify-center gap-4">
          <Tab className="data-[selected]:bg-[#fe5600] data-[selected]:text-white px-8 py-4 border-gray-200 rounded-full bg-gray-100 hover:bg-gray-200">
            TVPI
          </Tab>
          <Tab className="data-[selected]:bg-[#fe5600] data-[selected]:text-white px-8 py-4 border-gray-200 rounded-full bg-gray-100 hover:bg-gray-200">
            Gewinnwahrscheinlichkeit
          </Tab>
          <Tab className="data-[selected]:bg-[#fe5600] data-[selected]:text-white px-8 py-4 border-gray-200 rounded-full bg-gray-100 hover:bg-gray-200">
            Ergebnis
          </Tab>
        </TabList>

        <TabPanels>
          {/* TVPI Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className=''>
              <BarChart
                minValue={minArray[startupSliderValue]}
                maxValue={maxArray[startupSliderValue]}
              />
              </div>
              <LineChart
                startupValue={startupSliderValue}
                minArray={minArray}
                maxArray={maxArray}
              />
            </div>
          </TabPanel>

          {/* Gewinnwahrscheinlichkeit Tab */}
          <TabPanel>
            <div className="p-8">
              <ProbChart
                startupValue={startupSliderValue}
                probArray={probArray}
              />
            </div>
          </TabPanel>

          {/* Ergebnis Tab */}
          <TabPanel>
            <div className="p-8">
              <ROIChart
                startupValue={startupSliderValue}
                roiArrayMin={roiArrayMin}
                roiArrayMax={roiArrayMax}
              />
            </div>
          </TabPanel>
        </TabPanels>
     
      </TabGroup>
    </div>
  );
};

export default ToolScientific;
