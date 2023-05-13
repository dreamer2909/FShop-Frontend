import { Button, List, Modal } from "antd";
import React, { useState } from "react";
import { SERVER_URL } from "../../../constant";

export default function ReceiptDetail(props) {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  const handleClick = () => {
      getItems(props.order_id)
      showModal()
  }

  const getItems = (order_id) => {
    fetch(SERVER_URL + `item/${order_id}`)
      .then((response) => response.json())
      .then((result) => {
          setItems(result)
          console.log(result)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button onClick={handleClick}>Xem chi tiết</Button>
      <Modal
        title="Hoá đơn chi tiết"
        closable={true}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <List
          size="small"
          bordered
          dataSource={items}
          renderItem={(item) => <List.Item>
              <b>{item.productEntry.product.name + ' ' + item.productEntry.nameEntry}</b>
              <b style={{marginRight: '30px'}}>{item.quantity}</b>
              <b>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}</b>
          </List.Item>}
        />
      </Modal>
    </div>
  );
}
