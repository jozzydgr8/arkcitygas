import { Col, Row } from "antd"
import { FlatButton } from "../../../shared/FlatButton"
import { headerFeatures } from "../../../data"

export const Choose = ()=>{
    return(
        <section>
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="animate-down">Why Choose Arkcity LPG</h3>
                        <div>
                        <p>
                        We're not just another gas delivery service. Our commitment to safety reliability and
                        customer satisfaction sets us apart in the industry. With <a href="https://www.nuprc.gov.ng/" target="_blank" rel="noreferrer">DPR</a> and <a href="https://son.gov.ng/" target="_blank" rel="noreferrer">SON</a> certifications.
                        You can trust that you're getting the highest quality LPG products and service.
                        </p>
                        <div>
                            <a href="https://wa.link/6hbzdj" target="_blank" rel="noreferrer">
                            <FlatButton className="btndark" title="Learn More About Us"/>
                            </a>
                            <a href="https://wa.link/6hbzdj" target="_blank" rel="noreferrer">
                             <FlatButton title="Contact Us" className="btnlight"/>
                            </a>
                            
                           
                        </div>
                        </div>


                    </div>

                    <div className="col-md-6">
                        <Row gutter={[16, 24]}>
                            {
                                headerFeatures.map((feature, index)=>(
                                    <Col md={12} sm={24} xs={24}>
                                        <div className="aboutcard animate-up" style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
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
                    <h2 className="animate-down">Ready to Order your Cooking Gas?</h2>
                    <p>Experience the conveninece of fast, safe and affordable gas delivery straight to your doorstep.</p>
                    <div className="animate-up">
                        <a href="/#product" target="_blank">
                        <FlatButton title="Order Now" className="btndark"/> 
                        </a>
                         
                         <a href="tel:08138621241">
                            Call+234 813 8621 241
                         </a>
                    </div>
                </div>
            </div>
        </section>
    )
}