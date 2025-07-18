import React from "react";
import DashboardUpperNav from "../../../partials/DashboardUpperNav";
import DashboardSideNav from "../../../partials/DashboardSideNav";
import Header from "./header/Header";
import Banner from "./banner/Banner";
import About from "./about/About";
import Services from "./services/Services";
import Testimonials from "./testimonials/Testimonials";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";

const DashboardHome = () => {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(true);
  return (
    <>
      <DashboardUpperNav />
      <DashboardSideNav
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />
      <section
        className={`ml-[224px] absolute top-16 w-[calc(100dvw-224px)] h-[calc(100dvh-64px)] overflow-y-scroll transition-all ease-in-out duration-300 ${
          isSideNavOpen ? "" : "!ml-0 !w-full"
        }`}
      >
        <div className="page-container">
          <div className="content-wrap">
            <div className="container max-w-full">
              <Header />
              <Banner />
              <About />
              <Services />
              <Testimonials />
              <Contact />
            </div>
            <Footer />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardHome;
