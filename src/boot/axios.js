import axios from "axios";

const api = axios.create({
    baseURL: process.env.API_REST,
    withCredentials: true,
});

export { api };