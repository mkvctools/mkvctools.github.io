"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import ToolSimple from "./components/ToolSimple";
import ToolScientific from "./components/ToolScientific";
// Dynamisches Laden der Tools

export default function Home() {
 // const [value, setValue] = useState<number>(50);

  return (
    <div className="min-w-screen min-h-screen">
      <main className="min-w-screen min-h-screen flex justify-center py-16">
        <div className="min-w-screen lg:w-4/5 lg:max-w-7xl lg:h-4/5 overflow-hidden rounded-lg shadow-lg items-center justify-center">
          <div>
            <TabGroup>
              <TabList className="flex justify-evenly">
                <Tab className="bg-gray-100 data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:bg-gray-300 px-8 py-4 border-gray-200 w-full">
                  Simple
                </Tab>
                <Tab className="bg-gray-100 data-[selected]:bg-[#fe5600] data-[selected]:text-white data-[hover]:bg-gray-300 px-8 py-4 border-gray-200 w-full">
                  Scientific
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ToolSimple />
                </TabPanel>
                <TabPanel>
                  <ToolScientific />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </main>
    </div>
  );
}
