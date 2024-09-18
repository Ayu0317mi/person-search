//custom-asyncselect.tsx
import React from 'react';
import AsyncSelect from 'react-select/async';

// Define the interface for your OptionValue
interface OptionValue<T = any> {
  label: string;
  value: string;
  data?: T; // Optional data attribute
}

// Define the props for CustomAsyncSelect
interface CustomAsyncSelectProps<T = any> {
  searchAction: (inputValue: string) => Promise<OptionValue<T>[]>; 
  addAction?: (selectedOption: OptionValue<T> | null) => void; 
  data?: T; // Generic data type
  value: OptionValue<T> | null;
  placeholder?: string;
  isClearable?: boolean;
}

// CustomAsyncSelect Component
const CustomAsyncSelect = <T,>({
  searchAction,
  addAction,
  value,
  placeholder,
  isClearable = true,
}: CustomAsyncSelectProps<T>) => {
  // Handle select change (addAction will be triggered if it exists)
  const handleChange = (selectedOption: OptionValue<T> | null) => {
    if (selectedOption?.value && selectedOption?.label && addAction) {
      addAction(selectedOption);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={searchAction}
      defaultOptions
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      isClearable={isClearable}
    />
  );
};

export default CustomAsyncSelect;
