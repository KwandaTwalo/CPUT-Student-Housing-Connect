import apiClient from "./apiClient";

export const createLandlord = async (landlordPayload) => {
    if (!landlordPayload?.landlordFirstName || !landlordPayload?.landlordLastName) {
        throw new Error("Landlord first and last names are required.");
    }

    const response = await apiClient.post("/landlords/create", landlordPayload);
    return response;
};

export const fetchLandlord = async (landlordId) => {
    if (!landlordId) {
        throw new Error("Landlord id is required");
    }

    const response = await apiClient.get(`/landlords/read/${landlordId}`);
    if (!response) {
        throw new Error("Landlord profile not found");
    }
    return response;
};

export const updateLandlord = async (landlordPayload) => {
    const landlordId = landlordPayload?.landlordID ?? landlordPayload?.id;
    if (!landlordId) {
        throw new Error("Landlord id is required for updates");
    }

    return apiClient.put("/landlords/update", landlordPayload);
};

const landlordService = {
    createLandlord,
    fetchLandlord,
    updateLandlord,
};

export default landlordService;
