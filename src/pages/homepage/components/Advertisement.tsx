import { adItems } from "../../../data"
import { FlatButton } from "../../../shared/FlatButton"

export const Advertisement = ()=>{
    return(
        <section id="advert">
            <div>
                <div className="row">
                    { adItems.map((item, index) => (
                        <div className="col-md-4" key={index}>
                        <div className="advert-box animate-up" >
                            <div className="adverthighlight">{item.label}</div>
                            <p>{item.text}</p>
                            {item.button.show && (
                            <a href={item.link} target={item?.target}><FlatButton className="btnalternate" title={item.button.title} /></a>
                            )}
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}