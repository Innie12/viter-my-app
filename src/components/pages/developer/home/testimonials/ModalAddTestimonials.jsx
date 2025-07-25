import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../../custom-hooks/queryData";
import ModalWrapper from "../../../../partials/modal/ModalWrappper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import * as Yup from "yup";
import { apiVersion } from "../../../../helpers/function-general";

const ModalAddTestimonials = ({ setIsModal }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
        "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(""); // give id for refetching data.

      if (!data.success) {
        window.prompt(data.error);
      } else {
        window.prompt(`Successfully created.`);
        setIsModal(false);
      }
    },
  });

  const handleClose = () => {
    setAnimate("translate-x-full"); //animate close of modal
    setTimeout(() => {
      setIsModal(false); //close upon animation exit
    }, 200);
  };
  const initVal = {
    testimonials_images: "",
    testimonials_name: "",
    testimonials_position: "",
    testimonials_comment: "",
  };

  const yupSchema = Yup.object({
    testimonials_name: Yup.string().required("required"),
    testimonials_position: Yup.string().required("required"),
    testimonials_comment: Yup.string().required("required"),
  });

  React.useEffect(() => {
    setAnimate("");
  }, []);
  return (
    <>
      <ModalWrapper className={`${animate}`} handleClose={handleClose}>
        <div className="modal_header relative mb-4">
          <h3 className="text-sm">Add Testimonial</h3>
          <button
            type="button"
            className="absolute top-0.5 right-0"
            onClick={handleClose}
          >
            <FaTimes className="size-4" />
          </button>
        </div>
        <div className="modal_body overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-40px)]">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log(values);
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-overflow ">
                    <div className="relative mt-3">
                      <InputText
                        label="Image url"
                        name="testimonials_images"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-3">
                      <InputText
                        label="Name"
                        name="testimonials_name"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-6">
                      <InputText
                        label="Position"
                        name="testimonials_position"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-9">
                      <InputTextArea
                        label="Comment"
                        name="testimonials_comment"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>
                  <div className="modal_action flex justify-end absolute w-full bottom-0 mt-6 mb-4 gap-2 left-0 px-6">
                    <button type="submit" className="btn-modal-submit">
                      {mutation.isPending ? "Loading..." : "Add"}
                    </button>
                    <button
                      type="reset"
                      disabled={mutation.isPending}
                      className="btn-modal-cancel"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddTestimonials;
