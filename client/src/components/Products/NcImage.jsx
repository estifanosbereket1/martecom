import React, { FC } from "react";

const NcImage = ({
  containerClassName,
  alt = "nc-image",
  className = "object-cover w-full h-full",

  ...args
}) => {
  return (
    <div className={containerClassName}>
      <img className={className} alt={alt} {...args} />
    </div>
  );
};

export default NcImage;
