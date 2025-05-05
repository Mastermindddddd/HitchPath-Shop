import * as React from "react";

const Select = ({ children, ...props }) => (
  <select {...props} className="border rounded px-3 py-2">
    {children}
  </select>
);

const SelectTrigger = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);

const SelectContent = ({ children }) => <>{children}</>;

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const SelectValue = ({ value }) => value;

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
