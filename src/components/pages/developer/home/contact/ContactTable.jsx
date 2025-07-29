import React from "react";
import CardServices from "../../../../partials/CardServices";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

const ContactTable = ({
  isLoading,
  isFetching,
  error,
  dataServices,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <table>
        <thead>
          <th>#</th>
          <th>Fullname</th>
          <th>Email</th>
          <th>Message</th>
          <th>Action</th>
        </thead>
        <tbody>
          {dataServices?.data.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.contact_fullname}</td>
                <td>{item.contact_email}</td>
                <td>{item.contact_message}</td>
                <td>
                  <div className="flex items-center gap-x-3">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ContactTable;
