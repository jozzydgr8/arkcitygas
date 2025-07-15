import { Col, Row } from "antd"
import { headerFeatures, aboutFeatures } from "../../../data"

export const About = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Your Trusted Gas Delivery Partner</h2>
                        <p>Arkcity LPG is committed to providing safe, reliable and affordable cooking gas
                            delivery services to homes and businesses conveniently
                        </p>
                        <Row gutter={[16,24]}>
                            {
                                headerFeatures.slice(0, headerFeatures.length-1).map((feature, index)=>(
                                    <Col xs={24} md={8} sm={12} key={index}>
                                        <div  className="aboutcard" style={{textAlign:"center"}}>
                                        <h3>{feature.abouttitle}</h3>
                                        <p>{feature.abbtitle}</p>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                        <hr/>
                        <div>
                            <em>Eliot Johnson</em> 
                            <div>
                            <h4>Mr. Adekunle Johnson</h4>
                            <small>Operations Manager</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="image-container">
                        <div className="top-box"></div>
                        <div className="bottom-box"></div>
                        </div>

                    </div>
                </div>


                <div>
                    <Row gutter={[16,24]}>
                        {aboutFeatures.map((feature, index)=>(
                            <Col xs={24} sm={12} md={8}>
                            <div className="aboutcard">
                                <div>{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </section>
    )
}