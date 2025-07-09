
import style from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton"
import { useState } from "react";
import { SendMessage } from "../Modals/SendMessage";
import { UseDataContext } from "../../context/UseDataContext";

export const UserList = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {subscribers} = UseDataContext();
    const selectedEmail = subscribers?.map(email=>email.email)

    return(
        <>
            <h3>Subscribers</h3>
            
            <div className={style.scrollablediv}>
                {
                subscribers?.map(user=>(
                    <div key={user._id}>
                        <strong>{user.email}</strong>

                    </div>
                ))
                }
                {subscribers?.length==0 && <small style={{color:"gray"}}>emails subscribed to news letter will show here...</small>}
            </div>
            <div><FlatButton title='Send News Letter' className="btndark"onClick={()=>setIsModalOpen(true)}/></div>

            <SendMessage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEmail={selectedEmail || []}/>

            
        </>
    )
}