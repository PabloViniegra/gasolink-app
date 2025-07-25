import React from 'react';
import GradientText from '../shared/GradientText';

interface HelpHeroProps {
  title: string;
  description: string;
}

const HelpHero: React.FC<HelpHeroProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <GradientText className="text-4xl font-extrabold mb-4 font-display">
        {title}
      </GradientText>
      <p className="text-muted-foreground max-w-2xl mx-auto font-sans-serif tracking-wide text-lg my-2">
        {description}
      </p>
    </div>
  );
};

export default HelpHero;
