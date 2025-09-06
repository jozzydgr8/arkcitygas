import { demoReadings } from "../../data"
import Style from '../admin.module.css'
import { DownloadCSVButton } from "../component/DownloadCSVButton"
import { ReadingForm } from "../component/ReadingForm"
import { ReadingsTable } from "../component/ReadingsTable"

export const MeterReading = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2>Meter Reading</h2>
                <div className="row">
                    <div className="col-md-7">
                    
                    <div className={Style.meterscrollable}>
                        <ReadingsTable/>
                        <DownloadCSVButton/>
                    </div>
                    </div>
                    <div className="col-md-5">
                        <div className={Style.ordercontainer}>
                            <ReadingForm/>
                        </div>
                    </div>
                </div>
               
            </div>
        </section>
    )
}