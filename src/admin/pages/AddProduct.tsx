import { Button, Form, Input, Upload, Select } from "antd"
import { Formik } from "formik"
import { FlatButton } from "../../shared/FlatButton";
import { useState } from "react";
import {UploadOutlined} from '@ant-design/icons';
import type { UploadFile } from "antd/es/upload/interface";
import { ProductHooks } from "../Hooks/ProductHooks";
import * as Yup from 'yup'
export const AddProduct = ()=>{
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const {postProduct} = ProductHooks();

  const beforeUpload = () => false;

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number().required("Cost is required"),
});
    return(
        <section>
            <div className="container-fluid">
                <h2>Add New Product</h2>
                <Formik
                initialValues={{
                    title:'',category:"",description:"",cost:'',image: '',size:"",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm})=>postProduct({values, setFileList, fileList, setLoading, resetForm})}
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

                        <Form.Item label=" Select Category"
                        rules={[
                                {
                                required: true,
                                message: 'Please choose a category',
                                },
                            ]}>
                        <Select
                            title="category"
                            value={formik.values.category}
                            onChange={(value) => formik.setFieldValue("category", value)}
                            placeholder="Select a category"
                        >
                            <Select.Option value="accessories">Accessories</Select.Option>
                            <Select.Option value="cylinders">Cylinders</Select.Option>
                            <Select.Option value="refill">Refill</Select.Option>
                        </Select>
                        </Form.Item>

                        <Form.Item label="Description">
                            <Input
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                
                                required
                            />
                        </Form.Item>

                        <Form.Item label="cost">
                            <Input
                                name="cost"
                                type="number"
                                value={formik.values.cost}
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
                                disabled={loading}
                            />
                            
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        </section>
    )
}