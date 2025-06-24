
import { About } from "./component/About"
import { Advertisement } from "./component/Advertisement"
import { Header } from "./component/Header"
import { Product } from "./component/Product"

export const Home = ()=>{
    return(
        <>
        <Header/>
        <Advertisement/>
        <About/>
        <Product/>
        </>
    )
}