import { NavLink } from "react-router-dom"
import { FlatButton } from "../../shared/FlatButton"
import styles from '../admin.module.css'
import {PlusOutlined} from '@ant-design/icons'
import Marquee from "react-fast-marquee"
import { UseDataContext } from "../../context/UseDataContext"
const Style = {
    productbackground:{
        backgroundRepeat:'no-repeat', 
        backgroundSize:'contain',
        height:'100px'
    }
}
export const ProductList = ()=>{
    const {product} = UseDataContext();
    return(
        <>
        <Marquee>
            
            {
            product && product.map((product, index)=>(
                <div key={index} >
                    <div className={styles.productcontainer}>
                        <div style={{background:`url(${product?.imagePath})`, ...Style.productbackground }} >

                        </div>
                        <strong>
                            {product.title}
                        </strong>
                        <div>
                            <NavLink to={`/admin_jctbdil1$/product/${product._id}`}><FlatButton title="View Product" className="btndark"/></NavLink>
                        </div>
                    </div>
                   
                </div>
            ))
            }

        </Marquee>
        
        <div>
            <NavLink to={'/admin_jctbdil1$/product/addproduct'}>
            <FlatButton className="btnlight" icon={<PlusOutlined/>}>
                Add New Product 
            </FlatButton>
            </NavLink>
        </div>
        </>
    )
}