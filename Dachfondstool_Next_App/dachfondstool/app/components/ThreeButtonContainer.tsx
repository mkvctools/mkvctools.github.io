import React, { useState, useEffect } from 'react';
import ToggleButton from './ToggleButton';
import H3Component from './H3Component';

interface ButtonContainerProps {
  props: { buttonValue: number; buttonText: string;}[];
  defaultValue?: number; // Standardwert beim Laden der Seite
  onClick?: (value: number) => void; // Callback für den Parent-Component
  containerTitle?: string;
}

const ThreeButtonContainer: React.FC<ButtonContainerProps> = ({ props, defaultValue, onClick, containerTitle }) => {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  // Setze den Default-Wert beim Laden der Seite
  useEffect(() => {
    if (defaultValue !== undefined && activeValue === null) {
      setActiveValue(defaultValue);
      if (onClick) onClick(defaultValue); // Benachrichtige den Parent über den Default-Wert
    }
  }, [defaultValue, activeValue, onClick]);

  const handleToggle = (value: number) => {
    setActiveValue(value); // Lokaler State wird aktualisiert
    if (onClick) onClick(value); // Parent-Callback wird aufgerufen
  };

  return (
    <div>
      <H3Component title={containerTitle}/>
      <div className="flex gap-2 justify-center">
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
      <p className="mt-4">Ausgewählter Wert: {activeValue !== null ? activeValue : 'Keiner'}</p>
    </div>
  );
};

export default ThreeButtonContainer;
