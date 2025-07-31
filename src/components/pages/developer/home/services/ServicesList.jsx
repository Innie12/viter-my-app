import React from "react";
import CardServices from "../../../../partials/CardServices";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import FetchingSpinner from "../../../../partials/spinners/fetchingSpinner";
import TableLoading from "../../../../partials/spinners/TableLoading";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import Loadmore from "../../../../partials/LoadMore";

const ServicesList = ({
  dataServices,
  handleAdd,
  handleEdit,
  handleDelete,
  result,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
  setPage,
  page,
  ref,
}) => {
  return (
    <>
      {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {dataServices?.data.map((item, key) => {
          return (
            <div key={key} className="relative">
              <div className="absolute top-5 right-3">
                <button // 1ST STEP
                  type="button"
                  data-tooltip="Edit"
                  className="tooltip text-white"
                  onClick={() => handleEdit(item)}
                >
                  <FaPencil className="p-1 bg-primary rounded-full" />
                </button>
                <button // 1ST STEP
                  type="button"
                  data-tooltip="Delete"
                  className="tooltip text-red-600"
                  onClick={() => handleDelete(item)}
                >
                  <FaTrash className="p-1 bg-primary rounded-full" />
                </button>
              </div>
              <CardServices item={item} />
            </div>
          );
        })}
      </div> */}
      <div className="relative">
        {isFetching && status != "pending" && <FetchingSpinner />}
        <div className="min-h-[25.5rem] min-x-full overflow-x-auto flex flex-row items-center gap-10">
          {(status == "pending" || result?.pages[0].data.length == 0) && (
            <div className="text-center w-full">
              {status == "pending" ? <TableLoading /> : <NoData />}
            </div>
          )}
          {error && (
            <div className="text-center w-full">
              <ServerError />
            </div>
          )}
          {result?.pages.map((page, key) => (
            <React.Fragment key={key}>
              {page?.data.map((item, key) => {
                return (
                  <div key={key} className="relative">
                    <div className="bg-gray-200 min-h-80 min-w-96 rounded-md relative">
                      <div className="p-5 flex flex-col items-center gap-3">
                        <div className="min-w-20 min-h-20">
                          <img
                            src={item.web_services_image}
                            alt={item.web_services_image}
                          />
                        </div>
                        <div className="">
                          <h4>{item.web_services_name}</h4>
                          <p>{item.web_services_description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-5 right-3 z-10">
                      <div className="flex items-center justify-end gap-x-3 mr-5">
                        <button // 1ST STEP
                          type="button"
                          data-tooltip="Edit"
                          className="tooltip"
                          onClick={() => handleEdit(item)}
                        >
                          <FaPencil className="size-4" />
                        </button>
                        <button // 1ST STEP
                          type="button"
                          data-tooltip="Delete"
                          className="tooltip"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          <div>
            <Loadmore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesList;
