import { useNavigate, useParams } from "react-router-dom"
import { ProductList } from "../component/ProductList"
import { Popconfirm } from "antd";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import Style from '../admin.module.css'
import { FlatButton } from "../../shared/FlatButton";
import { useEffect, useState } from "react";
import { UpdateProduct } from "../Modals/UpdateProduct";
import { UseDataContext } from "../../context/UseDataContext";
import { ProductHooks } from "../Hooks/ProductHooks";

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
    const {product} = UseDataContext();
    const {deleteProduct} = ProductHooks();
    const navigate = useNavigate();
    const data = product?.find(product=>product._id.toString().toLocaleLowerCase() === id?.toLocaleLowerCase());
   useEffect(() => {
    if (!data) {
        navigate('/admin_jctbdil1$');
    }
}, [data, navigate]);

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
                            <div style={{backgroundImage:`url(${data?.imagePath})`, ...styles.backgroundImage}}></div>
                         
                        </div>
                        {/* //texts descriptions */}
                        <strong>
                            {data?.title} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/>
                        </strong><br/>

                        <small>{data?.category} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/></small>

                        <p>{data?.description} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/></p>

                        <p>₦{data?.cost} <FlatButton onClick={()=>setIsOpen(true)} icon={<EditOutlined/>}/></p>

                        <div>
                           <Popconfirm
                            title="Are you sure to delete this product?"
                            description="This action cannot be undone."
                            onConfirm={() => deleteProduct(data?._id!)}
                            okText="Yes, delete"
                            cancelText="Cancel"
                            >
                            <span>
                                <FlatButton
                                className="btndark"
                                title="Delete Product"
                                icon={<DeleteOutlined />}
                            />
                            </span>
                            </Popconfirm>

                        </div>
                        </>
                    }
                </div>
                <ProductList/>
                <UpdateProduct isOpen={isOpen} handleCloseModal={handleCloseModal} 
                title={data?.title!} 
                cost={data?.cost!} 
                _id={data?._id!}
                description={data?.description!}
                category={data?.category!}
                imagePath={data?.imagePath!}/>
            </div>
        </section>
    )
}