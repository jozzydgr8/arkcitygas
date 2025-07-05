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
  const {orders, searchQuery, dispatch} = UseDataContext();
  const [filterStatus, setFilterStatus] = useState("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<OrderType | null>(null);

const normalizedSearchQuery = searchQuery?.trim().toLowerCase();

const isSearching = !!normalizedSearchQuery;

const filteredOrders = orders?.filter(order => {
  if (isSearching) {
    return order._id?.toString().toLowerCase() == normalizedSearchQuery;
  }
  return order.orderStatus === filterStatus;
});


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
        {isSearching && <h4 style={{textAlign:"center"}}>Order search for OrderId: {searchQuery}</h4>}

        {/* Dropdown filter */}
        <div style={{ marginBottom: '16px' }}>
        <h3>View Order</h3>
          {!isSearching && (
            <Select
              value={filterStatus}
              onChange={value => setFilterStatus(value)}
              style={{ width: 200 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="complete">Completed</Option>
            </Select>
          )}
        </div>

        {/* Order List */}
        <div>
          {filteredOrders?.map(order => (
            
            <div key={order._id} className={Style.ordercontainer}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                <div>
                  <strong>Order By</strong>: {order.name}<br />
                  <strong>OrderId:</strong>: {order._id}<br />
                  <strong>Order Status: </strong>{order.orderStatus} <Badge status={statusMap[order.orderStatus] || 'default'} /><br/>
                  <strong>Payment Status: </strong>{order.status} <Badge status={statusMap[order.status] || 'default'} />
                  
                </div>
                
                <FlatButton icon={<RightOutlined />} onClick={() => handleOpenModal(order)}/>
              </div>
            </div>
          ))}

          {filteredOrders?.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              {isSearching ? "No such order found." : "No orders in this category."}
            </p>
          )}
        </div>











        <OrderModal
        isOpen={isOpen}
        selectedService={selectedService}
        handleCloseModal={handleCloseModal}/>
        {isSearching && (
        <FlatButton className="btndark"  title='clear search'onClick={() => {
          dispatch({type:'searchQuery', payload:null})
        }}/>
         
       
      )}

      </div>
    </section>
  );
};
