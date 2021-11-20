import "./styles.css";
import data from "./PeerlessSchoolarData.json";
import Fuse from 'fuse.js'
import { useState } from "react";

const fuse = new Fuse(data, {
  keys: ["q", "a"]
})

export default function App() {
  const [searchText, setSearchText] = useState("");
  const result = fuse.search(searchText)
  console.log(result)
  const onSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <input type="text" value={searchText} onChange={onSearch} />
      </div>

      <table>
        <tr>
          <th>Question</th>
          <th>Answer</th>
        </tr>
        <tr>
          <td>sfdsdf</td>
          <td>sdfsdf</td>
        </tr>
        <tr>
          <td>sfdsdf</td>
          <td>sdfsdf</td>
        </tr>
        <tr>
          <td>sfdsdf</td>
          <td>sdfsdf</td>
        </tr>
      </table>
    </div>
  );
}
