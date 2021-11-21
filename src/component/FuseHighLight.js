// Finds `obj[path][to][key]` from `path.to.key`
const resolveAttribute = (obj, key) =>
  key.split(".").reduce((prev, curr) => prev?.[curr], obj);

// Recursively builds JSX output adding `<mark>` tags around matches
const highlight = (value, indices = [], i = 1) => {
  const pair = indices[indices.length - i];
  return !pair ? (
    value
  ) : (
    <>
      {highlight(value.substring(0, pair[0]), indices, i + 1)}
      <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
      {value.substring(pair[1] + 1)}
    </>
  );
};

// FuseHighlight component
const FuseHighlight = ({ result, attribute }) => {
  const matches =
    typeof result.item === "string"
      ? result.matches?.[0]
      : result.matches?.find((m) => m.key === attribute);
  const fallback =
    typeof result.item === "string"
      ? result.item
      : resolveAttribute(result.item, attribute);
  return highlight(matches?.value || fallback, matches?.indices);
};

export default FuseHighlight;
