const API_BASE_URL =
    (process.env.REACT_APP_API_BASE_URL && process.env.REACT_APP_API_BASE_URL.replace(/\/$/, "")) ||
    "http://localhost:8080/HouseConnect";

const buildUrl = (path) => {
    if (!path.startswith("/")) {
        return `${API_BASE_URL}/${path}`;
    }
    return `${API_BASE_URL}${path}`;
};

const defaultHeaders = {
    "Content-Type": "application/json",
};

const parseResponse = async (response) => {
    if (response.status === 204) {
        return null;
    }

    const text = await response.text();
    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        throw new Error("Received an unexpected response from the server.");
    }
};

const request = async (path, options = {}) => {
    const url = buildUrl(path);
    const config = {
        headers: defaultHeaders,
        mode: "cors",
        ...options,
    };

    if (options.body && typeof options.body !== "string") {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorBody = await parseResponse(response);
            const message = errorBody?.message || `Request failed with status ${response.status}`;
            throw new Error(message);
        }

        return parseResponse(response);
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error("Unable to reach the server. Please check your connection and try again.");
        }
        throw error;
    }
};

const get = (path, options = {}) => request(path, { ...options, method: "GET" });
const post = (path, body, options = {}) => request(path, { ...options, method: "POST", body });
const put = (path, body, options = {}) => request(path, { ...options, method: "PUT", body });
const del = (path, options = {}) => request(path, { ...options, method: "DELETE" });

const apiClient = {
    get,
    post,
    put,
    delete: del,
};

export default apiClient;
export { get, post, put, del as delete, API_BASE_URL };
