import React from "react";
import { Form, Modal, Input } from "antd";
import { Button } from "antd";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";

export default function AddBrand (props) {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [brand, setBrand] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })

  const showModal = () => setIsModalVisible(true)

  const handleClose = () => setIsModalVisible(false)

  const handleChange = (event) => setBrand({ ...brand, [event.target.name]: event.target.value })

  const fileHandleChange = (event) => setBrand({ ...brand, [event.target.name]: event.target.files[0] })

  const handleValidation = () => {
    let isValid = true;
    if (!brand.name || !brand.email || !brand.address || !brand.image)
      isValid = false
    return isValid
  }

  const handleSave = () => {
    props.addBrand(brand)
    form.resetFields()
    handleClose()
  }

  return (
    <div>
      <Button style={{ float: "right", margin: "20px" }} type="primary" onClick={showModal}>
        Thêm nhà sản xuất
      </Button>

      <Modal
        title="Thêm nhà cung cấp"
        closable={true}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          encType="multipart/form-data"
          onFinish={handleValidation && handleSave}
        >
          <Form.Item
            name="name"
            label="Tên nhà sản xuất"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà sản xuất" },
            ]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
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
            label="Banner"
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
            <Button
              type="primary"
              htmlType="submit"
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
