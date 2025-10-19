package co.za.cput.dto;

import co.za.cput.domain.business.Accommodation;

import java.time.LocalDate;

public record AccommodationInsight(
        Long accommodationId,
        Accommodation.AccommodationStatus status,
        double averageRating,
        long totalReviews,
        long positiveReviews,
        LocalDate mostRecentReviewDate,
        long confirmedBookings,
        long totalBookings,
        double occupancyRate,
        double rent,
        boolean wifiAvailable,
        boolean furnished,
        boolean utilitiesIncluded,
        double distanceFromCampus,
        String suburb,
        String city
) {
}