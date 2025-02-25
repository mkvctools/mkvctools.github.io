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
  const [investmentSliderVisible, setInvestmentSliderVisible] = useState(true);
  // Input data for interpolations
  const inputMin = [0, 0.07, 0.17, 0.51, 0.93, 1.10, 1.13, 1.19, 1.27];
  const inputMax = [0, 0.48, 1.23, 2.03, 2.67, 3.12, 3.26, 3.42, 3.41];
  const inputProb = [0, 0.1, 0.5, 0.7, 0.9, 0.95];
  const inputStartups = [0, 10, 50, 100, 230, 400];

  // Interpolation results
  const minArray = interpolationChart(inputMin, 400);
  const maxArray = interpolationChart(inputMax, 400);
  const probArray = interpolateArrays(inputProb, inputStartups);
  const roiArrayMin = roiArrayFill(minArray, moneySliderValue);
  const roiArrayMax = roiArrayFill(maxArray, moneySliderValue);

  //const sampledMinArray = sampleArray(minArray,10);
  //const sampledMaxArray = sampleArray(maxArray,10);

  // Handlers for sliders
  const handleMoneySliderChange = (newValue: number) => {
    setMoneySliderValue(newValue);
  };

  const handleStartupSliderChange = (newValue: number) => {
    setStartupSliderValue(newValue);
  };

  const tabList = [
    {
      tabKey: 1,
      tabTitle: 'TVPI',
      investmentSliderVisible: true,
    },
    {
      tabKey: 2,
      tabTitle: 'Gewinnwahrscheinlichkeit',
      investmentSliderVisible: false,
    },
    {
      tabKey: 3,
      tabTitle: 'Ergebnis',
      investmentSliderVisible: true,
    },
  ]

  return (
    <div>
      {/* Range Sliders */}
      <div className={`grid grid-cols-1 ${investmentSliderVisible?'md:grid-cols-2':''} justify-center my-16 gap-8`}>
        <div className={`${investmentSliderVisible?'':'hidden'}`}>
          <RangeSlider
            min={200000}
            max={5000000}
            step={10000}
            value={moneySliderValue}
            onChange={handleMoneySliderChange}
            sliderTitle='Investment'
            className='max-w-[400px] mx-auto'
          />
        </div>
        <div>
          <RangeSlider
            min={0}
            max={400}
            step={1}
            value={startupSliderValue}
            onChange={handleStartupSliderChange}
            sliderTitle='Startups'
            className={`${investmentSliderVisible?'max-w-[400px] mx-auto':'max-w-[600px] mx-auto'}`}
          />
        </div>
      </div>

      {/* Tabs */}
      <TabGroup>
        <TabList className="flex justify-center md:gap-4">
          {tabList.map((tab)=>(
          
            <Tab key={"tabNum-"+tab.tabKey} className="data-[selected]:bg-[#fe5600] w-full md:w-auto data-[selected]:text-white md:px-8 px-2 py-4 border-gray-200 md:rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={()=>{setInvestmentSliderVisible(tab.investmentSliderVisible)}}>
            {tab.tabTitle}
          </Tab>
            
          ))}

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
