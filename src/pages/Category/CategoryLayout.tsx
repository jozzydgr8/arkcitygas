import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productItems } from "../../data";
import { FlatButton } from "../../shared/FlatButton";
import { Modal, Input } from "antd";
import { Formik } from "formik";

export const CategoryLayout = ()=>{
    type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};



    const {id} = useParams();
    const [products, setProducts] = useState<ProductType[]>([])
    const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ProductType | null>(null);

    const handleOpenModal = (service:ProductType) => {
        setSelectedService(service);
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedService(null);
      };
    useEffect(()=>{
        if(!id) return;
        const items = productItems.filter(items=>items.category.toString()==id);
        setProducts(items);
        console.log(items)
    },[])
    return (
        <section>
            <div className="container-fluid">
                {
                    products.map(product=>(
                <div
            
                    key={product.id}
                    className="servicegridcontent animate-up"
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
                        backgroundImage: `url(${product.image})`,
                        height: "200px",
                        backgroundSize: "cover",
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
                            title={`BUY NOW`}
                        />
                        </div>
                    </div>
                    </div>
                    ))
                }


                {/* //modal modal */}
                        <Modal
                        open={isOpen}
                        title={selectedService?.title}
                        onCancel={handleCloseModal}
                        footer={null}
                        >
                        <p>{selectedService?.description}</p>

                        <Formik
                        initialValues={{
                            size:'',
                            name: '',
                            phone: '',
                            email: '',
                            location: '',
                            message: '',
                            date: null,
                            service: selectedService?.title || '',
                        }}
                        onSubmit={(values) => {
                            console.log(values); // Call your backend handler here
                        }}
                        >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                            <Input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Full Name"
                                style={{ marginBottom: '1rem' }}
                                required
                            />

                            <Input
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                placeholder="Phone Number"
                                style={{ marginBottom: '1rem' }}
                                required
                            />

                            <Input
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Email (optional)"
                                style={{ marginBottom: '1rem' }}
                            />

                            <Input
                                name="location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                placeholder="Delivery Address"
                                style={{ marginBottom: '1rem' }}
                                required
                            />

                            <Input
                                name="size"
                                value={formik.values.size}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow numbers or empty string
                                    if (/^\d*$/.test(value)) {
                                    formik.setFieldValue('size', value);
                                    }
                                }}
                                placeholder="The size in kg"
                                type="text" // use text to prevent browser interfering with empty string
                                style={{ marginBottom: '1rem' }}
                                required
                                />


                            <Input.TextArea
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                placeholder="Additional Notes"
                                rows={3}
                                style={{ marginBottom: '1rem' }}
                            />

                            {/* <DatePicker
                                name="date"
                                style={{ width: '100%', marginBottom: '1rem' }}
                                placeholder="Preferred Date (optional)"
                                onChange={(date, dateString) =>
                                formik.setFieldValue('date', dateString)
                                }
                            /> */}

                            {/* Hidden Service Title Field */}
                            <input
                                type="hidden"
                                name="service"
                                value={formik.values.service}
                            />

                            <FlatButton title="submit" className="btndark"/>
                            </form>
                        )}
                        </Formik>
                    </Modal>
    
            </div>
        </section>
    )
}