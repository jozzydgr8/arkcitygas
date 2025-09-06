import { Form, Input } from "antd";
import { Formik } from "formik";
import { FlatButton } from "../../shared/FlatButton";
import { demoReadings } from "../../data";

export const ReadingForm = () => {
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-09-05"

  // Check if there's a reading for today that has an openingReading
  const hasOpeningReadingToday = demoReadings.some(
    (reading) =>
      reading.date === today && reading.openingReading && reading.openingReading !== null
  );
    const hasClosingReadingToday = demoReadings.some(
    (reading) =>
      reading.date === today &&
      reading.closingReading &&
      reading.closingReading !== null
  );

  return (
    <>
      <Formik
        initialValues={{ openingReading: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form layout="vertical" disabled={hasOpeningReadingToday}>
            <Form.Item label="Opening reading">
              <Input
                name="openingReading"
                value={values.openingReading}
                required
                placeholder="Open Reading"
                onChange={handleChange}
              />
              {!hasOpeningReadingToday?<span style={{color:'red'}}>Please input correct opening readings!</span>:<span style={{color:'green'}}>Opening readings set!</span>}
            </Form.Item>
            <FlatButton
              title="Submit"
              onClick={handleSubmit}
              className="btndark"
              disabled={hasOpeningReadingToday}
            />
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ closeReading: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form layout="vertical" disabled={!hasOpeningReadingToday || hasClosingReadingToday}>
            <Form.Item label="Closing reading">
              <Input
                name="closeReading"
                value={values.closeReading}
                required
                placeholder="Close Reading"
                onChange={handleChange}
              />
              {hasClosingReadingToday && !hasClosingReadingToday?<span style={{color:"red"}}>Please input Closing reading for today!</span>
              :<span style={{color:"green"}}>Closing reading has been succesfully updated!</span>}
            </Form.Item>
            <FlatButton
              title="Submit"
              onClick={handleSubmit}
              className="btndark"
              disabled={!hasOpeningReadingToday || hasClosingReadingToday}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
