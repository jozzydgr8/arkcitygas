import { headerFeatures } from "../../../data";
import { FlatButton } from "../../../shared/FlatButton";
import gasbackground from '../../../assets/gascylinderbackground.jpg'
import Navbar from "../../../shared/Navbar";
import { useEffect } from "react";

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
    useEffect(()=>{
        var container = document.querySelectorAll('.headerUp');
        var containerDown = document.querySelectorAll('.headerDown');
        container.forEach(container=>container?.classList.add('sectionAnimationUp'));
        containerDown.forEach(containerDown=> containerDown?.classList.add('sectionAnimationDown'))
       
    },[])

    return(
        <section style={styles.section}>
            <Navbar/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 headerDown">
                        <h1 >Fast, Safe & Affordable Cooking Gas Delivery at Your Request</h1>
                        <p >Get your LPG cylinder refilled and delivered to your doorstep within hours.
                            Certified by DPR and <a href="https://son.gov.ng/" target="_blank" rel="noreferrer">SON</a> for your safety.
                        </p>
                        <div className="headerUp">
                            <a href="/#product"><FlatButton title="Order Now" className="btndark"/></a><br/>
                            
                             <a href="tel:08138621241" target="_blank" rel="noreferrer">Call Us Now</a>

                        </div>
                       
                    </div>


                     <div className="col-md-6 headerUp">
                        <div className="row">
                        <h3 >Why Choose Arkcity?</h3>
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