import { useParams } from "react-router-dom"
import { ProductList } from "../component/ProductList"
import { productItems } from "../../data";
import {EditOutlined} from '@ant-design/icons'
import Style from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton";
import { useState } from "react";
import { UpdateProduct } from "../Modals/UpdateProduct";

const styles = {
    backgroundImage:{
        height:'200px',
        backgroundRepeat:'no-repeat',
        backgroundSize:'contain'
    }
}

export const DashboardProduct = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const {id} = useParams();
    const data = productItems.find(product=>product.id.toString().toLocaleLowerCase() === id?.toLocaleLowerCase());

    const handleCloseModal = () => {
        setIsOpen(false);
      };
    
    return(
        <section>
            <div className="container-fluid">
                <div className={Style.dashboardproductcontainer}>
                    
                    {
                        <>
                       
                        <div>
                            <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/>
                            <div style={{backgroundImage:`url(${data?.image})`, ...styles.backgroundImage}}></div>
                         
                        </div>
                        {/* //texts descriptions */}
                        <strong>
                            {data?.title} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/>
                        </strong><br/>

                        <small>{data?.category} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/></small>

                        <p>{data?.description} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/></p>

                        <p>{data?.price} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/></p>
                        </>
                    }
                </div>
                <ProductList/>
                <UpdateProduct isOpen={isOpen} handleCloseModal={handleCloseModal} 
                title={data?.title!} 
                price={data?.price!} 
                description={data?.description!}
                category={data?.category!}
                image={data?.image!}/>
            </div>
        </section>
    )
}