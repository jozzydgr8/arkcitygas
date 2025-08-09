import { useState } from "react";
import { FlatButton } from "../../shared/FlatButton";
import { dataType, paystacksuccesresponse, ProductType } from "../../shared/types";
import { ModalComponent } from "../homepage/component/ModalComponent";
import { UseDataContext } from "../../context/UseDataContext";
import { toast } from "react-toastify";

type props = {
  active:string
}
export const CategoryLayout = ({active}:props)=>{
const [dataSubmit, setDataSubmit] = useState({} as dataType)
const [isOpen, setIsOpen] = useState(false);
const [selectedService, setSelectedService] = useState<ProductType | null>(null);
const [proceedPayment, setProceedPayment] =useState(false);
const [loading, setLoading] = useState(false);
const {product} = UseDataContext();
//get categories
const items = active === "All Products" ? product : product && product.filter(item => item.category.toString() === active);

//useffect to fetch categories



    

 //handle finish on succesful payment
 const handleFinish = async (response:paystacksuccesresponse)=>{
    setLoading(true);
    try{
      const res = await fetch('https://arkcityserver.vercel.app/order/verify-payment/',{
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({reference:response.reference})
    });
    const result = await res.json();
    if(result.status === 'success'){
      console.log('payment succesful');
      toast.success('order succesful')
    }else{
      console.log('verification failed')
      throw Error('An error occured try again later')
    }
    }catch(error){
       toast.error('An error occured try again later')
    }finally{
      handleCloseModal()
      setLoading(false);
      setProceedPayment(false);
      
    }

 
  }   
 const publicKey = process.env.REACT_APP_Publickey!;
  // const publicKey ='pk_test_0e745897d2bb51a12c4fca668a094dcecd425aea';

   const componentProp = {
  email: dataSubmit.email,
  amount: selectedService?.cost! * 100,
  metadata: {
    custom_fields: [
      {
        display_name: "Full Name",
        variable_name: "name",
        value: dataSubmit.name
      },
      {
        display_name: "Phone Number",
        variable_name: "phone",
        value: dataSubmit.phone
      },
      {
        display_name: "Email Address",
        variable_name: "email",
        value: dataSubmit.email
      },
      {
        display_name: "Address",
        variable_name: "address",
        value: dataSubmit.address
      },
      {
        display_name: "Product / Service",
        variable_name: "product",
        value: selectedService?.title
      },
      {
        display_name: "category",
        variable_name: "category",
        value: selectedService?.category
      },
      {
        display_name: "Additional notes",
        variable_name: "notes",
        value: dataSubmit.notes
      }
    ]
  },
  publicKey,
  text: `Pay now ₦${selectedService?.cost.toLocaleString()}`,
  onSuccess: handleFinish,
  onClose: () => {
    alert('You have closed the payment modal');
  }
};

    const handleOpenModal = (service:ProductType) => {
        setSelectedService(service);
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedService(null);
        setProceedPayment(false);
      };
    
    return (
       
                <>
                <h2>{active}</h2>
                <div className="servicegrid">
{
                    items?.map(product=>(
                <div
            
                    key={product._id}
                    className="servicegridcontent"
                    style={{
                        border: "solid 1px #d7d9d6",
                        color: "black",
                        borderRadius: "20px",
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        textDecoration: "none",
                    }}
                    >
                    {/* Top image section */}
                    <div
                        style={{
                        backgroundImage: `url(${product.imagePath})`,
                        height: "200px",
                        backgroundSize: "contain",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        }}
                    ></div>

                    {/* Content section */}
                    <div
                        style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        padding: "15px",
                        }}
                    >
                        <h3
                        style={{ textTransform: "capitalize" }}
                        
                        >{product.title }</h3>
                        <p>{product.description}</p>

                        {/* Button to open modal */}
                        <div style={{ marginTop: "auto" }}>
                        <FlatButton
                            className="btndark"
                            onClick={() => handleOpenModal(product)}
                            title={`BUY NOW - ₦${product.cost}`}
                        />
                        </div>
                    </div>
                    </div>
                    ))
                }


                {/* //modal modal */}
                       <ModalComponent 
                        componentProp={componentProp}
                        isOpen={isOpen}
                        selectedService={selectedService}
                        handleCloseModal={handleCloseModal}
                        loading={loading}
                        setDataSubmit={setDataSubmit}
                        setProceedPayment={setProceedPayment}
                        proceedPayment={proceedPayment}
                        />
                </div>
                

    
</>
    )
}