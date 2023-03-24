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

import LogInPage from "./pages/login-page";

import UserLayout from "./layouts/user-layout";
import PublicLayout from "./layouts/public-layout";
import AuthLayout from "./layouts/auth-layout";

import HomePage from "./pages/home-page";
import UserNewPostPage from "./pages/user-new-post-page";

import RegisterPage from "./pages/register-page";
import UserHomePage from "./pages/user-home-page";
import UserVisitedPage from "./pages/user-visit-page";
import UserUpdatePage from "./pages/user-update-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="/my" element={<UserLayout />}>
        <Route path="add" element={<UserNewPostPage />} />
        <Route path=":postId/update" element={<UserUpdatePage />} />
        <Route index element={<UserHomePage />} />
      </Route>

      <Route path="/" element={<PublicLayout />}>
        <Route path="visit/:visitedUserId" element={<UserVisitedPage />} />
        <Route index element={<HomePage />} />
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
