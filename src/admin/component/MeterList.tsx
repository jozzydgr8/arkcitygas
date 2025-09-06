import styles from '../admin.module.css'
import { demoReadings } from '../../data'
import { NavLink } from 'react-router-dom'
import { FlatButton } from '../../shared/FlatButton'
export const MeterList = ()=>{
    return(
        <>
            <h3>Daily Meter Readings</h3>
            <div className={styles.scrollablediv}>
                {
                    demoReadings.map((reading, index) => (
                        <div key={index} className={styles.readingItem}>
                            <span>{reading.date}</span><br/>
                            <strong>Opening: </strong><span>{reading.openingReading}</span><br/>
                            <strong>Recorded by: </strong><span>{reading.openingrecordedBy}</span><br/>
                            <strong>Closing: </strong><span>{reading.closingReading}</span><br/>
                            <strong>Recorded by: </strong><span>{reading.closingrecordedBy}</span>
                        </div>
                    ))
                }
            </div>
            <div>
                <NavLink to='/admin_jctbdil1$/meterreading' ><FlatButton className='btndark' title='View Readings'/></NavLink>
            </div>
        </>
    )
}