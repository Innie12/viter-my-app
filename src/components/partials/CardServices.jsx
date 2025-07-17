import React from "react";

const CardServices = ({ img, alt, title, description, btn }) => {
  return (
    <>
      <div className="card">
        <img src={img} alt={alt} />
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#">{btn} &rarr;</a>
      </div>
    </>
  );
};

export default CardServices;
