"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { SelectableInput } from "./SelectableInput";

import { Input } from "./Input";

interface AutoCompleteProps {
  apiURL: string;
  placeholder?: string;
  queryLimit?: number;
  debounceDuration?: number;
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
  parseResponse: (data: any) => any[];
  showOptions: boolean;
}

export const AutoComplete = forwardRef<
  { inputRef: HTMLInputElement | null; optionsRef: HTMLDivElement | null },
  AutoCompleteProps
>(
  (
    {
      apiURL,
      placeholder = "Search ICD-10 codes...",
      queryLimit = 10,
      debounceDuration = 300,
      selectedConditions,
      toggleCondition,
      parseResponse,
      showOptions,
    },
    refs,
  ) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const localInputRef = useRef<HTMLInputElement>(null);
    const localOptionsRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(refs, () => ({
      inputRef: localInputRef.current,
      optionsRef: localOptionsRef.current,
    }));

    const containerStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      flex: "1",
    };
    const resultsStyles: React.CSSProperties = {
      borderRadius: "6px",
    };

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, debounceDuration);

      return () => clearTimeout(handler);
    }, [query, debounceDuration]);

    useEffect(() => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      const fetchData = async () => {
        setError(null);
        try {
          const response = await fetch(
            `${apiURL}?qs=${debouncedQuery}&limit=${queryLimit}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setResults(parseResponse(data));
        } catch (err: any) {
          setError(err.message);
        }
      };

      fetchData();
    }, [debouncedQuery, apiURL, queryLimit, parseResponse]);

    return (
      <div style={containerStyles}>
        <div style={{ background: "white" }}>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="autocomplete-input"
            ref={localInputRef}
          />
          {error && <div className="autocomplete-error">{error}</div>}
          {results.length > 0 && showOptions && (
            <div style={resultsStyles} ref={localOptionsRef}>
              {results.map((desc) => (
                <SelectableInput
                  key={desc}
                  text={desc}
                  isSelected={selectedConditions.includes(desc)}
                  onSelect={() => toggleCondition(desc)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
AutoComplete.displayName = "AutoComplete";
