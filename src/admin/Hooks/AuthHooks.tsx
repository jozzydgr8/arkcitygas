import { toast } from "react-toastify";
import { UseAuthContext } from "../../context/UseAuthContext";

export const AuthHooks = ()=>{
    const {dispatch} = UseAuthContext();
    type signinProps={
        email:string,
        password:string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    }
    const signInWithEmailAndPassword = async({email, password, setLoading}:signinProps)=>{
        setLoading(true);
        try{
            const response = await fetch('https://arkcityserver.vercel.app/user/signuser',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
            
        });
     
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message || 'Failed to sign in');
        }
        localStorage.setItem('user',JSON.stringify(json));
        dispatch({type:'getUser', payload:json});
        console.log(json)

        }catch(error){
            toast.error('an error occured')
        }finally{
            setLoading(false)
        }
    }
    return {signInWithEmailAndPassword}
}