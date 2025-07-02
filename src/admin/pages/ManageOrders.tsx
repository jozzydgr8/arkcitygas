import { Badge } from "antd"
import { orders } from "../../data"
import {RightOutlined} from '@ant-design/icons'
import Style from '../admin.module.css'

const statusMap: Record<string, "success" | "processing" | "default" | "error" | "warning"> = {
  completed: 'success',
  pending: 'processing',
  shipped: 'default',
};
export const ManageOrders = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2>Manage Orders</h2>
                <div>
                    {
                        orders.map(order=>(
                            <div key={order.id} className={Style.ordercontainer}>
                                <div style={{display:"flex",alignItems:"center", justifyContent:'space-between'}}>
                                    <div>
                                        <strong>Order By</strong>: {order.name}<br/>
                                        <small>OrderId: {order.id}</small><br/>
                                        {order.status} <Badge status={statusMap[order.status] || 'default'}
                                        />
                                    </div>
                                    <RightOutlined/>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}