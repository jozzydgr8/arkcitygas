import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";

export const ReadHooks = ()=>{
    const {dispatch} = UseDataContext();
    const {user} = UseAuthContext();
    const addOpeningReading = async (openingReading: number,  setLoading: React.Dispatch<React.SetStateAction<boolean>>, resetForm: () => void)=>{
       setLoading(true)
        try{

            const result = await fetch('https://arkcityserver.vercel.app/reading',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${user?.token}`,
    
                },
                body:JSON.stringify({openingReading:openingReading})
            });
            if(!result.ok){
                throw Error('error adding reading');
            }
            const json = await result.json();
            dispatch({type:'updateReadings', payload:json});
            resetForm();
            toast.success('Daily Opening reading set successfully');
            window.location.reload();
            setLoading(false);
            
        }catch(error){
            console.error(error);
            toast.error('error setting opening reading');
            setLoading(false);
        }
    }

    const updateClosingReading =async (id:string, closingReading:number, resetForm:()=>void, setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true);    
        try{
                const response = await fetch(`https://arkcityserver.vercel.app/reading/${id}`,{
                    method:'PUT',
                    headers:{
                        "Content-Type":"application/json",
                        'Authorization': `Bearer ${user?.token}`,
                    },
                    body:JSON.stringify({closingReading:closingReading})
                })
                if(!response.ok){
                    throw Error('error adding closing reading');
                }
                const json = await response.json();
                toast.success('success adding closing reading');
                resetForm();
                window.location.reload();
                setLoading(false);
                
            }catch(error){
                console.error(error);
                toast.error('error adding closing reading');
               
                setLoading(false);
            }
        }
    return{addOpeningReading, updateClosingReading}
}