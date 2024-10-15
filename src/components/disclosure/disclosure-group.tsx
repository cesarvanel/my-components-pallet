


import React, { useState } from 'react';
import Disclosure from './disclosure';

const DisclosureGroup: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number, isOpen: boolean) => {
    if (isOpen) {
      setOpenIndex(index);
    } else {
      setOpenIndex(null);
    }
  };

  return (
    <div>
      {['Title 1', 'Title 2', 'Title 3'].map((title, index) => (
        <Disclosure
          key={index}
          title={title}
          defaultOpen={index === 1}
          onToggle={(isOpen) => handleToggle(index, isOpen)}
          autoClose={openIndex !== index}
        >
          <p>This is the content for {title}</p>
        </Disclosure>
      ))}
    </div>
  );
};

export default DisclosureGroup;