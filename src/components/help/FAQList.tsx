import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { FAQItem as FAQItemType } from '../../types';
import FAQItem from './FAQItem';

interface FAQListProps {
  faqs: FAQItemType[];
  className?: string;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, className = '' }) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (faqs.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
        <p className="text-muted-foreground">
          Intenta con otros términos de búsqueda o revisa nuestras preguntas frecuentes.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          item={faq}
          isExpanded={!!expandedItems[index]}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default FAQList;
