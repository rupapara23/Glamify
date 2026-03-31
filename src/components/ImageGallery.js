import React, { useState } from "react";

const ImageGallery = () => {
  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="gallery-container">
      
      <div className="main-image">
        <img src={mainImage} alt="Main" />
      </div>

      <div className="side-images">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={img === mainImage ? "active" : ""}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;