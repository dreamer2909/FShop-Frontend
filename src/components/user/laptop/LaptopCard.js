import { Card, Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constant";
import React from "react";
const { Title } = Typography;

const LaptopCard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEntries(props.laptop.id);
  }, []);

  const showModal = () => setIsModalVisible(true);

  const handleClose = () => setIsModalVisible(false);

  const getEntries = () => {
    fetch(SERVER_URL + `product_entries/product_id=${props.laptop.id}`)
      .then((response) => response.json())
      .then((result) => setEntries(result))
      .catch((err) => console.log(err));
  };

  return (
    entries.length > 0 && (
      <>
        <Card
          style={{height: '350px', width: "100%", cursor: "pointer" }}
          cover={
            <img style={{height: '200px'}} alt="" src={`/assets/images/laptops/${entries[0].image}`} />
          }
          onClick={showModal}
        >
          <Title level={5}>{props.laptop.name}</Title>
          <p>Từ {entries[0].price}đ</p>
          <p>{entries.length} phiên bản</p>
        </Card>
        <Modal
          title="Chọn các phiên bản"
          closable={true}
          visible={isModalVisible}
          onCancel={handleClose}
          footer={null}
        >
          <Card title={props.laptop.name}>
            {entries.map((entry, index) => (
              <Card.Grid
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let name = entry.nameEntry
                    .replaceAll("/", "-")
                    .replaceAll(" ", "-");
                  navigate(`/laptop/${name}`, {
                    state: {
                      entry: entry,
                      laptop: props.laptop
                    },
                  });
                }}
              >
                <p>{entry.cpu}*</p>
                <p>{entry.gpu}*</p>
                <p>{entry.ram}*</p>
                <p>{entry.rom}*</p>
                <p>{entry.color}*</p>
                <b style={{ color: "deepskyblue", fontSize: "18px" }}>
                  {entry.price}đ
                </b>
              </Card.Grid>
            ))}
          </Card>
        </Modal>
      </>
    )
  );
};

export default LaptopCard;
