"use client";

import React, { useState, useEffect } from "react";

interface AutoCompleteProps {
  apiURL: string;
  placeholder?: string;
  queryLimit?: number;
  debounceDuration?: number;
}

export function AutoComplete({
  apiURL,
  placeholder = "Search ICD-10 codes...",
  queryLimit = 10,
  debounceDuration = 300,
}: AutoCompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce effect
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
        console.log(data);
        if (data.icd10codes) {
          setResults(data.icd10codes.map((item: any) => item.desc));
        } else {
          setResults([]);
        }
      } catch (err) {
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
          {results.map((desc, index) => (
            <li key={index} className="autocomplete-result-item">
              {desc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
