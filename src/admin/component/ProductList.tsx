import { NavLink } from "react-router-dom"
import { productItems } from "../../data"
import { FlatButton } from "../../shared/FlatButton"
import styles from '../admin.module.css'
import {PlusOutlined} from '@ant-design/icons'
import Marquee from "react-fast-marquee"
const Style = {
    productbackground:{
        backgroundRepeat:'no-repeat', 
        // backgroundPosition:'center center', 
        backgroundSize:'contain',
          height:'100px'
    }
}
export const ProductList = ()=>{
    return(
        <>
        <Marquee>
            
            {
            productItems.map((product, index)=>(
                <div key={index} >
                    <div className={styles.productcontainer}>
                        <div style={{background:`url(${product.image})`, ...Style.productbackground }} >

                        </div>
                        <strong>
                            {product.title}
                        </strong>
                        <div>
                            <FlatButton title="View Product" className="btndark"/>
                        </div>
                    </div>
                   
                </div>
            ))
            }

        </Marquee>
        
        <div>
            <NavLink to={'/'}>
            <FlatButton className="btnlight" icon={<PlusOutlined/>}>
                Add New Product 
            </FlatButton>
            </NavLink>
        </div>
        </>
    )
}