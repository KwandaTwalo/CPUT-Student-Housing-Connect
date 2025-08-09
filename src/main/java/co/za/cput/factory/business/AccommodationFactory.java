package co.za.cput.factory.business;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.


import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.business.Booking;
import co.za.cput.domain.generic.Address;
import co.za.cput.domain.users.Landlord;
import co.za.cput.util.Helper;

import java.util.List;

public class AccommodationFactory {

    public static Accommodation createAccommodation(double rent,
                                                    boolean isWifiAvailable,
                                                    boolean isFurnished,
                                                    double distanceFromCampus,
                                                    boolean utilitiesIncluded,
                                                    Accommodation.RoomType roomType,
                                                    Accommodation.BathroomType bathroomType,
                                                    Accommodation.AccommodationStatus accommodationStatus,
                                                    Address address,
                                                    Landlord landlord,
                                                    List<Booking> bookings) {

        if (!Helper.isValid_DecimalNumber(rent) ||
                !Helper.isValidDistance(distanceFromCampus)) {
            return null;
        }

        return new Accommodation.Builder()
                .setRent(rent)
                .setWifiAvailable(isWifiAvailable)
                .setFurnished(isFurnished)
                .setDistanceFromCampus(distanceFromCampus)
                .setUtilitiesIncluded(utilitiesIncluded)
                .setRoomType(roomType)
                .setBathroomType(bathroomType)
                .setAccommodationStatus(accommodationStatus)
                .setAddress(address)
                .setLandlord(landlord)
                .setBookings(bookings)
                .build();
    }

}
