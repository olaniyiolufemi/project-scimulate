
import React from "react";

interface FlaskIconProps {
  className?: string;
}

export const Flask = ({ className = "h-6 w-6" }: FlaskIconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 3h6v4l4 8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3l4-8V3z" />
  </svg>
);

export default Flask;
