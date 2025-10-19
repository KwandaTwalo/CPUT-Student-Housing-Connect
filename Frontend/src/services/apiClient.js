const inferDefaultBaseUrl = () => {
    if (typeof window === "undefined" || !window?.location) {
        return "http://localhost:8080/api";
    }

    const { protocol, hostname, port, origin } = window.location;

    const isLocalHost = ["localhost", "127.0.0.1", "::1"].some((value) =>
        hostname?.toLowerCase()?.includes(value),
    );

    // When the frontend runs locally (for example via `npm start` or other dev servers
    // such as Vite) it typically executes on a port other than 8080 while the Spring Boot
    // backend continues to listen on 8080. Without redirecting those requests the browser
    // will call the dev server itself (e.g. http://localhost:3000/api or
    // http://localhost:5173/api) which responds with an HTML error page instead of the JSON
    // payloads expected by the app.
    if (isLocalHost && port && port !== "8080") {
        return `${protocol}//${hostname}:8080/api`;
    }

    return `${origin}/api`;
};

const normaliseBaseUrl = (url) => {
    if (!url) {
        return url;
    }

    return url.replace(/\/+$/, "");
};

const API_BASE_URL = normaliseBaseUrl(process.env.REACT_APP_API_BASE_URL) || normaliseBaseUrl(inferDefaultBaseUrl());

const buildUrl = (path) => {
    if (!path.startsWith("/")) {
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

    const contentType = response.headers?.get("content-type") ?? "";

    const text = await response.text();
    if (!text) {
        return null;
    }

    if (contentType.includes("application/json")) {
        try {
            return JSON.parse(text);
        } catch (error) {
            throw new Error("Received an unexpected response from the server.");
        }
    }

    return text;
};

const request = async (path, options = {}) => {
    const url = buildUrl(path);
    const config = {
        headers: defaultHeaders,
        mode: "cors",
        cache: "no-store",
        ...options,
    };

    if (options.body && typeof options.body !== "string") {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorBody = await parseResponse(response);
            const message =
                (typeof errorBody === "string" && errorBody.trim()) ||
                errorBody?.message ||
                `Request failed with status ${response.status}`;
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
