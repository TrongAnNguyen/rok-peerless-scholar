import "./styles.css";
import useFlexSearch from "./hooks/useFlexSearch";


export default function App() {
  const { onSearch, result } = useFlexSearch({
    limit: 40
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <input type="text" onChange={onSearch} />
      </div>

      <table>
        <tr>
          <th>Question</th>
          <th>Answer</th>
        </tr>
        {result.map((item) => (
          <tr key={item.id}>
            <td>
              {/* <FuseHighLight result={item} attribute="q" /> */}
              {item.doc.q}
            </td>
            <td>{item.doc.a}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
