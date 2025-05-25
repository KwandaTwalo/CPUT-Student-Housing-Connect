package co.za.cput.factory.business;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.


import co.za.cput.domain.business.Accomodation;
import co.za.cput.util.Helper;
import java.util.UUID;

public class AccomodationFactory {

    public static Accomodation createAccomodation(Accomodation.AccomodationStatus availabilityStatus) {

        String accomodationId = UUID.randomUUID().toString();


        return new Accomodation.Builder()
                .setAccomodationID(accomodationId)
                .setStatus(status)
                .build()

    }

}
