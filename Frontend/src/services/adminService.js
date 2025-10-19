import apiClient from "./apiClient";

export const fetchDashboardOverview = async () => {
    const response = await apiClient.get("/admin/dashboard/overview");
    if (!response) {
        return null;
    }
    return response;
};

const adminService = {
    fetchDashboardOverview,
};

export default adminService;