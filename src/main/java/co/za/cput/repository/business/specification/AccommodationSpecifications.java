package co.za.cput.repository.business.specification;

import co.za.cput.domain.business.Accommodation;
import org.springframework.data.jpa.domain.Specification;

public final class AccommodationSpecifications {

    private AccommodationSpecifications() {
    }

    public static Specification<Accommodation> rentGreaterThanOrEqual(double minRent) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("rent"), minRent);
    }

    public static Specification<Accommodation> rentLessThanOrEqual(double maxRent) {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("rent"), maxRent);
    }

    public static Specification<Accommodation> hasWifi(boolean wifiAvailable) {
        return (root, query, builder) -> builder.equal(root.get("wifiAvailable"), wifiAvailable);
    }

    public static Specification<Accommodation> isFurnished(boolean furnished) {
        return (root, query, builder) -> builder.equal(root.get("furnished"), furnished);
    }

    public static Specification<Accommodation> utilitiesIncluded(boolean utilitiesIncluded) {
        return (root, query, builder) -> builder.equal(root.get("utilitiesIncluded"), utilitiesIncluded);
    }

    public static Specification<Accommodation> withinDistance(double maxDistance) {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("distanceFromCampus"), maxDistance);
    }

    public static Specification<Accommodation> hasRoomType(Accommodation.RoomType roomType) {
        return (root, query, builder) -> builder.equal(root.get("roomType"), roomType);
    }

    public static Specification<Accommodation> hasBathroomType(Accommodation.BathroomType bathroomType) {
        return (root, query, builder) -> builder.equal(root.get("bathroomType"), bathroomType);
    }

    public static Specification<Accommodation> hasStatus(Accommodation.AccommodationStatus status) {
        return (root, query, builder) -> builder.equal(root.get("accommodationStatus"), status);
    }

    public static Specification<Accommodation> matchesCity(String city) {
        return (root, query, builder) -> builder.equal(
                builder.lower(root.get("address").get("city")),
                city.toLowerCase()
        );
    }

    public static Specification<Accommodation> matchesSuburb(String suburb) {
        return (root, query, builder) -> builder.equal(
                builder.lower(root.get("address").get("suburb")),
                suburb.toLowerCase()
        );
    }

    public static Specification<Accommodation> ownedBy(Long landlordId) {
        return (root, query, builder) -> builder.equal(root.get("landlord").get("landlordID"), landlordId);
    }
}