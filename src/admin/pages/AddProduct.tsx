import { Button, Form, Input, Upload } from "antd"
import { Formik } from "formik"
import { FlatButton } from "../../shared/FlatButton";
import { useState } from "react";
import {UploadOutlined} from '@ant-design/icons';
import type { UploadFile } from "antd/es/upload/interface";
import { ProductHooks } from "../Hooks/ProductHooks";

export const AddProduct = ()=>{
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {postProduct} = ProductHooks();

  const beforeUpload = () => false;

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };
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
                    size:"",
                }}
            onSubmit={(values)=>postProduct({values, setFileList, fileList})}
            >
                {(formik) => (
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        <Form.Item label="Title">
                            <Input
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                required
                            />
                        </Form.Item>

                        <Form.Item label="Category">
                            <Input
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                required
                            />
                        </Form.Item>

                        <Form.Item label="Description">
                            <Input
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                required
                            />
                        </Form.Item>

                        <Form.Item label="Price">
                            <Input
                                name="price"
                                type="number"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                required
                            />
                        </Form.Item>

                        <Form.Item label="Size (Optional)">
                            <Input
                                name="size"
                                type="number"
                                value={formik.values.size}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                          <Form.Item label="Upload Images"
                           rules={[
                                {
                                required: true,
                                message: 'Please upload an image!',
                                },
                            ]}>
                            <Upload.Dragger
                            accept="image/*"
                            multiple
                            maxCount={1}
                            fileList={fileList}
                            onChange={handleFileChange}
                            beforeUpload={beforeUpload}
                            showUploadList
                            listType="picture"
                            >
                            <Button icon={<UploadOutlined />}>Drag or Click to Upload</Button>
                            </Upload.Dragger>
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