import React from "react";
import ReactDOM from "react-dom/client";
import "./style/home/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import AddNewForm from "./components/AddNewForm";
import Houses from "./components/Houses";
import HouseDetail from "./components/HouseDetail";
import HouseLayout from "./components/HouseLayout";
import Invoices from "./components/Invoices";
import InvoiceDetail from "./components/InvoiceDetail";
import EditInvoice from "./components/EditInvoice";
import AddNewInvoice from "./components/AddNewInvoice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HouseLayout />}>
        <Route path="add" element={<AddNewForm />} />
        <Route path="" element={<Houses />} />
      </Route>
      <Route path="house/:houseId" element={<HouseDetail />}>
        <Route index element={<Invoices />} />
        <Route path="addInvoice" element={<AddNewInvoice />} />
        <Route path="invoice/:invoiceId" element={<InvoiceDetail />}></Route>
        <Route path="editInvoice/:editInvoiceId" element={<EditInvoice />} />
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
