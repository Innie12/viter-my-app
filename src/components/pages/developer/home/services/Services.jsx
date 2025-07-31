import React from "react";
import { apiVersion } from "../../../../helpers/function-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { FaPlus, FaTable, FaTrash } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import { FaList, FaPencil } from "react-icons/fa6";
import ModalDeleteServices from "./ModalDeleteServices";
import ServicesTable from "./ServicesTable";
import ServicesList from "./ServicesList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../custom-hooks/queryDataInfinite";
import { InView, useInView } from "react-intersection-observer";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  const [isDeleteServices, setIsDeleteServices] = React.useState(false); //Step-1 delete
  const [itemEdit, setItemEdit] = React.useState(); //step 4

  const [page, setPage] = React.useState(1);
  const { ref, InView } = useInView();

  //step 9 - reset itemEdit when adding new service
  const [isTable, setIsTable] = React.useState(false);

  // const {
  //   isLoading,
  //   isFetching: isFetchingDataServices,
  //   error: errordataServices,
  //   data: dataServices,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/web-services/web-services.php`,
  //   "get",
  //   "web-services"
  // );

  // Loading -Create a folder in partial after this

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["web_services"],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, //search functionalities
        `${apiVersion}/controllers/developer/web-services/page.php?start=${pageParam}`, //loadmore functionalities
        false,
        {},
        "post"
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
  });

  React.useEffect(() => {
    if (InView) {
      setPage((prev) => prev + 1);
    }
  }, [InView]);

  const handleAdd = () => {
    setItemEdit(null); //step-10 - reset itemEdit when adding new service
    setIsModalServices(true);
  };

  const handleEdit = (item) => {
    //step 1
    // console.log(item); //step 3 - show info in card
    setItemEdit(item); //step 5 - save item to edit
    setIsModalServices(true);
  };

  const handleDelete = (item) => {
    setItemEdit(item); //step 2 - save item to delete
    setIsDeleteServices(true); //step 3 - open modal for delete confirmation
  };

  console.log(isTable);
  const handleToggleTable = () => {
    setIsTable(!isTable);
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
                  onClick={handleAdd} //step 2 in update
                >
                  <FaPlus className="size-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* DELETE */}

          {/* DELETE */}
          {isTable == true ? (
            <>
              <ServicesTable
                // dataServices={dataServices}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                result={result}
                error={error}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
                setPage={setPage}
                page={page}
                ref={ref}
              />
            </>
          ) : (
            <ServicesList
              // dataServices={dataServices}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              // next step (add the 5 then copy paste it in servicestable)
              result={result}
              error={error}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              status={status}
            />
          )}
        </div>
      </section>
      {isModalServices && (
        <ModalAddServices setIsModal={setIsModalServices} itemEdit={itemEdit} />
      )}
      {/* itemEdit={itemEdit} step-6 */}
      {isDeleteServices && (
        <ModalDeleteServices
          setIsModalDelete={setIsDeleteServices}
          mySqlEndpoint={`${apiVersion}/controllers/developer/web-services/web-services.php?id=${itemEdit.web_services_aid}`}
          queryKey="web-services" //step 4 - pass item to delete
        />
      )}
    </>
  );
};

export default Services;
