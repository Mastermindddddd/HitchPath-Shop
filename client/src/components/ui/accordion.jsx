import React, { useState } from "react";

export const Accordion = ({ children }) => {
  return <div className="border rounded">{children}</div>;
};

export const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 font-semibold"
      >
        {title}
      </button>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export const AccordionTrigger = ({ children }) => {
  return <div className="font-bold">{children}</div>;
};

export const AccordionContent = ({ children }) => {
  return <div>{children}</div>;
};
