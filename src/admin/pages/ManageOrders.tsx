import { Badge, Select } from "antd";
import { RightOutlined } from '@ant-design/icons';
import Style from '../admin.module.css';
import { useState } from "react";
import { FlatButton } from "../../shared/FlatButton";
import { OrderModal } from "../Modals/OrderModal";
import { UseDataContext } from "../../context/UseDataContext";
import { OrderType } from "../../shared/types";

const { Option } = Select;

const statusMap: Record<string, "success" | "processing" | "default" | "error" | "warning"> = {
  completed: 'success',
  pending: 'processing',
  shipped: 'default',
  processing:'default',
  success:'success'
};



export const ManageOrders = () => {
  const {orders} = UseDataContext();
  const [filterStatus, setFilterStatus] = useState("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<OrderType | null>(null);

  const filteredOrders = orders?.filter(order => order.orderStatus === filterStatus);

  const handleOpenModal = (service:OrderType) => {
          setSelectedService(service);
          setIsOpen(true);
        };
      
        const handleCloseModal = () => {
          setIsOpen(false);
          setSelectedService(null);
        };

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
            <Option value="processing">processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="completed">Completed</Option>
            
          </Select>
        </div>

        {/* Order List */}
        <div>
          {filteredOrders?.map(order => (
            <div key={order._id} className={Style.ordercontainer}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                <div>
                  <strong>Order By</strong>: {order.name}<br />
                  <small>OrderId: {order._id}</small><br />
                  Order Status: {order.orderStatus} <Badge status={statusMap[order.orderStatus] || 'default'} /><br/>
                  Payment Status: {order.status} <Badge status={statusMap[order.status] || 'default'} />
                  
                </div>
                
                <FlatButton icon={<RightOutlined />} onClick={() => handleOpenModal(order)}/>
              </div>
            </div>
          ))}
        </div>

        <OrderModal
        isOpen={isOpen}
        selectedService={selectedService}
        handleCloseModal={handleCloseModal}/>
      </div>
    </section>
  );
};
