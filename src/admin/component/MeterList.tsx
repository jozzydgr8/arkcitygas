import styles from '../admin.module.css'
import { NavLink } from 'react-router-dom'
import { FlatButton } from '../../shared/FlatButton'
import { UseDataContext } from '../../context/UseDataContext'
export const MeterList = ()=>{
    const{readings} = UseDataContext()
    return(
        <>
            <h3>Daily Meter Readings</h3>
            <div className={styles.scrollablediv}>
                {
                    readings && readings.map((reading, index) => (
                        <div key={index} className={styles.readingItem}>
                            <span>{reading.createdAt}</span><br/>
                            <strong>Opening: </strong><span>{reading.openingReading}</span><br/>
                      
                            <strong>Closing: </strong><span>{reading.closingReading}</span><br/>
                           
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