import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";

export const ReadHooks = ()=>{
    const {dispatch} = UseDataContext();
    const {user} = UseAuthContext();
    const addDailyReading = async (dailyReading: number,  setLoading: React.Dispatch<React.SetStateAction<boolean>>, resetForm: () => void)=>{
       setLoading(true)
        try{

            const result = await fetch('https://arkcityserver.vercel.app/reading',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${user?.token}`,
    
                },
                body:JSON.stringify({closingReading:dailyReading})
            });
            if(!result.ok){
                throw Error('error adding reading');
            }
            const json = await result.json();
            dispatch({type:'updateCombined',payload:json})
            resetForm();
            toast.success('Daily Opening reading set successfully');
        }catch(error){
            console.error( error);
            toast.error('error setting daily reading');
            
        }finally{
        setLoading(false);
        window.location.reload();
        }
    }

    const addRefill =async ( refill:number, resetForm:()=>void, setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true);    
        try{
                const response = await fetch(`https://arkcityserver.vercel.app/reading_refill`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user?.token}`,
                    },
                    body:JSON.stringify({refill})
                })
                if(!response.ok){
                    throw Error('error adding refill');
                }
                const json = await response.json();
                toast.success('success adding refill');
                resetForm();
                dispatch({type:'updateCombined',payload:json})
                
               
                
            }catch(error){
                console.error(error);
                toast.error('error adding refill');
            }finally{
                 setLoading(false);
                 window.location.reload();
            }
        }
    return{addDailyReading, addRefill}
}