import React from 'react';

interface NavButtonProps {
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ className }) => {
  return (
    <div className={`w-[20px] h-[20px] flex flex-col items-between gap-[3.5px] ${className}`}>
      <div className="w-[20px] h-[3px] bg-black"></div>  
      <div className="w-[20px] h-[3px] bg-black"></div>  
      <div className="w-[20px] h-[3px] bg-black"></div>              
    </div>
  );
};

export default NavButton;
