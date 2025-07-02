import { Form, Input, Modal, Upload, UploadFile } from "antd"
import { Formik } from "formik"
import { FlatButton } from "../../shared/FlatButton"
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useState } from "react"

type modalType = {
    isOpen: boolean,
    handleCloseModal: () => void,
    title: string,
    description: string,
    price: number,
    category: string,
    image: string,
}

export const UpdateProduct = ({ isOpen, handleCloseModal, title, description, price, category, image }: modalType) => {
    const [fileList, setFileList] = useState<UploadFile[]>(image ? [{
        uid: '-1',
        name: 'current_image.png',
        status: 'done',
        url: image,
    }] : [])

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
                    price,
                    image: '',
                }}
                onSubmit={(values) => {
                    console.log({ ...values, image: fileList });
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

                        <Form.Item label="Image">
                            <Upload
                                listType="picture"
                                fileList={fileList}
                                beforeUpload={() => false} // prevent auto upload
                                onChange={({ fileList }) => {
                                    // Keep only the latest image
                                    const latestFile = fileList.slice(-1)
                                    setFileList(latestFile)
                                    formik.setFieldValue("image", latestFile[0])
                                }}
                                onRemove={() => {
                                    setFileList([])
                                    formik.setFieldValue("image", '')
                                }}
                            >
                                <FlatButton title="Upload Image" icon={<UploadOutlined />} />
                            </Upload>
                        </Form.Item>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <FlatButton
                                title="Update"
                                className="btndark"
                                // htmlType="submit"
                            />
                            <FlatButton
                                title="Delete"
                                className="btnlight"
                                icon={<DeleteOutlined />}
                                onClick={() => console.log('Delete clicked')}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
