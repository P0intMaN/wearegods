import React, { useEffect, useState } from 'react';
import './PhaseTransition.css';

interface PhaseTransitionProps {
  phaseName: string;
  subtitle?: string;
  onComplete: () => void;
}

const PhaseTransition: React.FC<PhaseTransitionProps> = ({ phaseName, subtitle, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="phase-transition-overlay">
      <div className="transition-background">
        <div className="transition-grid"></div>
      </div>
      
      <div className="impact-container">
        <h1 className="impact-text-3d" data-text={phaseName}>
          {phaseName}
        </h1>
        {subtitle && (
          <div className="impact-subtitle ui-text">
            [ {subtitle} ]
          </div>
        )}
        <div className="impact-subtext ui-text" data-denied="ACCESS_DENIED" data-granted="DATASET_ACCESS_GRANTED">
        </div>
      </div>

      <div className="screen-flash"></div>
    </div>
  );
};

export default PhaseTransition;
