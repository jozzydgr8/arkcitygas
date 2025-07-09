import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";

export const OrderHooks = ()=>{
    const {dispatch} = UseDataContext();
    const {user} = UseAuthContext();
    const updateOrderStatus = async(_id:string, orderStatus:string, setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
        setLoading(true);
        console.log(orderStatus)
        try{
            const response = await fetch(`https://arkcityserver.vercel.app/order/${_id}`,{
                method:'PATCH',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body:JSON.stringify({orderStatus:orderStatus})
               
            });
            if(!response.ok){
                throw Error('error updating order');

            }
            const updatedOrder = await response.json();
            dispatch({type:'updateOrder',payload:updatedOrder});
            toast.success(`order status updated ${orderStatus}`)
        }catch(error){
            toast.error('error updating Order');
            console.log('error updating order',error)
        }finally{
            setLoading(false);
        }
    }
    return {updateOrderStatus}
}