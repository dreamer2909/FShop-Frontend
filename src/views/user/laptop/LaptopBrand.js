import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LaptopCard from "../../../components/user/laptop/LaptopCard";
import { SERVER_URL } from "../../../constant";

export default function LaptopBrand() {
  const { state } = useLocation();
  const { brand } = state;
  const [laptops, setLaptops] = useState([])
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    getLaptops();
  }, []);

  const getLaptops = () => {
    fetch(SERVER_URL + "products/laptops")
      .then((response) => response.json())
      .then((result) => {
          const filteredLaptops = result.filter(laptop => laptop.brand.id === brand.id)
          setLaptops(filteredLaptops)
          setQuantity(filteredLaptops.length)
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
        <Row gutter={[16, 24]}>
            <img alt="" src={`/assets/images/brands/${brand.banner}`}></img>
        </Row>
        <Row gutter={[0, 12]} style={{width: '80%'}}>
            <Title level={3}>{brand.name} <span style={{fontWeight: 'lighter'}}>({quantity} sản phẩm)</span></Title>
            <Title level={5}>{brand.description}</Title>
        </Row>
      <Row gutter={[16, 24]}>
        {laptops.map((laptop, index) => {
          return (
            <Col span={6} key={index}>
              <LaptopCard laptop={laptop} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
