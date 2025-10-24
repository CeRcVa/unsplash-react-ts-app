import { useState, useEffect } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
}

export default function SearchInput({ onChange }: SearchInputProps) {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  return (
    <input
      type="text"
      className="w-full p-3 border rounded-lg shadow-sm"
      placeholder="Search photos..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
