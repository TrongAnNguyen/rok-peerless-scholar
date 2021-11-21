import Fuse from "fuse.js";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "throttle-debounce";
import peerlessSchoolarData from "../PeerlessSchoolarData.json";

const fuseIndex = Fuse.createIndex(["q"], peerlessSchoolarData);
const defaultOptions = {
  keys: ["q"]
};
const useFuse = (options = {}) => {
  const [query, updateQuery] = useState("");
  const { limit, matchAllOnEmpty, ...fuseOptions } = options;

  const fuse = useMemo(
    () =>
      new Fuse(
        peerlessSchoolarData,
        { ...defaultOptions, ...fuseOptions },
        fuseIndex
      ),
    [fuseOptions]
  );
  const result = useMemo(
    () =>
      !query && matchAllOnEmpty
        ? fuse
            .getIndex()
            .docs.slice(0, limit)
            .map((item, refIndex) => ({ item, refIndex }))
        : fuse.search(query, { limit }),
    [query, matchAllOnEmpty, fuse, limit]
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

export default useFuse;
