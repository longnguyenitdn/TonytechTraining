import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import HousesLayout from "./layouts/housesLayout";

import Houses from "./pages/houses";
import Invoices from "./pages/invoices";

import EditInvoice from "./pages/invoiceEdit";
import AddNewInvoice from "./pages/invoiceNew";
import InvoicesLayout from "./layouts/invoicesLayout";

import HouseDetailLayout from "./layouts/houseDetailLayout";
import HouseNew from "./pages/houseNew";
import InvoiceDetail from "./pages/invoiceDetail";
import InvoiceLayout from "./layouts/invoiceLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<HousesLayout />}>
        <Route path="addHouse" element={<HouseNew />} />
        <Route index element={<Houses />} />
      </Route>
      <Route path="/houses/:houseId" element={<HouseDetailLayout />}>
        <Route path="invoices" element={<InvoicesLayout />}>
          <Route path=":invoiceId" element={<InvoiceLayout />}>
            <Route path="edit" element={<EditInvoice />} />
            <Route index element={<InvoiceDetail />} />
          </Route>
          <Route path="add" element={<AddNewInvoice />} />
          <Route index element={<Invoices />} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
