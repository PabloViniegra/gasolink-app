import React from 'react';
import { Button } from '@heroui/react';

interface SupportBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const SupportBanner: React.FC<SupportBannerProps> = ({
  title = '¿Necesitas más ayuda?',
  description = 'Si no encuentras solución a tu problema, nuestro equipo de soporte está aquí para ayudarte.',
  buttonText = 'Contactar con soporte',
  onButtonClick,
  className = '',
}) => {
  return (
    <div className={`mt-16 max-w-4xl mx-auto ${className}`}>
      <div className="bg-card/70 border border-border rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button
          variant="solid"
          className="font-lexend font-normal bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          onPress={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SupportBanner;
