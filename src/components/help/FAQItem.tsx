import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem as FAQItemType } from '../../types';

interface FAQItemProps {
  item: FAQItemType;
  isExpanded: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isExpanded, onToggle }) => {
  return (
    <div className="bg-card/50 border border-border rounded-lg overflow-hidden hover:bg-accent/10 transition-colors">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-accent/5 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span className="mr-3">{item.icon}</span>
          <span className="font-medium text-foreground">
            {item.question}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 pb-4 pt-2 border-t border-border">
          <p className="text-muted-foreground/90">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
