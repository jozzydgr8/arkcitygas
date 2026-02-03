
import Footer from "../../shared/Footer"
import { About } from "./components/About"
import { Advertisement } from "./components/Advertisement"
import { Choose } from "./components/Choose"
import { Header } from "./components/Header"
import { HowItWorks } from "./components/HowItWorks"
import { Product } from "./components/Product"
import { Reviews } from "./components/Reviews"

export const Home = ()=>{
    return(
        <>
        <Header/>
        <Advertisement/>
        <About/>
        <Product/>
        <HowItWorks/>
        <Reviews/>
        <Choose/>
        <Footer/>
        </>
    )
}