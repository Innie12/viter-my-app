import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const TestimonialsTable = ({
  isLoading,
  isFetching,
  error,
  dataTestimonials,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <table>
        <thead>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Position</th>
          <th>Comment</th>
          <th>Action</th>
        </thead>
        <tbody>
          {dataTestimonials?.data.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <img
                  src={item.testimonials_images}
                  alt={item.testimonials_images}
                  className="w-16 h-16 rounded-full object-cover my-2"
                />
                <td>{item.testimonials_name}</td>
                <td>{item.testimonials_position}</td>
                <td>{item.testimonials_comment}</td>
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

export default TestimonialsTable;
