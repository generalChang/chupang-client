import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Button, Input, Form, message } from "antd";
import FileUpload from "../../../utils/FileUpload";
import { API_URL, Categorys } from "../../Config";
import axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;
function ProductUPloadPage(props) {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categorys, setCategorys] = useState(1);
  const [price, setPrice] = useState(0);
  const user = useSelector((state) => state.user);
  const updateImages = (images) => {
    setImages(images);
  };

  const onCategorysChange = (e) => {
    setCategorys(e.currentTarget.value);
  };

  const onDescChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.currentTarget.value);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (
      images.length === 0 ||
      !title ||
      !description ||
      !categorys ||
      price == 0
    ) {
      message.warning("모든 필드를 입력해주세요.");
      return;
    }

    let body = {
      writer: user.userData._id,
      title,
      description,
      categorys,
      price,
      images,
    };

    axios
      .post(`${API_URL}/api/product/upload`, body)
      .then((result) => {
        if (result.data.success) {
          message.success("Successfully upload your product!!");
          props.history.push("/");
        } else {
          message.warning("Failed to upload your product..");
        }
      })
      .catch((err) => {
        message.error("Error.. try it later.. Sorry..");
      });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "4rem auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>Upload</Title>
      </div>
      <Form onSubmit={handleUpload}>
        <FileUpload updateImages={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input
          type="text"
          size="large"
          placeholder="title.."
          onChange={onTitleChange}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea rows={4} onChange={onDescChange} />
        <br />
        <br />
        <select onChange={onCategorysChange}>
          {Categorys.map((ct, index) => {
            return (
              <option key={index} value={ct.key}>
                {ct.value}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <label>Price($)</label>
        <Input type="number" size="large" onChange={onPriceChange} /> $
        <br />
        <br />
        <Button
          size="large"
          type="primary"
          danger
          htmlType="submit"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(ProductUPloadPage);
