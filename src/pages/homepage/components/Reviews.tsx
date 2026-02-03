import Marquee from "react-fast-marquee"
import { reviews } from "../../../data"
import { Rate } from "antd"
import {UserOutlined} from '@ant-design/icons'


export const Reviews = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2 className="animate-down">What Our customers say</h2>
                <p style={{textAlign:"center"}}>Don't just take our word for it - hear from our satisfied customers</p>
                {
                    <Marquee>
                        {reviews.map((review, index)=>(
                            <div className="aboutcard" style={{maxWidth:'400px'}} key={index}>
                
                                <p><q>{review.description}</q></p>
                                <hr/>
                                <div style={{display:"flex", flexDirection:"row", alignItems:'center', gap:'10px'}}>

                                    {review.image? <img style={{height:'100px', width:'100px', borderRadius:'100%'}} src={`${review.image}`}/> :
                                     <div><UserOutlined className="headericons"/></div>}
                                   
                                    <div>
                                        <h4>{review.fullName}</h4>
                                        <small>{review.status}</small>
                                        <div>
                                            <Rate  disabled defaultValue={review.rating}/>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                }
                
            </div>
        </section>
    )
}