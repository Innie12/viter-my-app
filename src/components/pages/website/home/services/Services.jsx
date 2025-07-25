import React from "react";
import CardServices from "../../../../partials/CardServices";

const Services = () => {
  return (
    <>
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="title">Our Web Services</h2>
            <p>Professional solutions tailored to boost your online presence</p>
          </div>

          {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <CardServices
              img={"./images/card-icon-web-development.webp"}
              alt={"Web Development Image"}
              title={"Web Development"}
              description={
                "Custom websites built with modern frameworks like Next.js and React for optimal performance."
              }
              btn={"View Packages"}
            />
            <CardServices
              img={"./images/card-icon-ui-ux-design.webp"}
              alt={"UI/UX Design Image"}
              title={"UI/UX Design"}
              description={
                "Beautiful interfaces designed to convert visitors with strategic user experience flows."
              }
              btn={"See Portfolio"}
            />
            <CardServices
              img={"./images/card-icon-seo-optimization.webp"}
              alt={"SEO Optimization Image"}
              title={"SEO Optimization"}
              description={
                "Increase your visibility on search engines with our data-driven SEO strategies."
              }
              btn={"Get Audit"}
            />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Services;
