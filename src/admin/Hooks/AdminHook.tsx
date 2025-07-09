import { toast } from "react-toastify";
import { UseAuthContext } from "../../context/UseAuthContext"
import { UseDataContext } from "../../context/UseDataContext";
import Password from "antd/es/input/Password";

export const AdminHook = ()=>{
    const {user} = UseAuthContext();
    const { dispatch} = UseDataContext();
    const makeAdmin = async(email:string, setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true)
       try{
            const response = await fetch('https://arkcityserver.vercel.app/user/makeadmin',{
                method:'PATCH',
                headers:{
                    'Authorization':`Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email:email})
            })
            if(!response.ok){
                throw Error('error updating admin')
            }
            const json = await response.json();
            dispatch({type:'updateadmin', payload:json});
            toast.success('admin updated');
            
       }catch(error){
        console.error(error);
        toast.error('error updating admin')
       }finally{
        setLoading(false)
       }
    }

    const createAdmin = async (email:string, setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true)
        try{
            const response = await fetch('https://arkcityserver.vercel.app/user/createuser',{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:email})
        })
        if(!response.ok){
            throw Error('error creating admin');
        }
        const json = await response.json();
        dispatch({type:'createadmin', payload:json});
        toast.success('success admin created')
        }catch(error){
            console.error(error);
            toast.error('an error occured')
        }finally{
            setLoading(false)
        }
    }


    const deleteAdmin = async(email:string, setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true)
       try{
            const response = await fetch('https://arkcityserver.vercel.app/user/deleteadmin',{
                method:'delete',
                headers:{
                    'Authorization':`Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email:email})
            })
            if(!response.ok){
                throw Error('error updating admin')
            }
            const json = await response.json();
            dispatch({type:'deleteadmin', payload:email});
            toast.success('admin deleted');
            
       }catch(error){
        console.error(error);
        toast.error('error deleting admin')
       }finally{
        setLoading(false)
       }
    }
    type passwordprops = {
        password:string,
        newPassword:string
    }
    const updatePassword = async ({password,newPassword}:passwordprops, setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
        try{
            const response = await fetch('https://arkcityserver.vercel.app/user/update-password',{
                method:'POST',
                headers:{
                    "Authorization":`Bearer ${user?.token}`,
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({password:password, newPassword:newPassword, token:user?.token, email:user?.email})
            });
            if(!response.ok){
                throw Error('an error occured updating password')
            }
            toast.success('password updated succesfully')
        }catch(error){
            console.error(error);
            toast.error('an error occured updating password')
        }
    }
    
    return {makeAdmin, createAdmin, deleteAdmin,updatePassword}
}