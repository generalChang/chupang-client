import React from "react";
import { withRouter } from "react-router-dom";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <Carousel autoplay>
      {props.images &&
        props.images.map((image, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                style={{
                  width: "100%",
                  height: "150px",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
                src={`http://localhost:5000/${image}`}
                alt="carousel image"
              />
            </div>
          );
        })}
    </Carousel>
  );
}

export default withRouter(ImageSlider);
