
import { Modal, Descriptions, Tag, Typography } from 'antd';
import { FlatButton } from '../../shared/FlatButton';
import { OrderType } from '../../shared/types';
import { useState } from 'react';
import { OrderHooks } from '../Hooks/OrderHooks';
import { SendMessage } from './SendMessage';

const { Text } = Typography;


type modaltype = {
    isOpen:boolean,
    selectedService:OrderType | null
    handleCloseModal:()=>void,



}

export const OrderModal = ({ selectedService, isOpen, handleCloseModal }:modaltype) => {
  const [loading, setLoading] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const {updateOrderStatus} = OrderHooks();
  if (!selectedService) return null;
  

  const {
    name,
    email,
    reference,
    amount,
    orderStatus,
    address,
    phone,
    status,
    _id,
    product,
    category,
    notes
  } = selectedService;

  const getStatusTag = (orderStatus:string) => {
    switch (orderStatus) {
      case 'success':
        return <Tag color="green">Success</Tag>;
      case 'failed':
        return <Tag color="red">Failed</Tag>;
      case 'pending':
        return <Tag color="orange">Pending</Tag>;
      default:
        return <Tag>{orderStatus}</Tag>;
    }
  };

  const getOrderStatusTag = (orderStatus:string) => {
    switch (orderStatus) {
      case 'processing':
        return <Tag color="blue">Processing</Tag>;
      case 'shipped':
        return <Tag color="purple">Shipped</Tag>;
      case 'completed':
        return <Tag color="green">Completed</Tag>;
      case 'pending':
        return <Tag color="orange">Pending</Tag>;
      default:
        return <Tag>{orderStatus}</Tag>;
    }
  };

  return (
    <Modal
      title={`Order: ${name}`}
      open={isOpen}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="orderId">{_id}</Descriptions.Item>
        <Descriptions.Item label="Name">{name}</Descriptions.Item>
        <Descriptions.Item label="product">{product}</Descriptions.Item>
        <Descriptions.Item label="category">{category}</Descriptions.Item>
        <Descriptions.Item label="Email" ><span style={{cursor:"pointer"}} onClick={()=>setOpenMessage(true)}>
          {email}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Phone"><a href={`tel:${phone}`}>{phone}</a></Descriptions.Item>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
        <Descriptions.Item label="Additional Notes">{notes}</Descriptions.Item>
        <Descriptions.Item label="Reference">
          <Text code>{reference}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          <Text strong>₦{amount?.toFixed(2)}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">{getStatusTag(status!)}</Descriptions.Item>
        <Descriptions.Item label="Order Status">{getOrderStatusTag(orderStatus)}</Descriptions.Item>
      </Descriptions>

      <div>
        {orderStatus == 'pending' &&<FlatButton disabled={loading} title='Process Order' className='btndark' onClick={()=>{updateOrderStatus(_id,'processing',setLoading);handleCloseModal()}}/>}
        {orderStatus == 'shipped' && <FlatButton disabled={loading} title='Order Complete' className='btnlight' onClick={()=>{updateOrderStatus(_id, 'complete',setLoading);handleCloseModal()}}/>}
        {orderStatus =='processing' && <FlatButton disabled={loading} title='Ship Order' className='btnlight' onClick={()=>{updateOrderStatus(_id, 'shipped',setLoading);handleCloseModal()}}/>}
      </div>

      <SendMessage selectedEmail={email} isModalOpen={openMessage} setIsModalOpen={setOpenMessage}/>
    </Modal>
  );
};


