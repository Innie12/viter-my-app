import React from "react";
import { FaList, FaPlus, FaTable} from "react-icons/fa";
import ModalAddTestimonials from "./ModalAddTestimonials";
import { apiVersion } from "../../../../helpers/function-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import ModalDeleteTestimonials from "./ModalDeleteTestimonials";
import TestimonialsTable from "./TestimonialsTable";
import TestimonialsList from "./TestimonialsList";

const Testimonials = () => {
  const [isModalTestimonials, setIsModalTestimonials] = React.useState(false);
  const [isDeleteTestimonials, setIsDeleteTestimonials] = React.useState(false); //Step-1 delete
  const [itemEdit, setItemEdit] = React.useState();
  const [isTable, setIsTable] = React.useState(false);

  const {
    isLoading,
    isFetching,
    error,
    data: dataTestimonials,
  } = useQueryData(
    `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
    "get",
    "testimonials"
  );
  const handleAdd = () => {
    setItemEdit(null);
    setIsModalTestimonials(true);
  };

  const handleEdit = (item) => {
    //step 1
    // console.log(item); //step 3 - show info in card
    setItemEdit(item); //step 5 - save item to edit
    setIsModalTestimonials(true);
  };

  const handleDelete = (item) => {
    setItemEdit(item); //step 2 - save item to delete
    setIsDeleteTestimonials(true); //step 3 - open modal for delete confirmation
  };

  console.log(isTable);
  const handleToggleTable = () => {
    setIsTable(!isTable);
  };
  return (
    <>
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative w-full">
            <div className="text-center mb-12">
              <h2 className="title">Client Testimonials</h2>
            </div>
            <div className="absolute right-0 top-1/3">
              <div className="flex items-center gap-x-3">
                {/* UI */}
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleToggleTable} //step 2 in update
                >
                  {isTable == true ? (
                    <>
                      <FaList className="size-3" />
                      List
                    </>
                  ) : (
                    <>
                      <FaTable className="size-3" />
                      Table
                    </>
                  )}
                </button>
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus className="size-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* DELETE */}
          {isTable == true ? (
            <>
              <TestimonialsTable
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
                dataTestimonials={dataTestimonials}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
          ) : (
            <TestimonialsList
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              dataTestimonials={dataTestimonials}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
        {isModalTestimonials && (
          <ModalAddTestimonials
            setIsModal={setIsModalTestimonials}
            itemEdit={itemEdit}
          />
        )}
        {/* itemEdit={itemEdit} step-6 */}
        {isDeleteTestimonials && (
          <ModalDeleteTestimonials
            setIsModalDelete={setIsDeleteTestimonials}
            mySqlEndpoint={`${apiVersion}/controllers/developer/testimonials/testimonials.php?id=${itemEdit.testimonials_aid}`}
            queryKey="testimonials" //step 4 - pass item to delete
          />
        )}
      </section>
    </>
  );
};

export default Testimonials;
