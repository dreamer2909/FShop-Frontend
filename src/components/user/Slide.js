import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";
import "../../Style.css";
import React from "react";

const Slide = () => {
  return (
    <>
      <Carousel
        autoplay
        arrows
        nextArrow={<RightOutlined />}
        prevArrow={<LeftOutlined />}
        style={{ marginTop: "30px" }}
      >
        <div>
          <Image src="/assets/images/slide1.jpg"></Image>
        </div>
        <div>
          <Image src="/assets/images/slide2.jpg"></Image>
        </div>
        <div>
          <Image src="/assets/images/slide3.jpg"></Image>
        </div>
      </Carousel>
    </>
  );
};

export default Slide;
