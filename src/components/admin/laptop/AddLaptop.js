import React, { useRef } from "react";
import { useState } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;

export default function AddLaptop(props) {
  const editorRef = useRef(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState([])
  const [laptop, setLaptop] = useState({
    name: "",
    brandName: "",
    type: "laptop",
    description: "",
    tag: "",
  });

  const showModal = () => setIsModalVisible(true);

  const handleClose = () => setIsModalVisible(false);

  const handleChange = (event) =>
    setLaptop({ ...laptop, [event.target.name]: event.target.value });

  const handleEditor = (event) =>
    setLaptop({ ...laptop, description: editorRef.current.getContent() });

    const handleTags = (value) => {
      setTags(value)
      setLaptop({...laptop, tag: tags.join(' ')})
    }
  const handleValidation = () => {
    let isValid = true;
    if (!laptop.name || !laptop.brandName) isValid = false;
    return isValid;
  };

  const handleSave = () => {
    props.addLaptop(laptop);
    form.resetFields();
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ float: "right", margin: "20px" }}
        type="primary"
        onClick={showModal}
      >
        Thêm laptop
      </Button>

      <Modal
        title="Thêm laptop"
        closable={true}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleValidation && handleSave}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên laptop" }]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="brandName"
            label="Hãng sản xuất"
            rules={[{ required: true, message: "Vui lòng chọn hãng sản xuất" }]}
          >
            <Select
              showSearch
              name="brandName"
              onChange={(value) => setLaptop({ ...laptop, brandName: value })}
            >
              {props.brands.map((brand) => (
                <Option key={brand.name} value={brand.name}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Editor
              apiKey="souy9o75yqw0j2ootcc8koeu9yn3zunkr9ylhgp4kel4gd4i"
              onInit={(evt, editor) => (editorRef.current = editor)}
              onChange={handleEditor}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | image + | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Form.Item>
          <Form.Item
            name="tag"
            label="Tag"
            rules={[{ required: true, message: "Vui lòng nhập tên tag" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn tag"
              onChange={handleTags}
              optionLabelProp="label"
            >
              <Option value="Học tập, văn phòng" label="Học tập, văn phòng">
                Học tập, văn phòng
              </Option>
              <Option value="Đồ hoạ, kỹ thuật" label="Đồ hoạ, kỹ thuật">
                Đồ hoạ, kỹ thuật
              </Option>
              <Option value="Mỏng nhẹ" label="Mỏng nhẹ">
               Mỏng nhẹ
              </Option>
              <Option value="Cao cấp, sang trọng" label="Cao cấp, sang trọng">
                Cao cấp, sang trọng
              </Option>
              <Option value="Gaming" label="Gaming">
                Gaming
              </Option>
              <Option value="Macbook" label="Macbook">
                Macbook
              </Option>
            </Select>
            
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
