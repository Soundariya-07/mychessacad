import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  placeholder?: string;
  id?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  className,
  placeholder = "Select options...",
  id,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedOptions = options.filter((option) => value.includes(option.value));

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchQuery(""); // Clear search when closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when opening dropdown
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !value.includes(option.value) // Hide already selected options
  );

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        className={cn(
          "w-full justify-between hover:bg-[#374151] min-h-[40px] bg-[#1F2937] text-white",
          className
        )}
        id={id}
        onClick={() => {
          setOpen(!open);
          if (!open) {
            setSearchQuery(""); // Clear search when opening
          }
        }}
      >
        <div className="flex gap-1 flex-wrap">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <Badge
                key={option.value}
                className="mr-1 mb-1 bg-[#374151] hover:bg-[#4B5563] text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((v) => v !== option.value));
                }}
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(value.filter((v) => v !== option.value));
                  }}
                  className="ml-1 hover:bg-[#6B7280] rounded-full p-0.5"
                >
                  <span className="sr-only">Remove</span>
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Badge>
            ))
          ) : (
            <span className="text-[#94A3B8]">{placeholder}</span>
          )}
        </div>
      </Button>

      {open && (
        <div className="absolute w-full z-50 top-full mt-1 bg-[#1F2937] rounded-md border border-[#374151] shadow-lg">
          <div className="p-2">
            <input
              ref={inputRef}
              className="w-full px-3 py-2 bg-[#374151] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#94A3B8]"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center px-3 py-2 cursor-pointer hover:bg-[#374151]",
                    value.includes(option.value) && "bg-[#374151]"
                  )}
                  onClick={() => {
                    onChange([...value, option.value]);
                    setSearchQuery(""); // Clear search after selection
                    setOpen(false); // Close dropdown after selection
                  }}
                >
                  <svg
                    className={cn(
                      "mr-2 h-4 w-4 text-white",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-white">{option.label}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-[#94A3B8]">
                {searchQuery ? "No matching students found." : "No available students."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 