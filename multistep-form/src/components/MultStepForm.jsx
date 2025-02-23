import { useState } from "react";
import { Formik, Form } from "formik";
import { Input } from "./Input";
import * as Yup from "yup";

const formSchema = [
  Yup.object({
    title: Yup.string()
      .max(50, "Title is too long!")
      .required("Title is required!"),
    type: Yup.string()
      .max(50, "Type of Job is too long!")
      .required("Job Type is required!"),
    salary: Yup.number()
      .min(0, "Salary cannot be negative")
      .required("Salary is required!"),
    description: Yup.string()
      .min(15, "Not Enough Description")
      .required("Description is required"),
  }),
  Yup.object({
    company: Yup.string()
      .max(100, "Company name is too long!")
      .required("Company is required"),
    logo: Yup.string()
      .url("Invalid URL format. Example: https://example.com")
      .required("Company Logo is required!"),
    location: Yup.string()
      .max(100, "Location is too long!")
      .required("Location is required"),
  }),
  Yup.object({
    experienceLevel: Yup.string().required("Experience Level is required"),
    currency: Yup.string().required("Currency is required"),
  }),
];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const totalSteps = formSchema.length;

  const handleSubmit = async (values) => {
    if (step < totalSteps - 1) {
      setFormData({ ...formData, ...values }); // Save data at each step
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://joblisting-rd8f.onrender.com/api/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, ...values }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        setSubmitSuccess(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        type: "",
        salary: "",
        description: "",
        company: "",
        logo: "",
        location: "",
        experienceLevel: "",
        currency: "",
        isBookMarked: false,
      }}
      validationSchema={formSchema[step]}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, validateForm }) => (
        <Form className="flex flex-col gap-[8px] sm:w-2xl mt-10 ml-100 p-10 shadow-2xl rounded-2xl">
          {step === 0 && (
            <>
              <Input name="title" placeholder="Title" label="Job Title" />
              <Input name="type" placeholder="Type" label="Job Type" />
              <Input name="salary" type="number" label="Salary" />
              <Input
                name="description"
                placeholder="Description"
                label="Description"
              />
            </>
          )}

          {step === 1 && (
            <>
              <Input
                name="company"
                placeholder="Company Name"
                label="Company"
              />
              <Input name="logo" placeholder="Company Logo URL" label="Logo" />
              <Input
                name="location"
                placeholder="Company Location"
                label="Location"
              />
            </>
          )}

          {step === 2 && (
            <>
              <Input
                name="experienceLevel"
                placeholder="Experience Level"
                label="Experience Level"
              />

              {/* Currency Dropdown */}
              <div className="mb-4">
                <label htmlFor="currency">Currency:</label>
                <select
                  id="currency"
                  name="currency"
                  value={values.currency}
                  onChange={(e) => setFieldValue("currency", e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="ETB">ETB</option>
                </select>
                {errors.currency && touched.currency && (
                  <p className="text-red-500">{errors.currency}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="isBookMarked">Save as Bookmarked:</label>
                <input
                  type="checkbox"
                  id="isBookMarked"
                  name="isBookMarked"
                  checked={values.isBookMarked}
                  onChange={(e) =>
                    setFieldValue("isBookMarked", e.target.checked)
                  }
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Back
              </button>
            )}

            {step < totalSteps - 1 ? (
              <button
                type="button"
                onClick={() => {
                  validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      setFormData({ ...formData, ...values });
                      setStep(step + 1);
                    }
                  });
                }}
                className="bg-blue-500 px-4 py-2 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 rounded ${
                  isSubmitting ? "bg-gray-500" : "bg-green-500 text-white"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>

          {/* Success or Error Message */}
          {submitSuccess !== null && (
            <p
              className={`mt-4 text-center ${
                submitSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {submitSuccess
                ? "Job successfully posted!"
                : "Error submitting job. Please try again."}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default MultiStepForm;
