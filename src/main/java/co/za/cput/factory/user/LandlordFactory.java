package co.za.cput.factory.user;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import java.util.UUID;
import co.za.cput.util.Helper;

public class LandlordFactory {
    public Landlord createLandlord(String landlordFirstName,
                                   String landlordLastName
                                   ) {

        String landlordID = UUID.randomUUID().toString();

        if (!Helper.validateStringDetails(landlordFirstName) ||
                !Helper.validateStringDetails(landlordLastName))
                 {
            return null;
        }

        return new Landlord.Builder()
                .setLandlordFirstName(landlordFirstName)
                .setLandlordLastName(landlordLastName)
                .build();
    }
}
