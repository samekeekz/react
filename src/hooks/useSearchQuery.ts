import { useState, useEffect } from "react";
import useDebounce from "./useDebounce.ts";

const useSearchQuery = (initialValue: string = "") => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem("searchQuery") || initialValue;
  });

  const { debouncedValue } = useDebounce(searchQuery, 500);

  useEffect(() => {
    localStorage.setItem("searchQuery", debouncedValue);
  }, [debouncedValue]);

  return [searchQuery, setSearchQuery] as const;
};

export default useSearchQuery;
