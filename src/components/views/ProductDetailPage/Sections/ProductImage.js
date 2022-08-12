import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { withRouter } from "react-router-dom";

function ProductImage(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props && props.images) {
      let newImages = [];
      props.images.map((image, index) => {
        newImages.push({
          original: `http://localhost:5000/${image}`,
          thumbnail: `http://localhost:5000/${image}`,
        });
      });
      setImages(newImages);
    }
  }, [props]);
  return (
    <div>
      <ReactImageGallery items={images} />
    </div>
  );
}

export default withRouter(ProductImage);
