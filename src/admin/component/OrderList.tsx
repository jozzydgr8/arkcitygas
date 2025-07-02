import { orders } from "../../data"
import styles from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton"
export const OrderList = ()=>{
    return(
       
            <>
                <h3>Recent Orders</h3>
                <div className={styles.scrollablediv}>
                {
                    orders.map(order=>(
                        <div key={order.id}>
                            <strong>{order.name}</strong><br/>
                            <small>OrderId: {order.id}</small>
                        </div>
                    ))
                }
                </div>
                <div><FlatButton title='Manage Orders' className="btndark"/></div>
            </>
     
    )
}