import API from "@agile-ts/api";

const api = new API({
    baseURL: "http://localhost:500",
    timeout: 10000,
    options: {
        credentials: undefined
    }
});

export default api;
