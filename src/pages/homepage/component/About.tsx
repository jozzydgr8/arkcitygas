import { headerFeatures } from "../../../data"

export const About = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Your Trusted Gas Delivery Partner</h2>
                        <p>Arkcity LPG is committed to providing safe, reliable and affordable cooking gas
                            delivery services to homes and businesses across Ikorodu and Lagos.
                        </p>
                        <div style={{display:'flex', flexDirection:'row', gap:'20px'}}>
                            {
                                headerFeatures.slice(0, headerFeatures.length-1).map((feature, index)=>(
                                    <div key={index} className="aboutcard">
                                        <h3>{feature.abouttitle}</h3>
                                        <p>{feature.abbtitle}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <hr/>
                        <div>
                            <em>Eliot Johnson</em> 
                            <div>
                            <h4>Mr. Adekunle Johnson</h4>
                            Operations Manager
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        this will contain image collage
                    </div>
                </div>
            </div>
        </section>
    )
}