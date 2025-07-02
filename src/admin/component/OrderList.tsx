import { orders } from "../../data"
import styles from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton"
import { NavLink } from "react-router-dom"
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
                <div><NavLink to={'/admin_jctbdil1$/manageorders'}><FlatButton title='Manage Orders' className="btndark"/></NavLink></div>
            </>
     
    )
}