import { Table } from "antd";
import { UseDataContext } from "../../context/UseDataContext";
import { formatDateHook } from "../Hooks/FormatDateHook";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render:(date:string)=>(
      <span>{formatDateHook(date)}</span>
    )
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type:string) => (
      <span style={{ textTransform: "capitalize" }}>
        {type}
      </span>
    ),
  },
  {
    title: "Units Sold",
    dataIndex: "unitSold",
    key: "unitSold",
    render: (val:null|number) => (val !== null ? val : "-"),
  },
  {
    title: "Amount Added",
    dataIndex: "amountAdded",
    key: "amountAdded",
    render: (val: null|number) => (val !== null ? val : "-"),
  },
  {
    title: "Balance After",
    dataIndex: "balanceAfter",
    key: "balanceAfter",
  },
];

export const ReadingsTable = () => {
  const {combined, total} = UseDataContext();
  return (
    <div >
     
      <Table
       scroll={{ x: true }}
        columns={columns}
        dataSource={(combined ?? []).map((reading, index) => ({
          key: index,
          ...reading,
        }))}
        pagination={false}

        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4} align="right">
                <strong>Total Balance</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <strong>{total?.[0]?.currentBalance ?? 0}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};
