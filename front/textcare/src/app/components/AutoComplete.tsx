"use client";

import React, { useState, useEffect } from "react";
import { SelectableInput } from "./SelectableInput";

interface AutoCompleteProps {
  apiURL: string;
  placeholder?: string;
  queryLimit?: number;
  debounceDuration?: number;
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
}

export function AutoComplete({
  apiURL,
  placeholder = "Search ICD-10 codes...",
  queryLimit = 10,
  debounceDuration = 300,
  selectedConditions,
  toggleCondition,
}: AutoCompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

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
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${apiURL}/?qs=${debouncedQuery}&limit=${queryLimit}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.icd10codes) {
          setResults(data.icd10codes.map((item: any) => item.desc));
        } else {
          setResults([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, apiURL, queryLimit]);

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="autocomplete-input"
      />
      {isLoading && <div className="autocomplete-loading">Loading...</div>}
      {error && <div className="autocomplete-error">{error}</div>}
      {results.length > 0 && (
        <ul className="autocomplete-results">
          {results.map((desc) => (
            <SelectableInput
              key={desc}
              text={desc}
              isSelected={selectedConditions.includes(desc)}
              onSelect={() => toggleCondition(desc)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
