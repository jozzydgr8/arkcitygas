import { Col, Row } from "antd"
import { FlatButton } from "../../../shared/FlatButton"
import { headerFeatures } from "../../../data"

export const Choose = ()=>{
    return(
        <section>
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-6">
                        <h3>Why Choose Arkcity LPG</h3>
                        <div>
                        <p>
                        We're not just another gas delivery service. Our commitment to safety reliability and
                        customer satisfaction sets us apart in the industry. With <a>DPR</a> and <a>SON</a> certifications.
                        You can trust that you're getting the highest quality LPG products and service.
                        </p>
                        <div>
                            <FlatButton className="btndark" title="Learn More About Us"/>
                            <FlatButton title="Contact Us" className="btnlight"/>
                        </div>
                        </div>


                    </div>

                    <div className="col-md-6">
                        <Row gutter={[16, 24]}>
                            {
                                headerFeatures.map((feature, index)=>(
                                    <Col md={12} sm={24} xs={24}>
                                        <div className="aboutcard" style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                                            <div>{feature.icon}</div>
                                            <h3>{feature.title}</h3>
                                            <p>{feature.subtitle}</p>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                </div>
                <div style={{textAlign:'center', padding:'7% 0'}}>
                    <h2>Ready to Order your Cooking Gas?</h2>
                    <p>Experience the conveninece of fast, safe and affordable gas delivery straight to your doorstep.</p>
                    <div>
                        <FlatButton title="Order Now" className="btndark"/>  
                         <a href="tel:+2348123456789">
                            Call+234 812 345 6789
                         </a>
                    </div>
                </div>
            </div>
        </section>
    )
}