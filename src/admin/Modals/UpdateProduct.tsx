import { Form, Input, Modal, Popconfirm, Upload, UploadFile } from "antd"
import { Formik } from "formik"
import { FlatButton } from "../../shared/FlatButton"
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useState } from "react"
import { ProductHooks } from "../Hooks/ProductHooks"

type modalType = {
    isOpen: boolean,
    handleCloseModal: () => void,
    title: string,
    description: string,
    cost: number,
    category: string,
    imagePath: string,
    _id:string,
}

export const UpdateProduct = ({ isOpen, handleCloseModal, title, description, cost, category, imagePath, _id }: modalType) => {
    const [fileList, setFileList] = useState<UploadFile[]>(imagePath ? [{
        uid: '-1',
        name: 'current_image.png',
        status: 'done',
        url: imagePath,
    }] : []);
    const [loading, setLoading] = useState(false);
    const{productUpdate, deleteProduct} = ProductHooks();

    return (
        <Modal
            onCancel={handleCloseModal}
            open={isOpen}
            footer={null}
            title="Update Product"
        >
            <Formik
                initialValues={{
                    title,
                    category,
                    description,
                    cost,
                    imagePath: '',
                }}
                onSubmit={(values) => {
                    console.log({ ...values, imagePath: fileList });
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

                        <Form.Item label="Cost">
                            <Input
                                name="cost"
                                type="number"
                                value={formik.values.cost}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Image">
                            <Upload
                                listType="picture"
                                fileList={fileList}
                                beforeUpload={() => false} // prevent auto upload
                                onChange={({ fileList }) => {
                                    // Keep only the latest imagePath
                                    const latestFile = fileList.slice(-1)
                                    setFileList(latestFile)
                                    formik.setFieldValue("imagePath", latestFile[0])
                                }}
                                onRemove={() => {
                                    setFileList([])
                                    formik.setFieldValue("imagePath", '')
                                }}
                            >
                                <FlatButton title="Upload Image" icon={<UploadOutlined />} />
                            </Upload>
                        </Form.Item>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <FlatButton
                                title="Update"
                                disabled={loading}
                                className="btndark"
                                onClick={()=>productUpdate({setLoading,values:formik.values, fileList, title, description, cost, category,_id, handleCloseModal})}
                            />
                            <Popconfirm
                            title="Are you sure to delete this product?"
                            description="This action cannot be undone."
                            onConfirm={() => deleteProduct(_id)}
                            okText="Yes, delete"
                            cancelText="Cancel"
                            >
                            <span>
                                <FlatButton
                                className="btndark"
                                title="Delete Product"
                                icon={<DeleteOutlined />}
                            />
                            </span>
                            </Popconfirm>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
