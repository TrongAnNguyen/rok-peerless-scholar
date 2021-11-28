import { Document } from "flexsearch";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "throttle-debounce";
import peerlessSchoolarData from "../PeerlessScholarData.json";

const useFlexSearch = (options = {}) => {
  const [query, updateQuery] = useState("");
  const { limit } = options;

  const document = useMemo(() => {
    const index = new Document({
      tokenize: "full",
      language: "en",
      preset: "match",
      cache: true,
      context: true,
      document: {
        id: "id",
        index: ["q"],
        store: ["q", "a"]
      }
    });
    peerlessSchoolarData.forEach((item) => index.add(item));

    return index;
  }, []);

  const result = useMemo(
    () => document.search(query, { pluck: "q", limit, enrich: true }),
    [query, document, limit]
  );

  const setQuery = useMemo(() => debounce(20, updateQuery), []);
  const onSearch = useCallback((e) => setQuery(e.target.value), [setQuery]);

  return {
    result,
    query,
    setQuery,
    onSearch
  };
};

export default useFlexSearch;
