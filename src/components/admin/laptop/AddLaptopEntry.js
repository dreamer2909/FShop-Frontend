import React from "react";
import { useState } from "react";
import { Modal, Input, Form, Button } from "antd";
export default function AddLaptopEntry(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [laptopEntry, setLaptopEntry] = useState({});


  const showModal = () => setIsModalVisible(true);

  const handleClose = () => setIsModalVisible(false);

  const handleChange = (event) =>
    setLaptopEntry({ ...laptopEntry, [event.target.name]: event.target.value });

  const fileHandleChange = (event) =>
    setLaptopEntry({ ...laptopEntry, image: event.target.files[0] });

  const handleValidation = () => {
    let isValid = true;
    if (!laptopEntry.sku) return false;
    if (!laptopEntry.name) return false;
    if (!laptopEntry.screen) return false;
    if (!laptopEntry.color) return false;
    if (!laptopEntry.cpu) return false;
    if (!laptopEntry.gpu) return false;
    if (!laptopEntry.ram) return false;
    if (!laptopEntry.rom) return false;
    if (!laptopEntry.weight) return false;
    if (!laptopEntry.size) return false;
    if (!laptopEntry.origin) return false;
    if (!laptopEntry.year) return false;
    if (!laptopEntry.price) return false;
    if (!laptopEntry.quantity) return false;
    if (!laptopEntry.image) return false;
    return isValid;
  };

  const handleSave = () => {
    props.addLaptopEntry(laptopEntry);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ float: "right", margin: "20px" }}
        type="primary"
        onClick={showModal}
      >
        Thêm phiên bản
      </Button>
      <Modal
        title="Thêm phiên bản"
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
            name="sku"
            label="Mã phiên bản"
            rules={[{ required: true, message: "Vui lòng nhập mã phiên bản" }]}
          >
            <Input name="sku" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên phiên bản"
            rules={[{ required: true, message: "Vui lòng nhập tên phiên bản" }]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="screen"
            label="Màn hình"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập màn hình",
              },
            ]}
          >
            <Input name="screen" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="color"
            label="Màu sắc"
            rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
          >
            <Input name="color" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="cpu"
            label="CPU"
            rules={[{ required: true, message: "Vui lòng nhập CPU" }]}
          >
            <Input name="cpu" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="gpu"
            label="GPU"
            rules={[{ required: true, message: "Vui lòng nhập GPU" }]}
          >
            <Input name="gpu" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="ram"
            label="RAM"
            rules={[{ required: true, message: "Vui lòng nhập RAM" }]}
          >
            <Input name="ram" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="rom"
            label="ROM"
            rules={[{ required: true, message: "Vui lòng nhập ROM" }]}
          >
            <Input name="rom" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Cân nặng"
            rules={[{ required: true, message: "Vui lòng nhập cân nặng" }]}
          >
            <Input name="weight" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="size"
            label="Kích thước"
            rules={[{ required: true, message: "Vui lòng nhập kích thước" }]}
          >
            <Input name="size" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="origin"
            label="Xuất xứ"
            rules={[{ required: true, message: "Vui lòng nhập xuất xứ" }]}
          >
            <Input name="origin" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="year"
            label="Năm"
            rules={[{ required: true, message: "Vui lòng nhập năm" }]}
          >
            <Input name="year" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input name="price" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <Input name="quantity" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: "Vui lòng thêm ảnh" }]}
          >
            <Input type="file" name="image" onChange={fileHandleChange}></Input>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
    </div>
  );
}
