import { subscribers } from "../../data"
import style from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton"

export const UserList = ()=>{
    return(
        <>
            <h3>Subscribers</h3>
            
            <div className={style.scrollablediv}>
                {
                subscribers.map(user=>(
                    <div key={user.id}>
                        <strong>{user.email}</strong>

                    </div>
                ))
                }
            </div>
            <div><FlatButton title='Send News Letter' className="btndark"/></div>
        </>
    )
}