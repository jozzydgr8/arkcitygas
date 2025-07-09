import { Popconfirm, Select } from "antd"
import { useState } from "react"
import { UseDataContext } from "../../context/UseDataContext";
import Style from '../admin.module.css';
import { FlatButton } from "../../shared/FlatButton";
import { AdminHook } from "../Hooks/AdminHook";
import { UseAuthContext } from "../../context/UseAuthContext";


const { Option } = Select;
export const AdminRequest = ()=>{
    const [filterStatus, setFilterStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [password, setPassword] = useState({password:"", newPassword:''});
    const {admin} = UseDataContext();
    const {user} = UseAuthContext();
    const {makeAdmin, createAdmin, deleteAdmin, updatePassword} = AdminHook();
    const [loading, setLoading] = useState(false)

    const filteredAuth = admin?.filter(admin => admin.admin == filterStatus)
    return(
        <section>
            <div className="container-fluid">
                <h2>Admin Users </h2>
                <Select
                value={filterStatus.toString()}
                onChange={value => setFilterStatus(value === 'true')}
                style={{ width: 200 }}
                >
                    <Option value='true'> Accepted Admin </Option>
                    <Option value='false'>Make Admin</Option>

                </Select>
                {
                    filteredAuth?.map(data=>(
                        <div key={data.email} className={Style.ordercontainer}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                <div>
                                    <strong>Name</strong>: {data.email}<br />
                                    <strong>Admin</strong>: {data.admin?.toString()}<br />
                                    
                                </div>
                                <div>
                                    {
                                        !data.admin && <FlatButton disabled={loading} title="Make Admin" className="btndark" onClick={()=>makeAdmin(data.email, setLoading)}/>
                                    } {user?.email !== data.email && (
                                        <Popconfirm
                                        title="Are you sure to delete this user?"
                                        description="This action cannot be undone."
                                        onConfirm={() => deleteAdmin(data.email, setLoading)}
                                        okText="Yes, delete"
                                        cancelText="Cancel">
                                            <span>
                                                <FlatButton disabled={loading}  title="Delete User" className="btnlight"/>
                                            </span>
                                        </Popconfirm>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="row">
                    <div className="col-md-6">
                    <div className={Style.ordercontainer}>
                    <h2>Create a New User</h2>
                    <div>
                        <input onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Input Email to create account"
                        style={{
                            background:'none', 
                            width:"100%", 
                            border:"solid 1px ", 
                            padding:"16px", 
                            borderRadius:"10px"}}/>
                            
                        <div>
                            <FlatButton disabled={loading}  title="Create Account" className="btndark" onClick={()=>createAdmin(email, setLoading)}/>
                        </div>
                        <small>Once account created you need to refresh to see admin</small>
                    </div>
                </div>
                    </div>
                    <div className="col-md-6">
                        <div className={Style.ordercontainer}>
                            {/* reset password area */}
                            <h2>Reset password</h2>
                            <div>
                                <div >
                                <input onChange={(e)=>setPassword({...password,password:e.target.value})}
                                placeholder="Input previous password"
                                style={{
                                    background:'none', 
                                    width:"100%", 
                                    border:"solid 1px ", 
                                    padding:"16px", 
                                    borderRadius:"10px"}}/>
                                </div>
                                <br/>
                                <div>
                                    <input onChange={(e)=>setPassword({...password,newPassword:e.target.value})}
                                        placeholder="Input new password"
                                        style={{
                                            background:'none', 
                                            width:"100%", 
                                            border:"solid 1px ", 
                                            padding:"16px", 
                                            borderRadius:"10px"}}/>
                                </div>
                                    
                                <div>
                                    <FlatButton disabled={loading}  title="Update Password" className="btndark" onClick={()=>updatePassword(password, setLoading)}/>
                                </div>
                                <small>password would be reset</small>
                            </div>
                        
                        </div>

                        </div>
                </div>

                {/* create new user section */}
                

                
            </div>
        </section>
    )
}