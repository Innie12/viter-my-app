import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="mx-auto py-20">
        <div className="justify-items-center">
          <img src="./images/sadness.webp" alt="picture of sadness crying" />
        </div>
        <div className="text-center">
          <h1 className="text-9xl mb-3 font-bold text-blue-700/30">404</h1>
          <p className="mb-10 text-3xl">Oppss...This Page Not Found!</p>
          <Link
            to="/"
            className="inline-block underline text-gray-900 text-xl transition transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
