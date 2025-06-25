import { Col, Row } from "antd"
import { HowItWorksFeatures } from "../../../data"
import { FlatButton } from "../../../shared/FlatButton"

export const HowItWorks = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2>How It Works</h2>
                <p style={{textAlign:'center'}}>Getting your cooking gas delivered has never been easier</p>
                <div className="row">
                    <div className="col-md-5">

                    </div>
                    <div className="col-md-7">
                        <Row gutter={[16,24]}>
                            {
                                HowItWorksFeatures.map((feature, index)=>(
                                    <Col xs={24} sm={24} md={12}>
                                    <div className="aboutcard">
                                        <div>{feature.icon}</div>
                                        <b>{feature.title}</b>
                                        <p>{feature.description}</p>
                                    </div>
                                    </Col>
                                ))
                            }
                        </Row>

                        <div style={{marginTop:'20px'}}>
                            <FlatButton title="Place Your Order Now" onClick={()=>console.log('order')} className="btndark"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}