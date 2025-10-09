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

export const createAccommodation = async (accommodationPayload) => {
    if (!accommodationPayload) {
        throw new Error("Accommodation details are required");
    }

    return apiClient.post("/Accommodation/create", accommodationPayload);
};

export const updateAccommodation = async (accommodationPayload) => {
    const accommodationId = accommodationPayload?.accommodationID ?? accommodationPayload?.id;
    if (!accommodationId) {
        throw new Error("Accommodation id is required for updates");
    }

    return apiClient.put("/Accommodation/update", accommodationPayload);
};

export const fetchLandlordListings = async (landlordId, filters = {}) => {
    if (!landlordId) {
        throw new Error("Landlord id is required to fetch listings");
    }

    const results = await searchAccommodations({ ...filters, landlordId });
    return Array.isArray(results) ? results : [];
};

const accommodationService = {
    searchAccommodations,
    fetchAccommodation,
    createAccommodation,
    updateAccommodation,
    fetchLandlordListings,
};

export default accommodationService;
