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
import { Price } from "../../Config";
import SearchTerm from "./Sections/SearchTerm";
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {
  const [filters, setFilters] = useState({
    categorys: [],
    price: [],
  });
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [isNext, setIsNext] = useState(false);
  const [searchText, setSearchText] = useState("");
  const getProducts = (body) => {
    axios
      .post("/api/product/products", body)
      .then((result) => {
        if (result.data.success) {
          if (body.loadMore) {
            setProducts([...products, ...result.data.products]);
          } else {
            setProducts(result.data.products);
          }

          setIsNext(result.data.isNext);
        } else {
          message.warning("Failed to load products.. sorry..");
        }
      })
      .catch((err) => {
        message.error("Error.. try it again.. Im sorry...");
      });
  };

  useEffect(() => {
    let body = {
      skip,
      limit,
    };
    getProducts(body);
  }, []);

  const handlePrice = (fts) => {
    let price_arr = [];
    Price.forEach((pr, index) => {
      if (pr._id === fts) {
        price_arr = pr.array;
      }
    });

    return price_arr;
  };

  const showFiltersResult = (fts) => {
    let body = {
      skip: 0,
      limit,
      filters: fts,
      searchText,
    };

    getProducts(body);
    setSkip(0);
  };
  const handleFilters = (fts, mode) => {
    const newFilters = { ...filters };

    if (mode === "price") {
      newFilters[mode] = handlePrice(fts);
    } else {
      newFilters[mode] = fts;
    }

    showFiltersResult(newFilters);
    setFilters(newFilters);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={`${product.title}`} description={`${product.price}$`} />
        </Card>
      </Col>
    );
  });

  const handleLoadMore = (e) => {
    e.preventDefault();

    let newSkip = skip + limit;
    let body = {
      skip: newSkip,
      limit,
      loadMore: true,
      filters,
      searchText,
    };

    getProducts(body);
    setSkip(newSkip);
  };

  const handleSearchText = (st) => {
    let body = {
      skip: 0,
      limit,
      filters,
      searchText: st,
    };
    getProducts(body);
    setSearchText(st);
  };
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchTerm handleSearchText={handleSearchText} />
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>
      <Divider />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isNext && (
          <Button
            type="primary"
            size="large"
            onClick={handleLoadMore}
            shape="round"
          >
            더보기
          </Button>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
