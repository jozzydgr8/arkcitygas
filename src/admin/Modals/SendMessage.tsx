import { Modal, Form, Input, Button } from "antd";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { UseAuthContext } from "../../context/UseAuthContext";

type proptype = {
  selectedEmail: string | string[];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type valueprops = {
  subject:string,
  message:string
}

export const SendMessage = ({ selectedEmail, isModalOpen, setIsModalOpen }: proptype) => {
  const {user} = UseAuthContext();
  const deliverNewsLetter = async(values:valueprops)=>{
    try{
      const response = await fetch("https://arkcityserver.vercel.app/message/send_newsletter", {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${user?.token}`
        },
        body:JSON.stringify({
        subject: values.subject,
        message: values.message,
        recipient_email: Array.isArray(selectedEmail) ? selectedEmail : [selectedEmail]
        })
             
        

      });
      if(!response.ok){
        throw Error('an error occured')
      }
      toast.success('Email sent Succesfully!');
    }catch(error){
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  }
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async(values, { resetForm }) => {
      console.log("Sending Email to:", selectedEmail);
      console.log("Form values:", values);

      deliverNewsLetter(values);
      setIsModalOpen(false);
      resetForm();
    },
  });

  // 👇 Determine title
  const modalTitle = Array.isArray(selectedEmail)
    ? selectedEmail.length > 1
      ? "Send Email to All Subscribers"
      : `Send Email to ${selectedEmail[0]}`
    : `Send Email to ${selectedEmail}`;

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Subject"
          validateStatus={formik.errors.subject && formik.touched.subject ? "error" : ""}
          help={formik.touched.subject && formik.errors.subject}
        >
          <Input
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Message"
          validateStatus={formik.errors.message && formik.touched.message ? "error" : ""}
          help={formik.touched.message && formik.errors.message}
        >
          <Input.TextArea
            rows={4}
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Send Email
        </Button>
      </Form>
    </Modal>
  );
};
 