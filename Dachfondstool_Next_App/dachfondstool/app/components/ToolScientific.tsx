import React from 'react'
import {useState} from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import RangeSlider from './RangeSlider'

const ToolScientific = () => {

  const [moneySliderValue, setMoneySliderValue] = useState<number>(500000); // Initial Money Slider Value
  const [startupSliderValue, setStartupSliderValue] = useState<number>(200);

  const handleMoneySliderChange = (newValue: number) => {
    setMoneySliderValue(newValue);
  };

  const handleStartupSliderChange = (newValue: number)=>{
    setStartupSliderValue(newValue)
  }

  return (

    <div>
      <div className='flex w-full'>
      <RangeSlider
          min={200000}
          max={5000000}
          step={10000}
          value={moneySliderValue}
          onChange={handleMoneySliderChange}
        />
        <RangeSlider
          min={0}
          max={400}
          step={1}
          value={startupSliderValue}
          onChange={handleStartupSliderChange}
        />
      </div>
    
    <TabGroup>
    <TabList className="flex justify-center">
    <Tab className="data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:underline px-8 py-4 border-gray-200 shadow-lg rounded-full">TVPI</Tab>
    <Tab className="data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:underline px-8 py-4 border-gray-200 shadow-lg rounded-full">Gewinnwahrscheinlichkeit</Tab>
    <Tab className="data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:underline px-8 py-4 border-gray-200 shadow-lg rounded-full">Ergebnis</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>TVPI</TabPanel>
      <TabPanel>Gewinnwahrscheinlichkeit</TabPanel>
      <TabPanel>Ergebnis</TabPanel>
    </TabPanels>
  </TabGroup>
  </div>
  )
}

export default ToolScientific