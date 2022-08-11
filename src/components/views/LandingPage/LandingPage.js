import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Input,
  Typography,
  Row,
  Col,
  message,
  Carousel,
  Card,
} from "antd";
import CheckBox from "./Sections/CheckBox";
import axios from "axios";
import ImageSlider from "../../../utils/ImageSlider";
import RadioBox from "./Sections/RadioBox";
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {
  const [filters, setFilters] = useState({
    categorys: [],
    price: [],
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let body = {};

    axios
      .post("/api/product/products", body)
      .then((result) => {
        if (result.data.success) {
          setProducts(result.data.products);
        } else {
          message.warning("Failed to load products.. sorry..");
        }
      })
      .catch((err) => {
        message.error("Error.. try it again.. Im sorry...");
      });
  }, []);

  const handleFilters = (fts, mode) => {
    const newFilters = { ...filters };

    if (mode === "price") {
    } else {
      newFilters[mode] = fts;
    }
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable cover={<ImageSlider images={product.images} />}>
          <Meta title={`${product.title}`} description={`${product.price}$`} />
        </Card>
      </Col>
    );
  });
  return (
    <div style={{ margin: "4rem auto", width: "85%" }}>
      <div>
        <Title level={2}>Products</Title>
      </div>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            handleFilters={(fts) => {
              handleFilters(fts, "categorys");
            }}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            handleFilters={(fts) => {
              handleFilters(fts, "price");
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
