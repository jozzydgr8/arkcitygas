import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseDataContext } from "../../context/UseDataContext";
import { UseAuthContext } from "../../context/UseAuthContext";

type values = {
    title: string;
    category: string;
    description: string;
    cost: string;
    image: string;
    size: string;

}

type postProduct = {
    values:values,fileList: UploadFile<any>[],resetForm:()=>void, setLoading:React.Dispatch<React.SetStateAction<boolean>>, setFileList: (value: React.SetStateAction<UploadFile<any>[]> ) => void
}

export const ProductHooks = ()=>{
    const {dispatch} = UseDataContext();
    const {user} = UseAuthContext();
    const navigate = useNavigate();
    const postProduct = async ({values,fileList, setFileList, setLoading, resetForm}:postProduct) => {
            if (!fileList.length) {
              return alert("Please upload an image.");
            }
            setLoading(true);
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("cost", values.cost); 
            formData.append("category", values.category)
            if (values.size !== '' && values.size !== null && !isNaN(Number(values.size))) {
            formData.append("size", Number(values.size).toString());
            }

            formData.append("image", fileList[0].originFileObj as File);

            try {
                    
                    const res = await fetch("https://arkcityserver.vercel.app/product", {
                        method: "POST",
                        headers:{
                            'Authorization': `Bearer ${user?.token}`,
                        },
                        body: formData, // FormData object
                    });

                    if (!res.ok) {
                        throw new Error(`Server responded with status ${res.status}`);
                    }

                    const data = await res.json();
                    console.log("Product added:", data);
                    dispatch({type:'addproduct', payload:data});
                    // resetForm();
                    setFileList([]);
                    resetForm();
                    toast.success("Product uploaded successfully!");
                    setLoading(false)
                } catch (error) {
                console.error("Upload failed:", error);
                toast.error("Upload failed");
                
                }finally{
                    setLoading(false)
                }

          }
    
    const deleteProduct = async(_id:string)=>{
        try{
            const response = await fetch(`https://arkcityserver.vercel.app/product/${_id}`,{
                method:'delete',
                headers:{
                    'Authorization': `Bearer ${user?.token}`,
                }
            })
            if(!response.ok){
                throw Error('error deleting product')
            }
            const json = await response.json();
            console.log('delete succesful', json);
            toast.success('product delete successful');
            dispatch({type:"deleteProduct", payload:_id});
        }catch(error){
            console.error(error)
            toast.error('error deleting documents')
        }finally{
            navigate('/admin_jctbdil1$')
        }
    }

    //updateproduct
    const productUpdate = async ({setLoading,values, fileList, title, description, cost, category,_id, handleCloseModal}:updateprops) => {
    setLoading(true);
    const formData = new FormData();
    const originalValues = { title, category, description, cost }; // from props

    // Only add changed text fields
    const keys: (keyof typeof originalValues)[] = ['title', 'category', 'description', 'cost'];

    for (const key of keys) {
    if (values[key] != null && values[key] !== originalValues[key]) {
        formData.append(key, values[key]);
    }
    }


    // Only add image if it was changed
    if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj as File);
    }

    if (!formData.has('image') && formData.keys().next().done) {
        // No changes
        console.log("No changes to submit.");
        return;
    }

    try {
        const response = await fetch(`https://arkcityserver.vercel.app/product/${_id}`, {
            method: "PATCH",
            headers:{
                'Authorization': `Bearer ${user?.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        dispatch({type:'updateProduct', payload:updatedProduct})
        console.log("Product updated:", updatedProduct);
        toast.success('product update succesfully');
        handleCloseModal();
    } catch (error) {
        console.error("Error updating product:", error);
        toast.error('error updating document');
    }finally{
        setLoading(false);
    }
};


          return{postProduct, deleteProduct, productUpdate}
}

type updateprops={
    values:any,
    fileList:UploadFile[],
    title:string, description:string, cost:number, category:string,
    _id:string,
    handleCloseModal:()=>void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}