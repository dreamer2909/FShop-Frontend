import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/user/Home";
import Laptop from "./views/user/laptop/Laptop";
import React from "react";
import Layout from "./views/user/Layout";
import AdminHome from "./views/admin/Home";
import BrandList from "./views/admin/BrandList";
import LaptopList from "./views/admin/laptop/LaptopList";
import LaptopEntryList from "./views/admin/laptop/LaptopEntryList";
import LaptopDetail from "./views/user/laptop/LaptopDetail";
import Cart from "./views/user/Cart";
import PendingReceipt from "./views/admin/receipt/PendingReceipt";
import VerifiedReceipt from "./views/admin/receipt/VerifiedReceipt";
import DeliveredReceipt from "./views/admin/receipt/DeliveredReceipt";
import PendingReview from "./views/admin/review/PendingReview";
import VerifiedReview from "./views/admin/review/VerifiedReview";
import ReceiptStatus from "./views/user/ReceiptStatus";
import LaptopBrand from "./views/user/laptop/LaptopBrand";
import PaymentSuccess from "./views/user/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/laptop" element={<Laptop />}></Route>
          <Route path="/laptop/:entry_name" element={<LaptopDetail />}></Route>
          <Route path="/laptop/brand/:brand_name" element={<LaptopBrand />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/receipt-status" element={<ReceiptStatus/>}></Route>
          <Route path="/payment-success" element={<PaymentSuccess/>}></Route>
        </Route>

        <Route path="/admin" element={<AdminHome />}>
          <Route path="/admin/brand" element={<BrandList />}></Route>
          <Route
            path="/admin/receipt/pending"
            element={<PendingReceipt />}
          ></Route>
          <Route
            path="/admin/receipt/verified"
            element={<VerifiedReceipt />}
          ></Route>
          <Route
            path="/admin/receipt/delivered"
            element={<DeliveredReceipt />}
          ></Route>
          <Route
            path="/admin/review/pending"
            element={<PendingReview />}
          ></Route>
          <Route
            path="/admin/review/verified"
            element={<VerifiedReview />}
          ></Route>
          <Route path="/admin/laptop" element={<LaptopList />}></Route>
          <Route
            path="/admin/laptop_entries/laptop_id/:laptop_id"
            element={<LaptopEntryList />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
