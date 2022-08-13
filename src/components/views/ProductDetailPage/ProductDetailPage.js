import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Typography, message, Row, Col, Button } from "antd";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductDescription from "./Sections/ProductDescription";
import Comment from "./Sections/Comment";
import { API_URL } from "../../Config";
const { Title } = Typography;
function ProductDetailPage(props) {
  const productId = props.match.params.id;
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [isNext, setIsNext] = useState(false);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/product/productById?type=single&id=${productId}`)
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
      skip,
      limit,
    };
    getComments(body);
  }, []);

  const getComments = (body) => {
    axios
      .post(`${API_URL}/api/comment/comments`, body)
      .then((result) => {
        if (result.data.success) {
          if (body.loadMore) {
            setComments([...comments, ...result.data.comments]);
          } else {
            setComments(result.data.comments);
          }
          setIsNext(result.data.isNext);
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
      limit,
      skip: 0,
    };

    setSkip(0);
    getComments(body);
  };

  const handleLoadMore = (e) => {
    e.preventDefault();

    let newSkip = skip + limit;
    let body = {
      productId,
      skip: newSkip,
      limit,
      loadMore: true,
    };

    getComments(body);
    setSkip(newSkip);
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
                <div
                  style={{
                    marginTop: "1rem auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {isNext && (
                    <Button type="primary" danger onClick={handleLoadMore}>
                      더보기
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ProductDetailPage);
