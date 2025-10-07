package co.za.cput.dto;

import co.za.cput.domain.business.Accommodation;

/**
 * Lightweight view model for presenting accommodation information to the client.
 */
public record AccommodationSummary(
        Long id,
        double rent,
        boolean wifiAvailable,
        boolean furnished,
        boolean utilitiesIncluded,
        double distanceFromCampus,
        Accommodation.RoomType roomType,
        Accommodation.BathroomType bathroomType,
        Accommodation.AccommodationStatus status,
        String streetAddress,
        String suburb,
        String city,
        String landlordName,
        String landlordEmail
) {
}