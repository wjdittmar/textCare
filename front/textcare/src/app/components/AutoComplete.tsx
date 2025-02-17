"use client";

import React, { useState, useEffect } from "react";
import { SelectableInput } from "./SelectableInput";

import { Input } from "./Input";

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
          `${apiURL}?qs=${debouncedQuery}&limit=${queryLimit}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.cmtCodes) {
          // TODO: better way to avoid hardcoding this?
          setResults(
            data.cmtCodes.map((item: any) =>
              item.patient_friendly_name.toLowerCase(),
            ),
          );
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
      <Input
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
