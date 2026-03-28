import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/users",
});

export const getUsers = (page) => API.get(`/?page=${page}`);
export const addUser = (data) => API.post("/", data);
export const updateUser = (id, data) => API.put(`/${id}`, data);
export const deleteUser = (id) => API.delete(`/${id}`);