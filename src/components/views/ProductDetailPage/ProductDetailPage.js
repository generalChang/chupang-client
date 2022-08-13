import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Typography, message, Row, Col } from "antd";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductDescription from "./Sections/ProductDescription";
import Comment from "./Sections/Comment";

const { Title } = Typography;
function ProductDetailPage(props) {
  const productId = props.match.params.id;
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
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

    let body = {
      productId,
    };
    getComments(body);
  }, []);

  const getComments = (body) => {
    axios
      .post("/api/comment/comments", body)
      .then((result) => {
        if (result.data.success) {
          setComments(result.data.comments);
        } else {
          message.warning("Failed to get comments... sorry..");
        }
      })
      .catch((err) => {
        message.error("Failed to get comments... sorry..");
      });
  };

  const updateComments = () => {
    let body = {
      productId,
    };

    getComments(body);
  };
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
          <div style={{ margin: "3rem auto" }}>
            <Title level={3}>Comments</Title>
            <Row gutter={[16, 16]}>
              <Col lg={18} xs={24}>
                <Comment
                  comments={comments}
                  updateComments={updateComments}
                  productId={productId}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ProductDetailPage);
