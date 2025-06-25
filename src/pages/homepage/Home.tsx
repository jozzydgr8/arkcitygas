
import { About } from "./component/About"
import { Advertisement } from "./component/Advertisement"
import { Header } from "./component/Header"
import { HowItWorks } from "./component/HowItWorks"
import { Product } from "./component/Product"
import { Reviews } from "./component/Reviews"

export const Home = ()=>{
    return(
        <>
        <Header/>
        <Advertisement/>
        <About/>
        <Product/>
        <HowItWorks/>
        <Reviews/>
        </>
    )
}