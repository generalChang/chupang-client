import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../../Config";
function ProductImage(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props && props.images) {
      let newImages = [];
      props.images.map((image, index) => {
        newImages.push({
          original: `${API_URL}/${image}`,
          thumbnail: `${API_URL}/${image}`,
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
