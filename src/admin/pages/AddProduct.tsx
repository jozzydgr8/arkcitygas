import { Form, Input } from "antd"
import { Formik } from "formik"
import { FlatButton } from "../../shared/FlatButton";

export const AddProduct = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <h2>Add New Product</h2>
                <Formik
                initialValues={{
                    title:'',
                    category:"",
                    description:"",
                    price:'',
                    image: '',
                }}
                onSubmit={(values) => {
                    console.log({ ...values });
                }}
            >
                {(formik) => (
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        <Form.Item label="Title">
                            <Input
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Category">
                            <Input
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Description">
                            <Input
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Price">
                            <Input
                                name="price"
                                type="number"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <FlatButton
                                title="Add Product"
                                className="btndark"
                                // htmlType="submit"
                            />
                            
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        </section>
    )
}