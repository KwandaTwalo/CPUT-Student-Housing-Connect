package co.za.cput.dto;

import java.time.LocalDate;

public record AccommodationRatingSummary(
        Long accommodationId,
        Double averageRating,
        Long totalReviews,
        LocalDate mostRecentReviewDate,
        Long positiveReviewCount
) {
}