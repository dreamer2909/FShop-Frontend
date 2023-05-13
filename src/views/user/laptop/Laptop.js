import { Col, Row, Button, BackTop } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LaptopCard from "../../../components/user/laptop/LaptopCard";
import { SERVER_URL } from "../../../constant";
import React from "react";
import CheckableTag from "antd/lib/tag/CheckableTag";

const Laptop = () => {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [brands, setBrands] = useState([]);
  const tags = [
    "Macbook",
    "Học tập, văn phòng",
    "Đồ hoạ, kỹ thuật",
    "Mỏng nhẹ",
    "Gaming",
    "Cao cấp, sang trọng",
  ];
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
 
    setSelectedTags(nextSelectedTags);
    getLaptops()
  };

  useEffect(() => {
    getBrands();
    getLaptops();
  }, []);

  const getLaptops = () => {
    fetch(SERVER_URL + "products/laptops")
      .then((response) => response.json())
      .then((result) => {
        setLaptops(result);
      })
      .catch((err) => console.log(err));
  };

  const getBrands = () => {
    fetch(SERVER_URL + "brands")
      .then((response) => response.json())
      .then((result) => setBrands(result))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Row gutter={[16, 24]}>
        {brands.map((brand, index) => (
          <Button
            key={index}
            style={{
              height: "34px",
              borderRadius: "34px",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 14px",
              margin: "0 5px",
            }}
            onClick={() => {
              let name = brand.name.replaceAll("/", "-").replaceAll(" ", "-");
              navigate(`/laptop/brand/${name}`, {
                state: {
                  brand: brand,
                },
              });
            }}
          >
            <img
              style={{ height: "25px" }}
              alt=""
              src={`/assets/images/brands/${brand.image}`}
            ></img>
          </Button>
        ))}
      </Row>
      <Row gutter={[16, 24]}>
        {tags.map((tag, index) => {
          return (
            <CheckableTag
              style={{
                fontSize: "15px",
                padding: "0 14px",
                margin: "10px 40px",
              }}
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => {
                handleChange(tag, checked);
              }}
            >
              {tag}
            </CheckableTag>
          );
        })}
      </Row>

      <Row gutter={[16, 24]}>
        {
            selectedTags.length > 0 && laptops.filter(laptop => {
              for (const tag of selectedTags) {
                if (!laptop.tag.includes(tag)) return false;
              }
              return true;
            }).map((laptop, index) => {
              return (
                <Col span={6} key={index}>
                  <LaptopCard laptop={laptop} />
                </Col>
              );
            })
        }
        {selectedTags.length === 0 && laptops.map((laptop, index) => {
          return (
            <Col span={6} key={index}>
              <LaptopCard laptop={laptop} />
            </Col>
          );
        })}
      </Row>
      <BackTop style={{ right: "4px", borderRadius: "3" }} />
    </>
  );
};

export default Laptop;
