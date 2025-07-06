import { Select } from "antd"
import { useState } from "react"
import { UseDataContext } from "../../context/UseDataContext";
import Style from '../admin.module.css';


const { Option } = Select;
export const AdminRequest = ()=>{
    const [filterStatus, setFilterStatus] = useState(true);
    const {admin} = UseDataContext()

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
                    <Option value='false'>Requesting admin</Option>

                </Select>
                {
                    filteredAuth?.map(data=>(
                        <div key={data._id} className={Style.ordercontainer}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                <div>
                                    <strong>Name</strong>: {data.email}<br />
                                    <strong>Admin</strong>: {data.admin?.toString()}<br />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}