package co.za.cput.factory.business;


import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.generic.Address;
import co.za.cput.factory.generic.AddressFactory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AccommodationFactoryTest {

    // Create Address object
    private static Address address1 = AddressFactory.createAddress(
            "12B",
            "Nyanga Road",
            "Langa",
            "Cape Town",
            7455
    );

    // Create Accommodation object using only Address
    public static Accommodation accommodation1 = AccommodationFactory.createAccommodation(
            4200.00,                                     // rent
            true,                                        // wifiAvailable
            true,                                        // furnished
            1.2,                                         // distanceFromCampus (km)
            true,                                        // utilitiesIncluded
            Accommodation.RoomType.SINGLE,              // roomType
            Accommodation.BathroomType.PRIVATE,         // bathroomType
            Accommodation.AccommodationStatus.AVAILABLE,// status
            address1,                                    // address
            null,                                        // landlord
            null                                         // bookings
    );

    @Test
    void createAccommodation() {
        assertNotNull(accommodation1);
        System.out.println("Accommodation created: " + accommodation1);
    }

    Address address2 = AddressFactory.createAddress("45", "Main Road", "Bellville", "Cape Town", 7530);

    @Test
    void testInvalidDistanceFromCampus() {
        // Distance is invalid (<= 0)
        Accommodation invalidDistanceAccommodation = AccommodationFactory.createAccommodation(
                3500.00,
                true,
                false,
                -0.5,
                true,
                Accommodation.RoomType.SHARED,
                Accommodation.BathroomType.SHARED,
                Accommodation.AccommodationStatus.FULL,
                address2,
                null,
                null
        );
        assertNull(invalidDistanceAccommodation, "Distance must be greater than 0");
        System.out.println("Invalid distanceFromCampus test passed.");
    }

    @Test
    void testInvalidRent() {
        // Rent is invalid (< 0)
        Accommodation invalidRentAccommodation = AccommodationFactory.createAccommodation(
                -1000.00,
                false,
                true,
                2.0,
                false,
                Accommodation.RoomType.DOUBLE,
                Accommodation.BathroomType.PRIVATE,
                Accommodation.AccommodationStatus.AVAILABLE,
                address2,
                null,
                null
        );
        assertNull(invalidRentAccommodation, "Rent must be zero or greater");
        System.out.println("Invalid rent test passed.");
    }
}