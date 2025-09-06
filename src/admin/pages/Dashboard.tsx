import { MeterList } from "../component/MeterList"
import { OrderList } from "../component/OrderList"
import { ProductList } from "../component/ProductList"
import { UserList } from "../component/UserList"

export const Dashboard = ()=>{
    return(

        <>   
        <section>
            <div className="container-fluid">
                <h2>Dashboard</h2>
                {/* ?//first dashboard grid */}
                <div className="row">

                    <div className="col-md-6">
                        <OrderList/>
                    </div>
                    <div className="col-md-6">
                        <UserList/>
                    </div>
                    <div className="col-md-6">
                        <MeterList/>
                    </div>
                </div>

                {/* product grid probably a marquee */}
                <ProductList/>
            </div>
        </section>
        
        </>
    )
}