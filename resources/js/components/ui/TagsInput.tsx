import React, { useState } from 'react';

interface TagsInputProps {
  label?: string;
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  maxTagLength?: number;
  maxTags?: number;
  disabled?: boolean;
  textButton?: string;
}

export default function TagsInput({
  label,
  value,
  onChange,
  placeholder = 'Agregar y presiona Enter',
  maxTagLength = 50,
  maxTags = 20,
  disabled = false,
  textButton,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();

    if (
      trimmed &&
      !value.includes(trimmed) &&
      trimmed.length <= maxTagLength &&
      value.length < maxTags &&
      !disabled
    ) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
    if (disabled) return;
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      {label && <label className="block mb-2 font-medium text-sm text-gray-700">{label}</label>}

      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                className="cursor-pointer ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => removeTag(tag)}
                aria-label={`Eliminar ${tag}`}
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`flex-1 border rounded p-2 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
            aria-label={label}
        />

        <button
            type="button"
            onClick={addTag}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white whitespace-nowrap cursor-pointer ${
            disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-teal-400 hover:bg-teal-600 focus:ring-2 focus:ring-teal-400'
            }`}
        >
            {textButton || 'Agregar'}
        </button>
        </div>
    </div>
  );
}
