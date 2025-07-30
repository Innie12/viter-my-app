import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { apiVersion } from "../../../../helpers/function-general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";

const ContactList = ({
  isLoading,
  isFetching,
  error,
  dataContact,
  itemEdit,
  handleAdd,
  handleDelete,
  handleEdit,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${apiVersion}/controllers/developer/contact/contact.php`,

        "post", // CREATE
        values
      ),
    onSuccess: (data) => {
      // validate reading
      queryClient.invalidateQueries({ queryKey: ["contact"] }); // give id for refetching data.

      if (data.success) {
        alert("Successfully created.");
      } else {
        alert(data.error);
      }
    },
  });

  const initVal = {
    contact_fullname: "",
    contact_email: "",
    contact_message: "",
  };

  const yupSchema = Yup.object({
    contact_fullname: Yup.string().required("required"),
    contact_email: Yup.string()
      .email("Must put a valid email")
      .required("required"),
    contact_message: Yup.string().required("required"),
  });

  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          mutation.mutate(values);
          resetForm();
        }}
      >
        {(props) => {
          return (
            <Form className="contact">
              {/* Forms */}
              <div className="relative mb-3">
                <InputText
                  label="Full Name"
                  name="contact_fullname"
                  type="text"
                />
              </div>
              <div className="relative mb-5">
                <InputText label="Email" name="contact_email" type="text" />
              </div>
              <div className="relative mb-6 inline-block w-full">
                <InputTextArea
                  className="resize-none"
                  label="Message"
                  name="contact_message"
                  type="text"
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn--blue"
              >
                Send Message
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ContactList;
