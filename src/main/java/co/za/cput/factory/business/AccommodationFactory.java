package co.za.cput.factory.business;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.


import co.za.cput.domain.business.Accommodation;

public class AccommodationFactory {

    public static Accommodation createAccommodation(Accommodation.AccommodationStatus availabilityStatus) {

        return new Accommodation.Builder()
                .setAccommodationStatus(availabilityStatus)
                .build();

    }

}
