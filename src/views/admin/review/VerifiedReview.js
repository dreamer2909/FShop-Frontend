import { Button, notification, Table } from 'antd';
import React, { useEffect, useReducer } from 'react'
import { SERVER_URL } from '../../../constant';
import { tableReducer } from '../../../reducers';

export default function VerifiedReview() {
    const [comments, dispatch] = useReducer(tableReducer, []);

    useEffect(() => {
      getPendingReviews();
    }, []);
  
    const openNotification = (type, msg) => {
      notification[type]({
        message: msg,
        duration: 1,
      });
    };
  
    const getPendingReviews = () => {
      fetch(SERVER_URL + "comment/status=1")
        .then((response) => response.json())
        .then((result) =>
          dispatch({
            type: "GET_DATA_TABLE",
            payload: result,
          })
        )
        .catch((err) => console.log(err));
    }
  
    const updateStatus = (id, status) => {
      fetch(SERVER_URL + `comment/id=${id}/status=${status}`, {
        method: "PUT",
      })
        .then((response) => {
          getPendingReviews();
          openNotification("success", "Cập nhật thành công");
        })
        .catch((err) => {
          console.log(err);
          openNotification("error", "Có lỗi xảy ra");
        });
    }
  
    const columns = [
      {
        title: "Bình luận",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "Đánh giá",
        dataIndex: "rating",
        key: "rating",
      },
      {
        title: "Tên người dùng",
        dataIndex: "authorName",
        key: "authorName",
      },
      {
        title: "Sản phẩm",
        dataIndex: "productEntry",
        key: "productEntry",
        render: (text, record) => (
          <>
            <p>{record.productEntry.nameEntry}</p>
          </>
        ),
      },
      {
        title: "Ngày mua hàng",
        dataIndex: "orderDetail",
        key: "orderDetail",
        render: (text, record) => (
          <>
            <p>{record.orderDetail.createdAt}</p>
          </>
        ),
      },
      {
        title: "Duyệt đánh giá",
        key: "action1",
        render: (text, record) => (
          <>
            <Button onClick={() => updateStatus(record.id, 0)}>Huỷ Duyệt</Button>
          </>
        ),
      },
    ];
    return (
      <div>
        <Table dataSource={comments} columns={columns}></Table>
      </div>
    );
}
