import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import TasksIndex from "./Pages/Tasks/Index";
import TaskForm from "./Pages/Tasks/Create";
import TaskEdit from "./Pages/Tasks/TaskEdit";

// Axios defaults
axios.defaults.baseURL = "/api";
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public routes */}
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected routes */}
                    <Route
                        path="tasks"
                        element={
                            <PrivateRoute>
                                <TasksIndex />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="tasks/new"
                        element={
                            <PrivateRoute>
                                <TaskForm />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="tasks/:id/edit"
                        element={
                            <PrivateRoute>
                                <TaskEdit />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
