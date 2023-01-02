import { Input, Table } from "antd";
import "./styles.css";
import useFlexSearch from "./hooks/useFlexSearch";

export default function App() {
  const { onSearch, result } = useFlexSearch({
    limit: 40,
  });

  const dataSource = result.map((item) => ({
    key: item.id,
    q: item.doc.q,
    a: item.doc.a,
  }));

  const tableColumn = [
    {
      title: "Question",
      dataIndex: "q",
      width: "70%",
    },
    {
      title: "Answer",
      dataIndex: "a",
    },
  ];

  return (
    <div className="App">
      <h1>ROK Peerless Scholar</h1>
      <div className="search_container">
        <Input
          placeholder="Search anything..."
          allowClear
          onChange={onSearch}
        />
      </div>
      <Table
        className="table_container"
        columns={tableColumn}
        dataSource={dataSource}
      />
    </div>
  );
}
