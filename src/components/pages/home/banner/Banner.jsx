import React from "react";

const Banner = () => {
  return (
    <>
      <section className="pt-36 pb-12 bg-white md:pt-44 md:pb-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <img
              className="rounded-xl shadow-md object-cover"
              src="../images/banner-home.webp"
              alt="This is 2 people working together."
            />
            <div>
              <span className="uppercase text-blue-600 font-bold">
                about our program
              </span>
              <h2 className="title">We Deliver Innovative Solutions</h2>
              <p className="mb-6">
                Founded in 2025, we help businesses transform their ideas into
                reality through cutting-edge technology and expert consulting
                services. Our team of 50+ professionals delivers measurable
                results.
              </p>
              <div className="flex flex-col gap-4 md:flex-row">
                <a href="#" className="btn btn--blue ">
                  Learn More
                </a>
                <a href="#" className="btn btn--gray">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
