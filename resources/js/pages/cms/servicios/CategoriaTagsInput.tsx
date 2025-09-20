import { useState } from 'react';

export default function CategoriaTagsInput({ value = [], onChange }: { value: string[]; onChange: (val: string[]) => void }) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
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
      <label className="block mb-2 font-medium text-sm text-gray-700">Categorías</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700"
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Agregar categoría y presiona Enter"
        className="w-full border rounded p-2"
      />
      <button
        type="button"
        onClick={addTag}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Agregar
      </button>
    </div>
  );
}
