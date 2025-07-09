import { headerFeatures } from "../../../data";
import { FlatButton } from "../../../shared/FlatButton";
import gasbackground from '../../../assets/gascylinderbackground.jpg'
import Navbar from "../../../shared/Navbar";

const styles = {
    content:{
        display:'flex',
        margin:'15px 0',
        gap:'10px'
    },
    section:{
        backgroundImage:`url(${gasbackground})`,
        backgroundSize:'cover',
        backgroundPosition:'center center',
        color:`white`,
        minHeight:'80vh'
    }
}
export const Header = ()=>{
    return(
        <section style={styles.section}>
            <Navbar/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Fast, Safe & Affordable Cooking Gas Delivery in Ikorodu</h1>
                        <p>Get your LPG cylinder refilled and delivered to your doorstep within hours.
                            Certified by DPR and SON for your safety.
                        </p>
                        <div>
                            <a href="/#product"><FlatButton title="Order Gas Now" className="btndark"/></a>
                            
                            

                        </div>
                        <a href="tel:08138621241" target="_blank">Call Us Now</a>
                    </div>


                     <div className="col-md-6">
                        <div className="row">
                        <h3>Why Choose Arkcity?</h3>
                        {headerFeatures.map((feature, index) => (
                        <div key={index} className="col-md-6" style={{...styles.content, flexDirection:'row'}}>
                            {feature.icon}
                            <div>
                            <b>{feature.title}</b>
                            <br />
                            {feature.subtitle}
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}