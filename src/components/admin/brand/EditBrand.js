import React from "react";
import { useState } from "react";
import { Form, Modal, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

export default function UpdateBrand(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [brand, setBrand] = useState(props.brand);

  const showModal = () => setIsModalVisible(true);

  const handleClose = () => setIsModalVisible(false);

  const handleChange = (event) =>
    setBrand({ ...brand, [event.target.name]: event.target.value });

  const fileHandleChange = (event) =>
    setBrand({ ...brand, [event.target.name]: event.target.files[0] });

  const handleValidation = () => {
    let isValid = true;
    if (!brand.name || !brand.email || !brand.address || !brand.image)
      isValid = false;

    return isValid;
  };

  const handleSave = () => {
    if (handleValidation()) {
      props.updateBrand(brand, props.id);
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={showModal}>Sửa</Button>
      <Modal
        title="Sửa nhà cung cấp"
        closable={true}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          encType="multipart/form-data"
          onFinish={handleValidation && handleSave}
        >
          <Form.Item
            id="name"
            name="name"
            label="Tên nhà sản xuất"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà sản xuất" },
            ]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            id="email"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
            ]}
          >
            <Input name="email" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            id="address"
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input name="address" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Logo"
            rules={[{ required: true, message: "Vui lòng thêm logo" }]}
          >
            <Input type="file" name="image" onChange={fileHandleChange}></Input>
          </Form.Item>

          <Form.Item
            name="banner"
            label="banner"
            rules={[{ required: true, message: "Vui lòng thêm Banner" }]}
          >
            <Input type="file" name="banner" onChange={fileHandleChange}></Input>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng thêm mô tả" }]}
          >
            <TextArea name="description" onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
