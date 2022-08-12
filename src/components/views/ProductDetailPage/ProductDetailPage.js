import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Typography, message, Row, Col } from "antd";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductDescription from "./Sections/ProductDescription";

const { Title } = Typography;
function ProductDetailPage(props) {
  const productId = props.match.params.id;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/product/productById?type=single&id=${productId}`)
      .then((result) => {
        if (result.data.success) {
          setProduct(result.data.products[0]);
        } else {
          message.warning("Failed to view product...");
        }
      })
      .catch((err) => {
        message.error("Error.. try it again.. so sorry..");
      });
  }, []);
  return (
    <div style={{ width: "85%", margin: "4rem auto" }}>
      {product && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem auto",
            }}
          >
            <Title>{product.title}</Title>
          </div>

          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <ProductImage images={product.images} />
            </Col>
            <Col lg={12} xs={24}>
              <ProductDescription detail={product} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default withRouter(ProductDetailPage);
