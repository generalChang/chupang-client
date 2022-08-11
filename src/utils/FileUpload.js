import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
function FileUpload(props) {
  const [images, setImages] = useState([]);

  const handleUpload = (files) => {
    let formData = new FormData();

    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("file", files[0]);

    axios
      .post("/api/product/image", formData, config)
      .then((result) => {
        if (result.data.success) {
          let newImages = [...images, result.data.url];
          setImages(newImages);
          props.updateImages(newImages);
        } else {
          message.warning("Failed to upload your product images..");
        }
      })
      .catch((err) => {
        message.error("Error.. try it again..");
      });
  };

  const handleDeleteImage = (url) => {
    let newImages = [...images];

    let index = newImages.indexOf(url);
    if (index !== -1) {
      newImages.splice(index, 1);
    }

    setImages(newImages);
    props.updateImages(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          width: "350px",
          height: "240px",
          overflowX: "scroll",
          display: "flex",
        }}
      >
        {images.map((image, index) => {
          return (
            <img
              key={index}
              style={{
                width: "300px",
                height: "240px",
                objectFit: "contain",
              }}
              src={`http://localhost:5000/${image}`}
              alt="product image"
              onClick={() => {
                handleDeleteImage(image);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(FileUpload);
