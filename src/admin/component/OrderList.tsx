import styles from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton"
import { NavLink } from "react-router-dom"
import { UseDataContext } from "../../context/UseDataContext"
export const OrderList = ()=>{
    const {orders} = UseDataContext();
    return(
       
            <>
                <h3>Recent Orders</h3>
                <div className={styles.scrollablediv}>
                {
                    orders && orders.map(order=>(
                        <div key={order._id}>
                            <strong>{order.name}</strong><br/>
                            <small>OrderId: {order._id}</small>
                        </div>
                    ))
                }
                {orders?.length==0 && <small style={{color:"gray"}}>recent orders will display here...</small>}
                </div>
                <div><NavLink to={'/admin_jctbdil1$/manageorders'}><FlatButton title='Manage Orders' className="btndark"/></NavLink></div>
           
            </>
     
    )
}