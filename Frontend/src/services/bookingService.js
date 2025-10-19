import apiClient from "./apiClient";

const normalizeStatusFilter = (statusFilter) => {
    if (!statusFilter) {
        return [];
    }

    if (Array.isArray(statusFilter)) {
        return statusFilter.filter(Boolean);
    }

    return [statusFilter].filter(Boolean);
};

const extractNumeric = (value) => {
    const numeric = Number(value);
    return Number.isNaN(numeric) ? null : numeric;
};

const extractLandlordIds = (booking) => {
    const accommodation = booking?.accommodation ?? {};
    const landlord = accommodation.landlord ?? booking?.landlord ?? {};

    const candidates = [
        landlord.landlordID,
        landlord.landlordId,
        landlord.id,
        accommodation.landlordID,
        accommodation.landlordId,
        booking?.landlordID,
        booking?.landlordId,
    ]
        .map(extractNumeric)
        .filter((value) => value !== null);

    return [...new Set(candidates)];
};

const matchesLandlordFilter = (booking, landlordId) => {
    if (!landlordId) {
        return true;
    }

    const targetId = extractNumeric(landlordId);
    if (targetId === null) {
        return true;
    }

    const landlordIds = extractLandlordIds(booking);

    if (landlordIds.length === 0) {
        // When no landlord information is available on the booking record,
        // we keep the result to avoid excluding potentially relevant data.
        return true;
    }

    return landlordIds.includes(targetId);
};

const matchesAccommodationFilter = (booking, accommodationId) => {
    if (!accommodationId) {
        return true;
    }

    const targetId = extractNumeric(accommodationId);
    if (targetId === null) {
        return true;
    }

    const accommodation = booking?.accommodation ?? {};
    const candidateId =
        extractNumeric(accommodation.accommodationID) ??
        extractNumeric(accommodation.id);

    if (candidateId === null) {
        return false;
    }

    return candidateId === targetId;
};

const matchesStudentFilter = (booking, studentId) => {
    if (!studentId) {
        return true;
    }

    const targetId = extractNumeric(studentId);
    if (targetId === null) {
        return true;
    }

    const candidateId =
        extractNumeric(booking?.student?.studentID) ??
        extractNumeric(booking?.student?.id) ??
        extractNumeric(booking?.studentId);

    if (candidateId === null) {
        return false;
    }

    return candidateId === targetId;
};

const applyFilters = (bookings, filters = {}) => {
    const statuses = normalizeStatusFilter(filters.status);

    return bookings.filter((booking) => {
        if (statuses.length > 0 && !statuses.includes(booking?.bookingStatus)) {
            return false;
        }

        if (!matchesLandlordFilter(booking, filters.landlordId)) {
            return false;
        }

        if (!matchesAccommodationFilter(booking, filters.accommodationId)) {
            return false;
        }

        if (!matchesStudentFilter(booking, filters.studentId)) {
            return false;
        }

        return true;
    });
};

export const listBookings = async (filters = {}) => {
    const response = await apiClient.get("/bookings/getAllBookings");
    const bookings = Array.isArray(response) ? response : [];
    return applyFilters(bookings, filters);
};

export const fetchBooking = async (bookingId) => {
    if (!bookingId) {
        throw new Error("Booking id is required");
    }

    const response = await apiClient.get(`/bookings/read/${bookingId}`);
    if (!response) {
        throw new Error("Booking not found");
    }
    return response;
};

export const updateBooking = async (bookingPayload) => {
    const bookingId = bookingPayload?.bookingID ?? bookingPayload?.id;
    if (!bookingId) {
        throw new Error("Booking id is required for updates");
    }

    return apiClient.put("/bookings/update", bookingPayload);
};

export const updateBookingStatus = async (booking, nextStatus) => {
    if (!booking?.bookingID) {
        throw new Error("Booking id is required to update status");
    }

    if (!nextStatus) {
        throw new Error("A valid status is required");
    }

    return updateBooking({ ...booking, bookingStatus: nextStatus });
};

const bookingService = {
    listBookings,
    fetchBooking,
    updateBooking,
    updateBookingStatus,
};

export default bookingService;