import { Table } from "antd";
import { demoReadings } from "../../data";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
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
  return (
    <div >
     
      <Table
        columns={columns}
        dataSource={demoReadings.map((reading, index) => ({
          key: index,
          ...reading,
        }))}
        pagination={false}
      />
    </div>
  );
};
