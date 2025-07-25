import React from "react";
import CardServices from "../../../../partials/CardServices";
import { apiVersion } from "../../../../helpers/function-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { Key } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import { FaPencil } from "react-icons/fa6";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(); //step 4

  const {
    isLoading,
    isFetching,
    error,
    data: dataServices,
  } = useQueryData(
    `${apiVersion}/controllers/developer/web-services/web-services.php`,
    "get",
    "web-services"
  );

  const handleAdd = () => {
    setItemEdit(null); //step-10 - reset itemEdit when adding new service
    setIsModalServices(true);
  };
 
  const handleEdit = (item) => { //step 1
    // console.log(item); //step 3 - show info in card
    setItemEdit(item); //step 5 - save item to edit
    setIsModalServices(true);
  };
  return (
    <>
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <div className="relative w-full">
            <div className="text-center mb-12">
              <h2 className="title">Our Web Services</h2>
              <p>
                Professional solutions tailored to boost your online presence
              </p>
            </div>
            <div className="absolute right-0 top-1/3">
              <div className="flex items-center gap-x-3">
                {/* UI */}
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleAdd} //step 2 in update
                >
                  <FaPlus className="size-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {dataServices?.data.map((item, key) => {
              return (
                <div key={key} className="relative">
                  <div className="absolute top-5 right-3">
                    <button
                      type="button"
                      data-tooltip="Edit"
                      className="text-white tooltip"
                      onClick={() => handleEdit(item)}
                    >
                      <FaPencil className="p-1 bg-primary rounded-full" />
                    </button>
                  </div>

                  <CardServices item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {isModalServices && (
        <ModalAddServices setIsModal={setIsModalServices} itemEdit={itemEdit} />
      )}
      {/* itemEdit={itemEdit} step-6 */}
    </>
  );
};

export default Services;
