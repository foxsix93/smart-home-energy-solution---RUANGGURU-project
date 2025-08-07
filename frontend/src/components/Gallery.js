import React from "react";

const Gallery = ({ images }) => {
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden h-[300px] flex items-center">
      <div className="flex space-x-4 animate-infinite-scroll">
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-none w-64 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={image}
              alt={`gallery-item-${index}`}
              className="w-full h-[300px] object-cover rounded-lg shadow-xl"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 h-full w-1/12 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-1/12 bg-gradient-to-l from-white via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Gallery;
