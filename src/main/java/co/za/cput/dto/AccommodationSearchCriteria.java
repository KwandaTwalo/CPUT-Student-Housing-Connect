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
    public Optional<Double> minRent() {
        return Optional.ofNullable(minRent);
    }

    public Optional<Double> maxRent() {
        return Optional.ofNullable(maxRent);
    }

    public Optional<Boolean> wifiAvailable() {
        return Optional.ofNullable(wifiAvailable);
    }

    public Optional<Boolean> furnished() {
        return Optional.ofNullable(furnished);
    }

    public Optional<Boolean> utilitiesIncluded() {
        return Optional.ofNullable(utilitiesIncluded);
    }

    public Optional<Double> maxDistanceFromCampus() {
        return Optional.ofNullable(maxDistanceFromCampus);
    }

    public Optional<String> city() {
        return Optional.ofNullable(city);
    }

    public Optional<String> suburb() {
        return Optional.ofNullable(suburb);
    }

    public Optional<Accommodation.RoomType> roomType() {
        return Optional.ofNullable(roomType);
    }

    public Optional<Accommodation.BathroomType> bathroomType() {
        return Optional.ofNullable(bathroomType);
    }

    public Optional<Accommodation.AccommodationStatus> status() {
        return Optional.ofNullable(status);
    }

    public Optional<Long> landlordId() {
        return Optional.ofNullable(landlordId);
    }
}