import React from "react";
import ModalWrapper from "../../../../partials/modal/ModalWrappper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText } from "../../../../helpers/FormInputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";
import * as Yup from "yup";
import { apiVersion } from "../../../../helpers/function-general";

const ModalAddHeader = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  console.log(itemEdit);

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        //Step-11 If itemEdit is provided, update the existing service, otherwise create a new one
        itemEdit
          ? `${apiVersion}/controllers/developer/header/header.php?id=${itemEdit.header_aid}`
          : `${apiVersion}/controllers/developer/header/header.php`,
        itemEdit //step 12 - if itemEdit is provided, use "put" method for update
          ? "put" //UPDATE
          : "post", //CREATE

        values
      ),
    onSuccess: (data) => {
      //validate reading
      queryClient.invalidateQueries({ queryKey: ["header"] });

      if (data.success) {
        alert("Successfully Created.");
      } else {
        alert(data.error);
      }
    },
  });

  const initVal = {
    header_name: itemEdit ? itemEdit.header_name : "",
    header_link: itemEdit ? itemEdit.header_link : "",
    // Validation
    header_name_old: itemEdit ? itemEdit.header_name : "",
  };
  const yupSchema = Yup.object({
    header_name: Yup.string().required("required"),
    header_link: Yup.string().required("required"),
  });

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      setIsModal(false);
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);
  return (
    <ModalWrapper className={`${animate}`} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        <h3 className="text-sm">{itemEdit ? "Edit" : "Add"} Header</h3>{" "}
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
            resetForm();
          }}
        >
          {(props) => {
            return (
              <Form>
                {/* FORMS */}
                <div className="modal-overflow">
                  <div className="relative mt-5 mb-6">
                    <InputText label="Name" name="header_name" type="text" />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputText label="Link" name="header_link" type="text" />
                  </div>
                </div>
                {/* ACTIONS */}
                <div className="modal_action flex justify-end absolute w-full bottom-0 mt-6 mb-4 gap-2 left-0 px-6">
                  <button type="submit" className="btn-modal-submit">
                    {mutation.isPending
                      ? "Loading..."
                      : itemEdit
                      ? "Save"
                      : "Add"}
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
  );
};

export default ModalAddHeader;
