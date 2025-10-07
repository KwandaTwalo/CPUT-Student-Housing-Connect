package co.za.cput.dto;

import co.za.cput.domain.business.Accommodation;

import java.util.Optional;

/**
 * Encapsulates optional search filters that can be applied when querying the accommodation catalogue.
 */
public record AccommodationSearchCriteria(
        Double minRent,
        Double maxRent,
        Boolean wifiAvailable,
        Boolean furnished,
        Boolean utilitiesIncluded,
        Double maxDistanceFromCampus,
        String city,
        String suburb,
        Accommodation.RoomType roomType,
        Accommodation.BathroomType bathroomType,
        Accommodation.AccommodationStatus status,
        Long landlordId
) {
    public Optional<Double> minRentOptional() {
        return Optional.ofNullable(minRent);
    }

    public Optional<Double> maxRentOptional() {
        return Optional.ofNullable(maxRent);
    }

    public Optional<Boolean> wifiAvailableOptional() {
        return Optional.ofNullable(wifiAvailable);
    }

    public Optional<Boolean> furnishedOptional() {
        return Optional.ofNullable(furnished);
    }

    public Optional<Boolean> utilitiesIncludedOptional() {
        return Optional.ofNullable(utilitiesIncluded);
    }

    public Optional<Double> maxDistanceFromCampusOptional() {
        return Optional.ofNullable(maxDistanceFromCampus);
    }

    public Optional<String> cityOptional() {
        return Optional.ofNullable(city);
    }

    public Optional<String> suburbOptional() {
        return Optional.ofNullable(suburb);
    }

    public Optional<Accommodation.RoomType> roomTypeOptional() {
        return Optional.ofNullable(roomType);
    }

    public Optional<Accommodation.BathroomType> bathroomTypeOptional() {
        return Optional.ofNullable(bathroomType);
    }

    public Optional<Accommodation.AccommodationStatus> statusOptional() {
        return Optional.ofNullable(status);
    }

    public Optional<Long> landlordIdOptional() {
        return Optional.ofNullable(landlordId);
    }
}