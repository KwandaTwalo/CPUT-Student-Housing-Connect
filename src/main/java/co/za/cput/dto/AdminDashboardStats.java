package co.za.cput.dto;

import java.time.LocalDateTime;

/**
 * Aggregated metrics surfaced on the administrator dashboard for operational visibility.
 */
public record AdminDashboardStats(
        long totalStudents,
        long totalLandlords,
        long verifiedLandlords,
        long totalAccommodations,
        long pendingVerifications,
        long activeBookings,
        double occupancyRate,
        LocalDateTime generatedAt
) {
}