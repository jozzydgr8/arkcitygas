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
const {addOpeningReading, updateClosingReading} = ReadHooks();
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-09-05"

  // Check if there's a reading for today that has an openingReading
  const hasOpeningReadingToday = (readings ?? []).some(
    (reading) =>
      formatDateHook(reading.createdAt) === today && reading.openingReading && reading.openingReading !== null
  );
  //check if today reading has closingreading
 const hasClosingReadingToday = (readings ?? []).some(
  (reading) =>
    formatDateHook(reading.createdAt) === today &&
    reading.closingReading != null // checks for both null and undefined
);

  //find today reading
  const todayReading = (readings ?? []).find(
  (reading) =>
    formatDateHook(reading.createdAt) === today &&
    reading.openingReading !== null
);


  return (
    <>
      <Formik
        initialValues={{ openingReading: "" }}
        onSubmit={(values, { resetForm }) => {
            const {openingReading} = values
          addOpeningReading(Number(openingReading), setLoading, resetForm);
          
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form layout="vertical"
        //    disabled={hasOpeningReadingToday}
           >
            <Form.Item label="Opening reading">
              <Input
                type="number"
                name="openingReading"
                value={values.openingReading}
                required
                placeholder="Open Reading"
                onChange={handleChange}
              />
              {!hasOpeningReadingToday?<span style={{color:'red'}}>Please input correct opening readings!</span>:<span style={{color:'green'}}>Opening readings set!</span>}
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
        initialValues={{ closeReading: "" }}
        onSubmit={(values, { resetForm }) => {
        const { closeReading } = values;

        if (todayReading && todayReading._id) {
            updateClosingReading(todayReading._id, Number(closeReading), resetForm, setLoading);
        } else {
            console.error("No valid reading for today found.");
        }
        }}

      >
        {({ values, handleSubmit, handleChange }) => (
          <Form layout="vertical" disabled={!hasOpeningReadingToday || hasClosingReadingToday}>
            <Form.Item label="Closing reading">
              <Input
                type="number"
                name="closeReading"
                value={values.closeReading}
                required
                placeholder="Close Reading"
                onChange={handleChange}
              />
              {hasOpeningReadingToday && !hasClosingReadingToday?<span style={{color:"red"}}>Please input Closing reading for today!</span>
              :!hasOpeningReadingToday?<span>Opening readings needs to be set</span>:<span style={{color:"green"}}>Closing reading has been succesfully updated!</span>}
            </Form.Item>

            <Popconfirm
                title="Are you sure reading is correct?"
                onConfirm={() => handleSubmit()}
                okText="Yes"
                cancelText="No"
                disabled={!hasOpeningReadingToday || hasClosingReadingToday || loading}>
                <span>
                    <FlatButton
                    title="Submit"
                    onClick={handleSubmit}
                    className="btndark"
                    disabled={!hasOpeningReadingToday || hasClosingReadingToday || loading}
                    />
                </span>

            </Popconfirm>

            
          </Form>
        )}
      </Formik>
    </>
  );
};
