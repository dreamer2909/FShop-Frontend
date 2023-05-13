import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Comment,
  Form,
  Input,
  List,
  Modal,
  Progress,
  Rate,
  Result,
  Row,
  Tag,
  Tooltip,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { SERVER_URL } from "../../constant";
import moment from "moment";
import { CheckCircleFilled, StarFilled } from "@ant-design/icons";

export default function Review(props) {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState({
    status: 0,
    rating: 3,
    entryId: props.entry_id,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const desc = [
    "Không thích",
    "Tạm được",
    "Bình thường",
    "Hài lòng",
    "Tuyệt vời",
  ];

  useEffect(() => {
    getComments();
  }, []);

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      duration: 1,
    });
  };

  const showModal = () => setIsModalVisible(true);

  const handleClose = () => setIsModalVisible(false);

  const getComments = async () => {
    await fetch(SERVER_URL + `comment/entry_id=${props.entry_id}/status=1`)
      .then((response) => response.json())
      .then((result) => setComments(result))
      .catch((err) => console.log(err));
  };

  const addComment = async () => {
    const x = await (
      await fetch(SERVER_URL + "comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(comment),
      })).json();

    await getComments();
    if (x == 1) {
      Modal.warning({
        title: 'Bạn đã đánh giá sản phẩm này',
        content: 'Bạn chỉ được đánh giá sản phẩm một lần'
      })
    }
    else if (x == 0)
      Modal.warning({
        title: "Đơn hàng chưa được giao",
        content:
          "Đơn hàng chưa được nhận, vui lòng trải nghiệm sản phẩm để đánh giá!",
      });
      else if (x == 2) {
        Modal.success({
          title: 'Đánh giá thành công',
          content: 'Đánh giá của bạn đang chờ được duyệt'
        })
      }
  };

  const handleSubmit = () => {
    console.log(comment);
    if (!comment.content) return;
    addComment();
  };

  const handleChangeContent = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleChangeRating = (value) => {
    setRating(value);
    setComment({ ...comment, rating: value });
  };

  const RatePercent = (props) => (
    <>
      <Row style={{ width: "500px" }}>
        <Col span={4}>
          <span>
            {props.rating} <StarFilled style={{ color: "#F9DA14" }} />
          </span>
        </Col>
        <Col span={20}>
          <Progress
            style={{ display: "inline-block" }}
            percent={Math.round(
              (comments.reduce((total, current) => {
                return total + (current.rating === props.rating);
              }, 0) /
                comments.length) *
                100
            )}
            size="small"
            format={(percent) => <b>{`${percent}%`}</b>}
          ></Progress>
        </Col>
      </Row>
    </>
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={5}>Bạn chấm sản phẩm này bao nhiêu sao?</Title>
          <Rate
            tooltips={desc}
            onChange={handleChangeRating}
            value={rating}
          ></Rate>
          {rating ? (
            <span style={{ marginLeft: "20px" }}>{desc[rating - 1]}</span>
          ) : (
            ""
          )}

          <div style={{ marginTop: "30px" }}>
            <RatePercent rating={5}></RatePercent>
            <RatePercent rating={4}></RatePercent>
            <RatePercent rating={3}></RatePercent>
            <RatePercent rating={2}></RatePercent>
            <RatePercent rating={1}></RatePercent>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={comments}
            header={<b>{`${comments.length} đánh giá`}</b>}
            renderItem={(item) => (
              <li>
                <Comment
                  author={
                    <>
                      <Title level={5}>{item.authorName}</Title>
                      <span style={{ fontWeight: "bold" }}>
                        {desc[item.rating - 1]}
                      </span>
                      {/* <Rate disabled value={item.rating}></Rate> */}
                    </>
                  }
                  avatar={
                    <Avatar
                      style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    >
                      {item.authorName[0]}
                    </Avatar>
                  }
                  content={item.content}
                  datetime={
                    <Tag icon={<CheckCircleFilled />} color="success">
                      Đã mua hàng ngày{" "}
                      {item.orderDetail.createdAt.slice(
                        0,
                        item.orderDetail.createdAt.indexOf(",")
                      )}
                    </Tag>
                  }
                ></Comment>
              </li>
            )}
          ></List>
        </Col>
        <Col span={12}>
          <Comment
            content={
              <>
                <Form>
                  <Form.Item name="authorName" label="Tên">
                    <Input
                      name="authorName"
                      style={{ width: "500px", float: "right" }}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                    />
                  </Form.Item>
                  <Form.Item name="orderId" label="Mã hoá đơn">
                    <Input
                      name="orderId"
                      style={{ width: "500px", float: "right" }}
                      onChange={handleChange}
                      placeholder="Nhập mã hoá đơn bạn đã mua hàng"
                    />
                  </Form.Item>
                  <Form.Item>
                    <TextArea
                      placeholder="Bạn có khuyên người khác dùng sản phẩm này không? Tại sao?"
                      rows={4}
                      onChange={handleChangeContent}
                      // value={content}
                    ></TextArea>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{ float: "right" }}
                      htmlType="submit"
                      loading={submitting}
                      onClick={handleSubmit}
                      type="primary"
                    >
                      Gửi đánh giá
                    </Button>
                  </Form.Item>
                </Form>
              </>
            }
          ></Comment>
        </Col>
      </Row>
    </div>
  );
}
