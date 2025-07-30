import React from "react";

// Tabs
export function Tabs({ value, onChange, children }) {
  return <div>{React.Children.map(children, child => React.cloneElement(child, { value, onChange }))}</div>;
}

export function TabsList({ children, value, onChange }) {
  return (
    <div className="grid w-full grid-cols-6 gap-1">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive: value === child.props.tab,
          onChange,
        })
      )}
    </div>
  );
}

export function TabsTrigger({ tab, children, isActive, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(tab)}
      className={`px-4 py-2 border-b-2 transition-colors duration-200 ${
        isActive
          ? "border-blue-600 text-blue-600 font-semibold"
          : "border-transparent text-gray-600 hover:text-blue-500"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ tab, value, children }) {
  return tab === value ? <div className="mt-4">{children}</div> : null;
}
