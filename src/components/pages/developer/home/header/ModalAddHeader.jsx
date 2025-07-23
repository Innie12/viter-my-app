import React from "react";
import ModalWrapper from "../../../../partials/modal/ModalWrappper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiVersion } from "../../../../helpers/function-general";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText} from "../../../../helpers/FormInputs";
import { queryData } from "../../../../custom-hooks/queryData";

const ModalAddHeader = ({ setIsModal }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${apiVersion}/controllers/developer/header/header.php`,
        "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      //validate reading
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
    if (mutation.isPending) return; // dont closer while query is ongoing
    setAnimate("translate-x-full"); //animate close of modal
    setTimeout(() => {
      setIsModal(false); //close upon animation exit
    }, 200);
  };

  const initVal = {
    header_name: "",
    header_link: "",
  };

  //UPON USING THIS MODAL AND ALL ELEMENT TAG ARE RENDERED, RUN THIS CODE
  React.useEffect(() => {
    setAnimate("");
  }, []); //[] is dependencies, if you have a value inside re-run the code inside

  return (
    <ModalWrapper className={`${animate}`} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        <h3 className="text-sm">Add Services</h3>
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
                      name="header_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3">
                    <InputText
                      name="header_link"
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
  );
};

export default ModalAddHeader;
