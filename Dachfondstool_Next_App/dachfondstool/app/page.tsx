"use client"
import { useState } from "react";
import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import ToolSimple from "./components/ToolSimple";
import ToolScientific from "./components/ToolScientific";

export default function Home() {

  const [value,setValue] = useState<number>(50);
 // const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div className="min-w-screen min-h-screen">
      <main className="min-w-screen min-h-screen flex items-center justify-center">
       <div className="min-w-screen lg:w-4/5 lg:max-w-7xl min-h-screen lg:h-4/5  rounded-lg shadow-lg items-center justify-center">
       <div>

       <TabGroup>
      <TabList className="flex justify-evenly">
      <Tab className="bg-gray-100 data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:bg-gray-300 px-8 py-4 border-gray-200 w-full">Simple</Tab>
      <Tab className="bg-gray-100 data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:bg-gray-300 px-8 py-4 border-gray-200 w-full">Scientific</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><ToolSimple/></TabPanel>
        <TabPanel><ToolScientific/></TabPanel>
      </TabPanels>
    </TabGroup>
</div>
       </div>
      </main>
    </div>
  );
}
