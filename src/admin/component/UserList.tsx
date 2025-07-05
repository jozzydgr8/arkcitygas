import { subscribers } from "../../data"
import style from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton"
import { useState } from "react";
import { SendMessage } from "../Modals/SendMessage";

export const UserList = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const selectedEmail = subscribers.map(email=>email.email)

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
            <div><FlatButton title='Send News Letter' className="btndark"onClick={()=>setIsModalOpen(true)}/></div>

            <SendMessage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEmail={selectedEmail}/>
        </>
    )
}