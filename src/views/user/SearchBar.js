import {Avatar, List } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../constant";

export default function SearchBar({placeholder, onClick}) {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value.toLowerCase().trim());
  };

  useEffect(() => {
    fetch(SERVER_URL + "product_entries")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEntries(result);
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Search
        onChange={handleChange}
        placeholder={placeholder}
        enterButton
        allowClear
      />
      {input.trim().length > 0 && (
        <List
          header={<div style={{ padding: "0 20px" }}>Có phải bạn muốn tìm</div>}
          style={{
            backgroundColor: "#ECF0F4",
            position: "absolute",
            zIndex: 10,
            width: "100%",
          }}
          itemLayout="horizontal"
          dataSource={entries}
          renderItem={(item) =>
            item.nameEntry.toLowerCase().search(input.trim().toLowerCase()) !==
              -1 && (
              <List.Item
                style={{ cursor: "pointer", padding: "20px 20px" }}
                onClick={() => {
                  onClick(item)
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      src={`/assets/images/laptops/${item.image}`}
                    />
                  }
                  title={item.nameEntry}
                  description={item.price}
                />
              </List.Item>
            )
          }
        ></List>
      )}
    </div>
  );
}
