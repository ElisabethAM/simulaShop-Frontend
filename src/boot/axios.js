import axios from "axios";

const api = axios.create({
    baseURL: import.meta.VITE_API_REST,
    withCredentials: true,
});

export { api };