import styles from '../admin.module.css'
import { NavLink } from 'react-router-dom'
import { FlatButton } from '../../shared/FlatButton'
import { UseDataContext } from '../../context/UseDataContext'
import { formatDateHook } from '../Hooks/FormatDateHook'
export const MeterList = ()=>{
    const{combined} = UseDataContext()
    return(
        <>
            <h3>Daily Meter Readings</h3>
            <div className={styles.scrollablediv}>
                {
                    combined && combined.map((combine, index) => (
                        <div key={index} className={styles.readingItem}>
                            <span>{formatDateHook(combine.date)}</span><br/>
                            
                            {
                                combine.type == 'refill'? <>
                                <strong>{combine.type} </strong><span>{combine.amountAdded}</span><br /></>:
                                <><strong>{combine.type} </strong><span>{combine.unitSold}</span><br/></>
                            }
                            
                      
                           
                        </div>
                    ))
                }
                {combined?.length==0 && <small style={{color:"gray"}}>recent orders will display here...</small>}
            </div>
            <div>
                <NavLink to='/admin_jctbdil1$/meterreading' ><FlatButton className='btndark' title='View Readings'/></NavLink>
            </div>
        </>
    )
}