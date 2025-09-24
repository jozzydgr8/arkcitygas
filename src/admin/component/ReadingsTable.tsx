import { Table } from "antd";
import { UseDataContext } from "../../context/UseDataContext";

const columns = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
  },
  {
    title: "Opening Reading",
    dataIndex: "openingReading",
    key: "openingReading",
  },
  {
    title: "Closing Reading",
    dataIndex: "closingReading",
    key: "closingReading",
  },
];

export const ReadingsTable = () => {
  const {readings} = UseDataContext();
  return (
    <div >
     
      <Table
        columns={columns}
        dataSource={(readings ?? []).map((reading, index) => ({
          key: index,
          ...reading,
        }))}
        pagination={false}
      />
    </div>
  );
};
