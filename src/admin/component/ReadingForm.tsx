import { Form, Input, Popconfirm } from "antd";
import { Formik } from "formik";
import { FlatButton } from "../../shared/FlatButton";
import { UseDataContext } from "../../context/UseDataContext";
import { ReadHooks } from "../Hooks/ReadHooks";
import { useState } from "react";
import { formatDateHook } from "../Hooks/FormatDateHook";

export const ReadingForm = () => {
const [loading, setLoading]=useState(false);
const {readings} = UseDataContext();
const {addDailyReading, addRefill} = ReadHooks();
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-09-05"

  // Check if there's a reading for today that has an dailyReading
  const hasOpeningReadingToday = (readings ?? []).some(
    (reading) =>
      formatDateHook(reading.createdAt) === today && reading.dailyReading && reading.dailyReading !== null
  );
  

  //find today reading
  const todayReading = (readings ?? []).find(
  (reading) =>
    formatDateHook(reading.createdAt) === today &&
    reading.dailyReading !== null
);


  return (
    <>
      <Formik
        initialValues={{ dailyReading: "" }}
        onSubmit={(values, { resetForm }) => {
            const {dailyReading} = values
          addDailyReading(Number(dailyReading), setLoading, resetForm);
          
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form layout="vertical"
            disabled={hasOpeningReadingToday}
           >
            <Form.Item label="Daily reading">
              <Input
                type="number"
                name="dailyReading"
                value={values.dailyReading}
                required
                placeholder="Daily Reading"
                onChange={handleChange}
              />
              {!hasOpeningReadingToday?<span style={{color:'red'}}>Please input correct daily readings!</span>:<span style={{color:'green'}}>Opening readings set!</span>}
            </Form.Item>
             <Popconfirm
                title="Are you sure reading is correct?"
                onConfirm={() => handleSubmit()}
                okText="Yes"
                cancelText="No"
                disabled={hasOpeningReadingToday || loading}
            >
            <span>
                <FlatButton
              title="Submit"
              className="btndark"
              disabled={hasOpeningReadingToday || loading}
            />
            </span>
            </Popconfirm>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ refill: "" }}
        onSubmit={(values, { resetForm }) => {
        const { refill } = values;
          addRefill(Number(refill), resetForm, setLoading)
        }}

      >
        {({ values, handleSubmit, handleChange }) => (
          <Form layout="vertical">
            <Form.Item label="refill">
              <Input
                type="number"
                name="refill"
                value={values.refill}
                required
                placeholder="Input Refill Value"
                onChange={handleChange}
              />
              
            </Form.Item>

            <Popconfirm
                title="Are you sure refill is correct?"
                onConfirm={() => handleSubmit()}
                okText="Yes"
                cancelText="No"
                disabled={loading}>
                <span>
                    <FlatButton
                    title="Submit"
                    onClick={handleSubmit}
                    className="btndark"
                    disabled={loading}
                    />
                </span>

            </Popconfirm>

            
          </Form>
        )}
      </Formik>
    </>
  );
};
