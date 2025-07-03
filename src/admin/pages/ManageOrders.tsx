import { Badge, Select } from "antd";
import { orders } from "../../data";
import { RightOutlined } from '@ant-design/icons';
import Style from '../admin.module.css';
import { useState } from "react";

const { Option } = Select;

const statusMap: Record<string, "success" | "processing" | "default" | "error" | "warning"> = {
  completed: 'success',
  pending: 'processing',
  shipped: 'default',
};

export const ManageOrders = () => {
  const [filterStatus, setFilterStatus] = useState("pending");

  const filteredOrders = orders.filter(order => order.status === filterStatus);

  return (
    <section>
      <div className="container-fluid">
        <h2>Manage Orders</h2>

        {/* Dropdown filter */}
        <div style={{ marginBottom: '16px' }}>
        <h3>View Order</h3>
          <Select 
            defaultValue="pending" 
            onChange={value => setFilterStatus(value)} 
            style={{ width: 200 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="shipped">Shipped</Option>
          </Select>
        </div>

        {/* Order List */}
        <div>
          {filteredOrders.map(order => (
            <div key={order.id} className={Style.ordercontainer}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                <div>
                  <strong>Order By</strong>: {order.name}<br />
                  <small>OrderId: {order.id}</small><br />
                  {order.status} <Badge status={statusMap[order.status] || 'default'} />
                </div>
                <RightOutlined />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
