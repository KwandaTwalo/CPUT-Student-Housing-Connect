import apiClient from "./apiClient";

export const createLandlord = async (landlordPayload) => {
    if (!landlordPayload?.landlordFirstName || !landlordPayload?.landlordLastName) {
        throw new Error("Landlord first and last names are required.");
    }

    const response = await apiClient.post("/Landlord/create", landlordPayload);
    return response;
};

const landlordService = {
    createLandlord,
};

export default landlordService;
