import apiClient from "./apiClient";

export const createStudent = async (studentPayload) => {
    if (!studentPayload?.studentName || !studentPayload?.studentSurname) {
        throw new Error("Student name and surname are required.");
    }

    const response = await apiClient.post("/students/create", studentPayload);
    return response;
};

const studentService = {
    createStudent,
};

export default studentService;
