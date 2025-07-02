import { Outlet } from "react-router-dom"
import { OffcanvasNavbar } from "../shared/OffcanvasNavbar"

export const Main = ()=>{
    return(
        <>
        <OffcanvasNavbar/>
        <div style={{marginTop:"90px"}}>
            <Outlet/>
        </div>
        </>
    )
}