import React from "react";

interface ToggleButtonProps {
  isActive: boolean; // Gibt an, ob der Button aktiv ist
  onClick: () => void; // Callback für Klicks
  buttonText: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isActive, onClick, buttonText }) => {
  return (
    <button
      onClick={onClick}
      className={`w-24 px-2 py-2 rounded-sm text-white font-semibold transition-colors duration-300 ${
        isActive ? "bg-orange-500" : "bg-gray-200 text-gray-800"
      }`}
    >
      {buttonText}
    </button>
  );
};

export default ToggleButton;
