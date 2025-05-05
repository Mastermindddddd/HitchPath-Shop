import * as React from "react"

export function Badge({ children, className = "" }) {
    return (
      <span className={`inline-block px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded ${className}`}>
        {children}
      </span>
    );
  }

