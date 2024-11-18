"use client"
import { useState } from "react";
import Image from "next/image";
import {Slider } from '@mantine/core';

export default function Home() {

  const [value,setValue] = useState<number>(50);
 // const [value, setValue] = useState<[number, number]>([20, 80]);


const handleSliderChange = (newValue: number)=>{
    setValue(newValue);
}
  return (
    <div className="min-w-screen min-h-screen">
      <main className="min-w-screen min-h-screen flex items-center justify-center">
       <div className="min-w-screen lg:w-3/5 min-h-screen lg:h-4/5  rounded-lg shadow-lg flex items-center justify-center">
        <Slider
 
        color="orange"
        value={value}
        //onChange={handleSliderChange}
        min={0}
        max={100}
        step={1}
       
        />
        <p>{value}</p>
       </div>
      </main>
    </div>
  );
}
