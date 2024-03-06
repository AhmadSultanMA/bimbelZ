import React, { Component } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import {
  Login,
  ProtectedAdmin,
  ProtectedLogin,
  ProtectedRoute,
  Register,
} from "./auth";
import {
  User,
  Admin,
  UserAccount,
  SelectClass,
  Kursus,
  Materi,
  AdminKursus,
  Data,
  AdminBab,
  Task,
  NotFound,
} from "./pages";

const Rute = (value) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact>
          <Route path="*" element={<NotFound />} />
          <Route
            path=""
            element={
              <Navigate
                replace
                to={
                  localStorage.getItem("role") === "admin"
                    ? "/admin"
                    : localStorage.getItem("role") === "user"
                    ? "/user"
                    : "/login"
                }
              />
            }
          />

          <Route element={<ProtectedAdmin />}>
            <Route
              path="admin"
              exact
              element={<Navigate replace to="data" />}
            />
            <Route path="admin" exact element={<Admin />}>
              <Route path="data" element={<Data />} />
              <Route path="course" element={<AdminKursus />} />
              <Route path="bab" element={<AdminBab />} />
              <Route path="task" element={<SelectClass />} />
              <Route path="evaluation" element={<Task />} />
              <Route path="account" element={<UserAccount />} />
            </Route>
          </Route>

          <Route element={<ProtectedLogin />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="user"
              exact
              element={<Navigate replace to="course" />}
            />
            <Route path="user" exact element={<User />}>
              <Route path="course" element={<Kursus />} />
              <Route path="lesson" element={<Materi />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Rute;
