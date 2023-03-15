import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
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
import BaseLayout from "./layouts/base-layout";
import LogInCom from "./components/log-in-com";
import SignInCom from "./components/sign-in-com";
import LogInPage from "./pages/log-in-page";

import UserLayout from "./layouts/user-layout";
import UserCardsPage from "./pages/user-cards-page";
import UserNewCardPage from "./pages/user-new-card-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<BaseLayout />}>
        <Route path="login" element={<LogInPage />}>
          <Route index element={<LogInCom />} />
        </Route>
        <Route path="sign-in" element={<SignInCom />} />
      </Route>
      <Route path="/users" element={<UserLayout />}>
        <Route path=":userId" element={<UserCardsPage />} />
        <Route path=":userId/add" element={<UserNewCardPage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
