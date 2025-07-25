import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import CardTestimonial from "../../../../partials/CardTestimonial";
import { FaPlus } from "react-icons/fa";
import ModalAddTestimonials from "./ModalAddTestimonials";
import { apiVersion } from "../../../../helpers/function-general";
import useQueryData from "../../../../custom-hooks/useQueryData";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isModalTestimonials, setIsModalTestimonials] = React.useState(false);

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
    setIsModalTestimonials(true);
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
          {/* Testimonial Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* slides */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out "
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {dataTestimonials?.data.map((item, key) => {
                  return (
                    <React.Fragment key={key}>
                      <CardTestimonial item={item} />
                    </React.Fragment>
                  );
                })}

                {/* <CardTestimonial
                  img={"./images/testimonials-1.webp"}
                  alt={"Sarah Johnson"}
                  comment={
                    "The team delivered our project ahead of schedule with exceptional quality. Our online sales increased by 120% within three months!"
                  }
                  name={"Sarah Johnson"}
                  job={"Marketing Director, TechCorp"}
                />
                <CardTestimonial
                  img={"./images/testimonials-2.webp"}
                  alt={"Michael Chen"}
                  comment={
                    "From design to deployment, their attention to detail was impressive. They became true partners in our digital transformation journey."
                  }
                  name={"Michael Chen"}
                  job={"CEO, StartupHub"}
                />
                <CardTestimonial
                  img={"./images/testimonials-3.webp"}
                  alt={"Michael Chen"}
                  comment={
                    "Their SEO strategy tripled our organic traffic in 6 months. We've seen a dramatic improvement in lead quality and conversion rates."
                  }
                  name={"Emma Rodriguez"}
                  job={"CMO, GrowthSolutions"}
                /> */}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <HiOutlineChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
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
        </div>
        {isModalTestimonials && (
          <ModalAddTestimonials setIsModal={setIsModalTestimonials} />
        )}
      </section>
    </>
  );
};

export default Testimonials;
