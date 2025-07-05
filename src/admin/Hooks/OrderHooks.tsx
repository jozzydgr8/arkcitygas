import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";

export const OrderHooks = ()=>{
    const {dispatch} = UseDataContext();
    const updateOrderStatus = async(_id:string, orderStatus:string, setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true);
        try{
            const response = await fetch(`http://localhost:5000/order/${_id}`,{
                method:'PATCH',
                body:JSON.stringify({orderStatus:orderStatus})
            });
            const updatedOrder = await response.json();
            dispatch({type:'updateOrder',payload:updatedOrder})
        }catch(error){
            toast.error('error updating Order');
            console.log('error updating order',error)
        }finally{
            setLoading(false);
        }
    }
    return {updateOrderStatus}
}