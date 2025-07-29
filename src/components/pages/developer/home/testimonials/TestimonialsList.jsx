import React from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import CardTestimonial from "../../../../partials/CardTestimonial";

const TestimonialsList = ({
  isLoading,
  isFetching,
  error,
  dataTestimonials,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  React.useEffect(() => {
    const testimonialCount = dataTestimonials?.data?.length ?? 0;

    if (testimonialCount === 0) {
      setCurrentSlide(0);
    } else if (currentSlide >= testimonialCount) {
      setCurrentSlide(testimonialCount - 1);
    }
  }, [dataTestimonials?.data, currentSlide]);
  
  return (
    <>
      {/* Testimonial Slider */}
      <div className="relative max-w-4xl mx-auto">
        {/* slides */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out "
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div></div>
            {dataTestimonials?.data.map((item, key) => {
              return (
                <React.Fragment key={key}>
                  <div key={key} className="relative">
                    <div className="absolute top-6 left-[51.8rem] flex ">
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
                  </div>
                  <CardTestimonial item={item} />
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? dataTestimonials.count - 1 : prev - 1
            )
          }
          className="absolute left-0 top-[10.5rem] -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <HiOutlineChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev == dataTestimonials.count - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-0 top-[10.5rem] -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <HiOutlineChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {/* {[0, 1, 2].map( */}
          {dataTestimonials?.data.map(
            (
              item,
              index //array 123 variable index
            ) => (
              <button
                key={index} //identifier ng button, ID
                onClick={() => setCurrentSlide(index)} //index(0,1,2) 1x100 - next slide
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TestimonialsList;
