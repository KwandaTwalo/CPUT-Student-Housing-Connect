import apiClient from "./apiClient";

const normaliseFilters = (filters = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        if (typeof value === "string" && value.trim() === "") {
            return;
        }

        params.append(key, value);
    });

    return params.toString();
};

export const searchAccommodations = async (filters = {}) => {
    const query = normaliseFilters(filters);
    const path = query ? `/Accommodation/search?${query}` : "/Accommodation/search";
    const response = await apiClient.get(path);
    return response ?? [];
};

export const fetchAccommodation = async (id) => {
    if (!id) {
        throw new Error("Accommodation id is required");
    }

    const response = await apiClient.get(`/Accommodation/read/${id}`);
    if (!response) {
        throw new Error("Accommodation not found");
    }
    return response;
};

const accommodationService = {
    searchAccommodations,
    fetchAccommodation,
};

export default accommodationService;