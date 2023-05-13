import { Button, Modal } from "antd";
import React, { useState } from "react";
import { SERVER_URL } from "../../constant";

export default function Description(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const [product, setProduct] = useState({});

  const getProduct = () => {
    fetch(SERVER_URL + `products/product_id=${props.product.id}`)
      .then((response) => response.json())
      .then((result) => setProduct(result))
      .catch((err) => console.log(err));
  };

  const handleClose = () => setIsModalVisible(false);
  return (
    <>
      <Button
        onClick={() => {
          getProduct();
          showModal();
        }}
      >
        Xem mô tả
      </Button>
      <Modal
        title="Mô tả sản phẩm"
        closable={true}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={600}
      >
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </Modal>
    </>
  );
}
