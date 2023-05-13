import { Button, notification, Space, Table } from "antd";
import { useEffect, useReducer } from "react";
import { SERVER_URL } from "../../constant";
import AddBrand from "../../components/admin/brand/AddBrand";
import EditBrand from "../../components/admin/brand/EditBrand";
import { tableReducer } from "../../reducers";
import React from "react";

const openNotification = (type, msg) => {
  notification[type]({
    message: msg,
    duration: 1,
  });
};

export default function BrandList() {
  const columns = [
    {
      title: "Tên nhà sản xuất",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Xem chi tiết",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img alt="" src={"/assets/images/brands/" + record.image}></img>
      ),
    },
    {
      title: "Chỉnh sửa",
      key: "action",
      render: (text, record) => (
        <Space size="large">
          <EditBrand brand={record} id={record.id} updateBrand={updateBrand} />
          <Button
            onClick={() => {
              onDelClick(record.id);
            }}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const [brands, dispatch] = useReducer(tableReducer, []);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = () => {
    fetch(SERVER_URL + "brands")
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: "GET_DATA_TABLE",
          payload: result,
        });
      })
      .catch((err) => console.log(err));
  };

  const addBrand = (brand) => {
    const data = new FormData();
    data.append("name", brand.name);
    data.append("email", brand.email);
    data.append("address", brand.address);
    data.append("image", brand.image);
    data.append('description', brand.description)
    data.append('banner', brand.banner)

    fetch(SERVER_URL + "brands", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        getBrands();
        openNotification("success", "Thêm thành công");
      })
      .catch((err) => {
        console.log(err);
        openNotification("error", "Có lỗi xảy ra");
      });
  };

  const onDelClick = (id) => {
    if (window.confirm("Xác nhận xoá hãng sản xuất?")) {
      fetch(SERVER_URL + `brands/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          getBrands();
          openNotification("success", "Xoá thành công");
        })
        .catch((err) => {
          console.log(err);
          openNotification("error", "Có lỗi xảy ra");
        });
    }
  };

  const updateBrand = (brand, id) => {
    const data = new FormData();
    data.append("name", brand.name);
    data.append("email", brand.email);
    data.append("address", brand.address);
    data.append('description', brand.description);
    data.append("image", brand.image);

    fetch(SERVER_URL + `brands/${id}`, {
      method: "PUT",
      body: data,
    })
      .then((response) => {
        getBrands();
        openNotification("success", "Cập nhật thành công");
      })
      .catch((err) => {
        console.log(err);
        openNotification("error", "Có lỗi xảy ra");
      });
  };

  return (
    <>
      <AddBrand addBrand={addBrand} />
      <Table dataSource={brands} columns={columns}></Table>
    </>
  );
}
