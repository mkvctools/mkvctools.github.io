import React, { useState } from 'react';
import ToggleButton from './ToggleButton';

interface ButtonContainerProps {
  props: { buttonValue: number; buttonText: string }[];
}

const ThreeButtonContainer: React.FC<ButtonContainerProps> = ({ props }) => {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const handleToggle = (value: number) => {
    setActiveValue(value);
    console.log('Ausgewählter Wert:', value);
  };

  return (
    <div>
      <div className="flex gap-2">
        {/* Toggle Buttons mit spezifischen Werten */}
        {props.map((button, index) => (
          <ToggleButton
            key={index}
            isActive={activeValue === button.buttonValue}
            onClick={() => handleToggle(button.buttonValue)}
            buttonText={button.buttonText}
          />
        ))}
      </div>
      {/* Anzeige des aktiven Wertes */}

        <p className="mt-4">Ausgewählter Wert: {activeValue}</p>
      
    </div>
  );
};

export default ThreeButtonContainer;
