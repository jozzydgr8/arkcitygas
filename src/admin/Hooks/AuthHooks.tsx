import { toast } from "react-toastify";
import { UseAuthContext } from "../../context/UseAuthContext";

type resetpassword = {
    email:string | null,
    token:string | null,
    newPassword:string,
    resetForm:()=>void,
}
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

  const forgotPassword = async (email:string)=>{
    try{
        const response = await fetch('https://arkcityserver.vercel.app/user/forgot-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email})
        });
        if(!response.ok){
            throw Error('an error occured')
        }
        toast.success('reset password email sent succesfully')
    }catch(error){
        toast.error('Sorry. an error occured')
    }
  }

  const resetPassword = async ({email, token, newPassword, resetForm}:resetpassword)=>{
    try{
        const response = await fetch('https://arkcityserver.vercel.app/user/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email, token, newPassword})
        });
        if(!response.ok){
            throw Error('an error occured')
        }
        toast.success('your password has been rest try relogin')
    }catch(error){
        console.error(error);
        toast.error('an error occured resetting your password');
        resetForm();
    }
  }
    return {signInWithEmailAndPassword, forgotPassword, resetPassword}
}